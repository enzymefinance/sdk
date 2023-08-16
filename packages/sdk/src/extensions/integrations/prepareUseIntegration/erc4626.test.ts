import { expect, test } from "vitest";
import { AAVE_V3_A_WETH, ALICE, BOB, ERC4626_ADAPTER, INTEGRATION_MANAGER, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";

test("prepare adapter trade for ERC4626 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAmount = toWei(250);
  const minIncomingAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: outgoingAmount,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: AAVE_V3_A_WETH,
        outgoingAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V3_A_WETH,
    account: vaultProxy,
    expected: outgoingAmount,
    fuzziness: 100n,
  });
});

test("prepareUseIntegration for ERC4626 lend should be equal to encoded data with encodeCallArgsForErc4626Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: AAVE_V3_A_WETH,
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
        "0x0000000000000000000000000x64Fa106DD89F21d6e687EEbE9384637F7d54f707099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for ERC4626 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: AAVE_V3_A_WETH,
        outgoingAmount: investmentAmount,
        minIncomingAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V3_A_WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Redeem,
        tokenAddress: AAVE_V3_A_WETH,
        outgoingAmount: investmentAmount,
        minIncomingAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: investmentAmount,
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
        tokenAddress: AAVE_V3_A_WETH,
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
        "0x0000000000000000000000000x64Fa106DD89F21d6e687EEbE9384637F7d54f707c29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
