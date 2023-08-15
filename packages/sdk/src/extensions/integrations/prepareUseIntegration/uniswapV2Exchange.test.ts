import {
  ALICE,
  BOB,
  DAI,
  INTEGRATION_MANAGER,
  UNISWAP_V2_EXCHANGE_ADAPTER,
  UNISWAP_V2_SWAP_ROUTER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { prepareFunctionParams } from "../../../utils/viem.js";
import { IERC20 } from "../../abis/index.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { type Address, getAbiItem, parseAbi, parseEther } from "viem";
import { expect, test } from "vitest";

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
  await testClient.setBalance({
    address: vaultProxy,
    value: parseEther("1"),
  });

  // approve uniswapV3SwapRouter to so we can simulate the trade
  await sendTestTransaction({
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IERC20, name: "approve" }),
      args: [UNISWAP_V2_SWAP_ROUTER, depositAmount],
    }),
    address: pathAddresses[0],
    account: vaultProxy,
    value: 0n,
  });

  // simulate the trade
  const { result: assetAmounts } = await publicClient.simulateContract({
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
    amount: assetAmounts[1] as bigint,
    slippage: 1n,
  });

  await sendTestTransaction({
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

test("prepareUseIntegration for Uniswap V2 Exchange take order should be equal to encoded data with encodeCallArgsForUniswapV3TakeOrder", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_EXCHANGE_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2ExchangeTakeOrder,
        path: [WETH, DAI],
        outgoingAssetAmount: toWei(100),
        minIncomingAssetAmount: toWei(50),
      },
    }),
  ).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x0000000000000000000000008c36435a653041bfd65515cc82502663c1ce6f0e03e38a2b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
