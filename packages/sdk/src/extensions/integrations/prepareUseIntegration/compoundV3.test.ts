import {
  ALICE,
  BOB,
  COMPOUND_V3_ADAPTER,
  COMPOUND_V3_C_WETH,
  INTEGRATION_MANAGER,
  WETH,
} from "../../../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { expect, test } from "vitest";

test("prepare adapter trade for Compound V3 lend should work correctly", async () => {
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

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Lend,
        cToken: COMPOUND_V3_C_WETH,
        depositAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V3_C_WETH,
    account: vaultProxy,
    expected: depositAmount,
    fuzziness: 100n,
  });
});

test("prepareUseIntegration for Compound V3 lend should be equal to encoded data with encodeCallArgsForCompoundV3Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Lend,
        cToken: COMPOUND_V3_C_WETH,
        depositAmount: toWei(100),
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
        "0x000000000000000000000000faa9b9cc98503f51a54f6038dfdd0e43aa0ac98e099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae940000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for Compound V3 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const investmentAmount = toWei(100);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Lend,
        cToken: COMPOUND_V3_C_WETH,
        depositAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V3_C_WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });

  const redeemAmount = toWei(50);

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Redeem,
        cToken: COMPOUND_V3_C_WETH,
        redeemAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: redeemAmount,
    fuzziness: 100n,
  });
});

test("prepareUseIntegration for Compound V3 redeem should be equal to encoded data with encodeCallArgsForCompoundV3Redeem", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Redeem,
        cToken: COMPOUND_V3_C_WETH,
        redeemAmount: toWei(100),
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
        "0x000000000000000000000000faa9b9cc98503f51a54f6038dfdd0e43aa0ac98ec29fa9dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae940000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
