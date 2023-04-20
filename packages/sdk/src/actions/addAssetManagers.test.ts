import { expect, test } from "vitest";
import { ALICE, BOB, CAROL, DAVE, WETH } from "../../tests/constants.js";
import {
  decodeAddAssetManagersParams,
  prepareAddAssetManagersParams,
  simulateAddAssetManagers,
} from "./addAssetManagers.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import { ASSET_MANAGER_ALREADY_REGISTERED } from "../errors/errorCodes.js";
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

  await sendTestTransaction(request);

  const [bobIsManager, carolIsManager, daveIsManager] = await testActions.isAssetManagers({
    vaultProxy,
    addresses: [BOB, CAROL, DAVE],
  });

  expect(bobIsManager).toBe(true);
  expect(carolIsManager).toBe(true);
  expect(daveIsManager).toBe(false);
});

test("should not add asset manager if already registered", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const { request } = await simulateAddAssetManagers({
    publicClient,
    managers: [BOB],
    vaultProxy,
    account: ALICE,
  });

  expect(request).toBeTruthy();

  await sendTestTransaction(request);

  await expect(async () => {
    try {
      await simulateAddAssetManagers({
        publicClient,
        managers: [BOB],
        vaultProxy,
        account: ALICE,
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(ASSET_MANAGER_ALREADY_REGISTERED));
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
