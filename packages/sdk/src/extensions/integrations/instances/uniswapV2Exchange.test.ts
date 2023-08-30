import { type Address, getAbiItem, parseAbi, parseEther } from "viem";
import { test } from "vitest";

import {
  ALICE,
  BOB,
  DAI,
  INTEGRATION_MANAGER,
  UNISWAP_V2_EXCHANGE_ADAPTER,
  UNISWAP_V2_SWAP_ROUTER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { prepareFunctionParams } from "../../../utils/viem.js";
import { IERC20 } from "../../abis/IERC20.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";

const abiSwapRouter = parseAbi([
  "function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts)",
] as const);

function prepareSwapExactTokensForTokens({
  path,
  to,
  deadline,
  amountIn,
  amountOutMinimum,
}: { path: Address[]; to: Address; deadline: bigint; amountIn: bigint; amountOutMinimum: bigint }) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: abiSwapRouter, name: "swapExactTokensForTokens" }),
    args: [amountIn, amountOutMinimum, path, to, deadline],
  });
}

test("prepare adapter trade for Uniswap V2 Exchange take order should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  const pathAddresses = [WETH, DAI] as const;

  // give vaultProxy some ether to pay for the gas
  await testClientMainnet.setBalance({
    address: vaultProxy,
    value: parseEther("1"),
  });

  // approve uniswapV3SwapRouter to so we can simulate the trade
  await sendTestTransaction({
    clientNetwork: "mainnet",
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IERC20, name: "approve" }),
      args: [UNISWAP_V2_SWAP_ROUTER, depositAmount],
    }),
    address: pathAddresses[0],
    account: vaultProxy,
    value: 0n,
  });

  // simulate the trade
  const { result: assetAmounts } = await publicClientMainnet.simulateContract({
    ...prepareSwapExactTokensForTokens({
      deadline: BigInt(Math.ceil(new Date().getTime() / 1000 + 1)),
      path: [...pathAddresses],
      to: vaultProxy,
      amountIn: depositAmount,
      amountOutMinimum: 1n,
    }),
    address: UNISWAP_V2_SWAP_ROUTER,
    account: vaultProxy,
  });

  const minIncomingAssetAmount = assetAmounts[1];

  if (minIncomingAssetAmount === undefined) {
    throw new Error("minIncomingAssetAmount is undefined");
  }

  const minIncomingAssetAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingAssetAmount,
    slippage: 1n,
  });

  await sendTestTransaction({
    clientNetwork: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_EXCHANGE_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2ExchangeTakeOrder,
        path: [...pathAddresses],
        outgoingAssetAmount: depositAmount,
        minIncomingAssetAmount: minIncomingAssetAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: DAI,
    account: vaultProxy,
    expected: minIncomingAssetAmount,
    fuzziness: minIncomingAssetAmount - minIncomingAssetAmountWithSlippage,
  });
});
