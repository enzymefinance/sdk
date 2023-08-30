import {
  ALICE,
  BOB,
  DAI,
  INTEGRATION_MANAGER,
  UNISWAP_V3_ADAPTER,
  UNISWAP_V3_SWAP_ROUTER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { prepareFunctionParams } from "../../../utils/viem.js";
import { IERC20 } from "../../abis/IERC20.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { type Address, type Hex, getAbiItem, parseAbi, parseEther } from "viem";
import { encodePacked } from "viem/utils";
import { test } from "vitest";

const abiSwapRouter = parseAbi([
  "function exactInput(ExactInputParams exactInputParams) returns (uint256)",
  "struct ExactInputParams { bytes path; address recipient; uint256 deadline; uint256 amountIn; uint256 amountOutMinimum;}",
] as const);

function prepareExactInputTrade({
  path,
  recipient,
  deadline,
  amountIn,
  amountOutMinimum,
}: { path: Hex; recipient: Address; deadline: bigint; amountIn: bigint; amountOutMinimum: bigint }) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: abiSwapRouter, name: "exactInput" }),
    args: [{ path, recipient, deadline, amountIn, amountOutMinimum }],
  });
}

test("prepare adapter trade for Uniswap V3 take order should work correctly", async () => {
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

  const mediumFee = 3000;
  const pathAddresses = [WETH, DAI] as const;
  const pathFees = [mediumFee] as const;
  const firstStepPath = encodePacked(["address", "uint24"], [pathAddresses[0], pathFees[0]]);
  const secondStepPath = encodePacked(["bytes", "address"], [firstStepPath, pathAddresses[1]]);

  // give vaultProxy some ether to pay for the gas
  await testClientMainnet.setBalance({
    address: vaultProxy,
    value: parseEther("1"),
  });

  // approve uniswapV3SwapRouter to so we can simulate the trade
  await sendTestTransaction({
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IERC20, name: "approve" }),
      args: [UNISWAP_V3_SWAP_ROUTER, depositAmount],
    }),
    address: pathAddresses[0],
    account: vaultProxy,
    value: 0n,
  });

  // simulate the trade
  const { result: minIncomingAssetAmount } = await publicClientMainnet.simulateContract({
    ...prepareExactInputTrade({
      deadline: BigInt(Math.ceil(new Date().getTime() / 1000 + 1)),
      path: secondStepPath,
      recipient: vaultProxy,
      amountIn: depositAmount,
      amountOutMinimum: 0n,
    }),
    address: UNISWAP_V3_SWAP_ROUTER,
    account: vaultProxy,
  });

  const minIncomingAssetAmountWithSlippage = multiplyBySlippage({ amount: minIncomingAssetAmount, slippage: 1n });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V3_ADAPTER,
      callArgs: {
        type: Integration.UniswapV3TakeOrder,
        pathAddresses: [...pathAddresses],
        pathFees: [...pathFees],
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
