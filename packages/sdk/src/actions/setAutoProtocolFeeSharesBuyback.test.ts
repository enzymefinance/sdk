import { expect, test } from "vitest";
import {
  simulateSetAutoProtocolFeeSharesBuyback,
  prepareSetAutoProtocolFeeSharesBuybackParams,
  decodeSetAutoProtocolFeeSharesBuybackParams,
} from "./setAutoProtocolFeeSharesBuyback.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { encodeFunctionData } from "viem";

test("setAutoProtocolFeeSharesBuyback should work correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const { request: setAutoProtocolFeeSharesBuybackTrue } = await simulateSetAutoProtocolFeeSharesBuyback({
    publicClient,
    nextAutoProtocolFeeSharesBuyback: true,
    vaultOwner: ALICE,
    comptrollerProxy,
  });

  expect(setAutoProtocolFeeSharesBuybackTrue).toBeTruthy();

  const autoProtocolFeeSharesBuybackBefore = await testActions.doesAutoProtocolFeeSharesBuyback({
    address: comptrollerProxy,
  });

  expect(autoProtocolFeeSharesBuybackBefore).toBe(false);

  await sendTestTransaction(setAutoProtocolFeeSharesBuybackTrue);

  const autoProtocolFeeSharesBuybackAfter = await testActions.doesAutoProtocolFeeSharesBuyback({
    address: comptrollerProxy,
  });

  expect(autoProtocolFeeSharesBuybackAfter).toBe(true);

  const { request: setAutoProtocolFeeSharesBuybackFalse } = await simulateSetAutoProtocolFeeSharesBuyback({
    publicClient,
    nextAutoProtocolFeeSharesBuyback: false,
    vaultOwner: ALICE,
    comptrollerProxy,
  });

  expect(setAutoProtocolFeeSharesBuybackFalse).toBeTruthy();

  await sendTestTransaction(setAutoProtocolFeeSharesBuybackFalse);

  const autoProtocolFeeSharesBuybackAfterAgain = await testActions.doesAutoProtocolFeeSharesBuyback({
    address: comptrollerProxy,
  });

  expect(autoProtocolFeeSharesBuybackAfterAgain).toBe(false);
});

test("should prepare params correctly", () => {
  expect(
    prepareSetAutoProtocolFeeSharesBuybackParams({
      nextAutoProtocolFeeSharesBuyback: true,
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
    nextAutoProtocolFeeSharesBuyback: true,
  };
  const prepared = prepareSetAutoProtocolFeeSharesBuybackParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetAutoProtocolFeeSharesBuybackParams(encoded);

  expect(decoded).toEqual(params);
});
