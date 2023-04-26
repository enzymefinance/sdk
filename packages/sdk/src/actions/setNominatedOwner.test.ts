import { expect, test } from "vitest";
import { publicClient, testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { EnzymeError, catchError } from "../errors/catchError.js";
import { decodeSetNominatedOwnerParams, prepareSetNominatedOwnerParams } from "./setNominatedOwner.js";
import { encodeFunctionData } from "viem";
import { ZERO_ADDRESS } from "../constants/misc.js";
import {
  SET_NOMINATED_OWNER_ALREADY_NOMINATED,
  SET_NOMINATED_OWNER_ALREADY_OWNER,
  SET_NOMINATED_OWNER_CANNOT_BE_EMPTY,
} from "../errors/errorCodes.js";

test("should set nominated owner correctly", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const originalOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(originalOwner).toEqual(ALICE);

  await testActions.setNominatedOwner({
    nominatedOwner: BOB,
    account: ALICE,
    vaultProxy,
  });

  const newNominatedOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  expect(newNominatedOwner).toEqual(BOB);
});

test("should fail if nominated owner is empty", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await expect(async () => {
    try {
      await testActions.setNominatedOwner({
        nominatedOwner: ZERO_ADDRESS,
        account: ALICE,
        vaultProxy,
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(SET_NOMINATED_OWNER_CANNOT_BE_EMPTY));
});

test("should fail if nominated owner is already nominated", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await testActions.setNominatedOwner({
    nominatedOwner: BOB,
    account: ALICE,
    vaultProxy,
  });

  await expect(async () => {
    try {
      await testActions.setNominatedOwner({
        nominatedOwner: BOB,
        account: ALICE,
        vaultProxy,
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(SET_NOMINATED_OWNER_ALREADY_NOMINATED));
});

test("should fail if nominated owner is already owner", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await expect(async () => {
    try {
      await testActions.setNominatedOwner({
        nominatedOwner: ALICE,
        account: ALICE,
        vaultProxy,
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(SET_NOMINATED_OWNER_ALREADY_OWNER));
});

test("should prepare params correctly", () => {
  expect(
    prepareSetNominatedOwnerParams({
      nextNominatedOwner: BOB,
    }),
  ).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_nextNominatedOwner",
              "type": "address",
            },
          ],
          "name": "setNominatedOwner",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      ],
      "functionName": "setNominatedOwner",
    }
  `);
});

test("should decode params correctly", () => {
  const params = {
    nextNominatedOwner: BOB,
  };

  const prepared = prepareSetNominatedOwnerParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetNominatedOwnerParams(encoded);

  expect(decoded).toEqual(params);
});
