import { parseAbi } from "viem";
import { expect, test } from "vitest";
import { ALICE, ERC4626_ADAPTER, INTEGRATION_MANAGER, MA_WETH, WETH } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";

const abiMaShares = parseAbi([
  "function convertToShares(uint256 _assetAmount) view returns (uint256 sharesAmount_)",
] as const);

const abiMaAssets = parseAbi([
  "function convertToAssets(uint256 _sharesAmount) view returns (uint256 assetAmount_)",
] as const);

test("prepare adapter trade for ERC4626 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const slippage = 1n;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAmount = toWei(250);
  const minIncomingAmountWithSlippage = multiplyBySlippage({
    amount: outgoingAmount,
    slippage,
  });

  const minIncomingAmount = await publicClient.readContract({
    abi: abiMaShares,
    address: MA_WETH,
    functionName: "convertToShares",
    args: [minIncomingAmountWithSlippage],
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: MA_WETH,
        outgoingAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: MA_WETH,
    account: vaultProxy,
    expected: outgoingAmount,
    fuzziness: 100n,
  });
});

test("prepareUseIntegration for ERC4626 lend should be equal to encoded data with encodeCallArgsForErc4626Lend", async () => {
  const slippage = 1n;
  const outgoingAmount = toWei(250);
  const minIncomingAmountWithSlippage = multiplyBySlippage({
    amount: outgoingAmount,
    slippage,
  });

  const minIncomingAmount = await publicClient.readContract({
    abi: abiMaShares,
    address: MA_WETH,
    functionName: "convertToShares",
    args: [minIncomingAmountWithSlippage],
  });

  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: MA_WETH,
        outgoingAmount: outgoingAmount,
        minIncomingAmount: minIncomingAmount,
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
        "0x00000000000000000000000064fa106dd89f21d6e687eebe9384637f7d54f707099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000600000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for ERC4626 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const slippage = 1n;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAmount = toWei(250);
  const minIncomingAmountWithSlippage = multiplyBySlippage({
    amount: outgoingAmount,
    slippage,
  });

  const minIncomingAmount = await publicClient.readContract({
    abi: abiMaAssets,
    address: MA_WETH,
    functionName: "convertToAssets",
    args: [minIncomingAmountWithSlippage],
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: MA_WETH,
        outgoingAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: MA_WETH,
    account: vaultProxy,
    expected: outgoingAmount,
    fuzziness: 100n,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Redeem,
        tokenAddress: WETH,
        outgoingAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: outgoingAmount,
    fuzziness: 100n,
  });
});

test("prepareUseIntegration for ERC4626 redeem should be equal to encoded data with encodeCallArgsForErc4626Redeem", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Redeem,
        tokenAddress: MA_WETH,
        outgoingAmount: toWei(100),
        minIncomingAmount: toWei(100),
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
        "0x00000000000000000000000064fa106dd89f21d6e687eebe9384637f7d54f707c29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000600000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
