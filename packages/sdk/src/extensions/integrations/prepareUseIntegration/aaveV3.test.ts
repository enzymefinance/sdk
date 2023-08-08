import { AAVE_V3_ADAPTER, AAVE_V3_A_WETH, ALICE, BOB, INTEGRATION_MANAGER, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { expect, test } from "vitest";

test("prepare adapter trade for Aave V3 lend should work correctly", async () => {
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
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Lend,
        aToken: AAVE_V3_A_WETH,
        depositAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V3_A_WETH,
    account: vaultProxy,
    expected: depositAmount,
    fuzziness: 100n,
  });
});

test("prepareUseIntegration for Aave V3 lend should be equal to encoded data with encodeCallArgsForAaveV3Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Lend,
        aToken: AAVE_V3_A_WETH,
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
        "0x0000000000000000000000009cfb64d91ce4eb821ff8edc1c2fda2e89e256707099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for Aave V3 redeem should work correctly", async () => {
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
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Lend,
        aToken: AAVE_V3_A_WETH,
        depositAmount: investmentAmount,
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
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Redeem,
        aToken: AAVE_V3_A_WETH,
        redeemAmount: investmentAmount,
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

test("prepareUseIntegration for Aave V3 redeem should be equal to encoded data with encodeCallArgsForAaveV3Redeem", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Redeem,
        aToken: AAVE_V3_A_WETH,
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
        "0x0000000000000000000000009cfb64d91ce4eb821ff8edc1c2fda2e89e256707c29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
