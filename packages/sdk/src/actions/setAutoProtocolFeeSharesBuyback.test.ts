import { expect, test } from "vitest";
import { encodeFunctionData } from "viem";
import {
  prepareSetAutoProtocolFeeSharesBuybackParams,
  decodeSetAutoProtocolFeeSharesBuybackParams,
} from "./setAutoProtocolFeeSharesBuyback.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";

test("setAutoProtocolFeeSharesBuyback should work correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const { request: setAutoProtocolFeeSharesBuybackTrue } = await publicClient.simulateContract({
    ...prepareSetAutoProtocolFeeSharesBuybackParams({
      enabled: true,
    }),
    account: ALICE,
    address: comptrollerProxy,
  });

  expect(setAutoProtocolFeeSharesBuybackTrue).toBeTruthy();

  const autoProtocolFeeSharesBuybackBefore = await testActions.usesAutoProcolFeeSharesBuyBack({
    address: comptrollerProxy,
  });

  expect(autoProtocolFeeSharesBuybackBefore).toBe(false);

  await sendTestTransaction(setAutoProtocolFeeSharesBuybackTrue);

  const autoProtocolFeeSharesBuybackAfter = await testActions.usesAutoProcolFeeSharesBuyBack({
    address: comptrollerProxy,
  });

  expect(autoProtocolFeeSharesBuybackAfter).toBe(true);

  const { request: setAutoProtocolFeeSharesBuybackFalse } = await publicClient.simulateContract({
    ...prepareSetAutoProtocolFeeSharesBuybackParams({
      enabled: false,
    }),
    account: ALICE,
    address: comptrollerProxy,
  });

  expect(setAutoProtocolFeeSharesBuybackFalse).toBeTruthy();

  await sendTestTransaction(setAutoProtocolFeeSharesBuybackFalse);

  const autoProtocolFeeSharesBuybackAfterAgain = await testActions.usesAutoProcolFeeSharesBuyBack({
    address: comptrollerProxy,
  });

  expect(autoProtocolFeeSharesBuybackAfterAgain).toBe(false);
});

test("should prepare params correctly", () => {
  expect(
    prepareSetAutoProtocolFeeSharesBuybackParams({
      enabled: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "bool",
              "name": "_nextAutoProtocolFeeSharesBuyback",
              "type": "bool",
            },
          ],
          "name": "setAutoProtocolFeeSharesBuyback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        true,
      ],
      "functionName": "setAutoProtocolFeeSharesBuyback",
    }
  `);
});

test("should decode params correctly", () => {
  const params = {
    enabled: true,
  };
  const prepared = prepareSetAutoProtocolFeeSharesBuybackParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetAutoProtocolFeeSharesBuybackParams(encoded);

  expect(decoded).toEqual(params);
});
