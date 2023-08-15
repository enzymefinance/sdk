import {
  ALICE,
  BOB,
  DAI,
  INTEGRATION_MANAGER,
  UNISWAP_V3_ADAPTER,
  UNISWAP_V3_SWAP_ROUTER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { prepareFunctionParams } from "../../../utils/viem.js";
import { IERC20 } from "../../abis/index.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { type Address, type Hex, getAbiItem, parseAbi, parseEther } from "viem";
import { encodePacked } from "viem/utils";
import { expect, test } from "vitest";

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
  await testClient.setBalance({
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
  const { result: minIncomingAssetAmount } = await publicClient.simulateContract({
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

test("prepareUseIntegration for Uniswap V3 take order should be equal to encoded data with encodeCallArgsForUniswapV3TakeOrder", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V3_ADAPTER,
      callArgs: {
        type: Integration.UniswapV3TakeOrder,
        pathAddresses: [WETH, DAI],
        pathFees: [3000],
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
        "0x000000000000000000000000ed6a08e05cb4260388dc7cc60bc5fefccfab279303e38a2b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000bb8",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
