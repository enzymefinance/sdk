import { expect, test } from "vitest";
import { ALICE, BOB, CAROL, DAVE, WETH } from "../../tests/constants.js";
import {
  decodeAddAssetManagersParams,
  prepareAddAssetManagersParams,
  simulateAddAssetManagers,
} from "./addAssetManagers.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { encodeFunctionData } from "viem";

test("should add asset managers", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const { request } = await simulateAddAssetManagers({
    publicClient,
    managers: [BOB, CAROL],
    vaultProxy,
    account: ALICE,
  });

  expect(request).toBeTruthy();

  await sendTestTransaction(request);

  const [bobIsManager, carolIsManager, daveIsManager] = await testActions.isAssetManagers({
    vaultProxy,
    addresses: [BOB, CAROL, DAVE] as const,
  });

  expect([bobIsManager, carolIsManager, daveIsManager]).toEqual([true, true, false]);
});

test("should prepare params correctly", () => {
  expect(
    prepareAddAssetManagersParams({
      managers: [BOB],
    }),
  ).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "_managers",
              "type": "address[]",
            },
          ],
          "name": "addAssetManagers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        [
          "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        ],
      ],
      "functionName": "addAssetManagers",
    }
  `);
});

test("should decode params correctly", () => {
  const params = {
    managers: [BOB, ALICE],
  };
  const prepared = prepareAddAssetManagersParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeAddAssetManagersParams(encoded);

  expect(decoded).toEqual(params);
});
