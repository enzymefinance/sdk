import { expect, test } from "vitest";

import { AAVE_V2_ADAPTER, ALICE, A_WETH, BOB, INTEGRATION_MANAGER, WETH } from "../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../tests/globals.js";
import { Integration } from "../enums.js";
import { toWei } from "../utils/conversion.js";
import { prepareAdapterTrade } from "./prepareAdapterTrade.js";

test("prepare adapter trade should work correctly", async () => {
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
    ...prepareAdapterTrade({
      integrationManager: INTEGRATION_MANAGER,
      trade: {
        type: Integration.AaveV2Lend,
        callArgs: {
          adapter: AAVE_V2_ADAPTER,
          aToken: A_WETH,
          depositAmount,
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: A_WETH,
    account: vaultProxy,
    expected: depositAmount,
    fuzziness: 100n,
  });
});

test("prepareAdapterTrade should be equal to encoded data with encodeCallArgsForAaveV2Lend", () => {
  expect(
    prepareAdapterTrade({
      integrationManager: INTEGRATION_MANAGER,
      trade: {
        type: Integration.AaveV2Lend,
        callArgs: {
          adapter: AAVE_V2_ADAPTER,
          aToken: A_WETH,
          depositAmount: toWei(100),
        },
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
        "0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4c099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
