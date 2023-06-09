import { ALICE, BOB, CAROL, DAVE, WETH } from "../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { prepareAddAssetManagersParams } from "./addAssetManagers.js";
import { decodeRemoveAssetManagersParams, prepareRemoveAssetManagersParams } from "./removeAssetManagers.js";
import { encodeFunctionData } from "viem";
import { expect, test } from "vitest";

test("should remove asset managers", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await sendTestTransaction({
    ...prepareAddAssetManagersParams({
      managers: [BOB, CAROL, DAVE],
    }),
    address: vaultProxy,
    account: ALICE,
  });

  const [bobIsManager, carolIsManager, daveIsManager] = await testActions.isAssetManagers({
    vaultProxy,
    addresses: [BOB, CAROL, DAVE],
  });

  expect([bobIsManager, carolIsManager, daveIsManager]).toEqual([true, true, true]);

  const { request } = await publicClient.simulateContract({
    ...prepareRemoveAssetManagersParams({
      managers: [BOB, CAROL],
    }),
    address: vaultProxy,
    account: ALICE,
  });

  await sendTestTransaction(request);

  const [bobIsStillManager, carolIsStillManager, daveIsStillManager] = await testActions.isAssetManagers({
    vaultProxy,
    addresses: [BOB, CAROL, DAVE],
  });

  expect([bobIsStillManager, carolIsStillManager, daveIsStillManager]).toEqual([false, false, true]);
});

test("should prepare params correctly", () => {
  expect(
    prepareRemoveAssetManagersParams({
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
          "name": "removeAssetManagers",
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
      "functionName": "removeAssetManagers",
    }
  `);
});

test("should decode params correctly", () => {
  const params = {
    managers: [BOB, CAROL],
  };
  const prepared = prepareRemoveAssetManagersParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeRemoveAssetManagersParams(encoded);

  expect(decoded).toEqual(params);
});
