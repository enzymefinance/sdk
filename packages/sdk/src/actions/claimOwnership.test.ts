import { expect, test } from "vitest";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, BOB, CAROL, WETH } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { prepareClaimOwnershipParams, simulateClaimOwnership } from "./claimOwnership.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import { CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER } from "../errors/errorCodes.js";

test("should claim ownership correctly", async () => {
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

  const { request } = await simulateClaimOwnership({
    publicClient,
    vaultProxy,
    account: BOB,
  });

  await sendTestTransaction(request);

  const newOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(newOwner).toEqual(BOB);
});

test("should throw error if not claimed by nominated owner", async () => {
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
      await simulateClaimOwnership({
        publicClient,
        vaultProxy,
        account: CAROL,
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER));
});

test("should prepare params correctly", () => {
  expect(prepareClaimOwnershipParams()).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [],
          "name": "claimOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "functionName": "claimOwnership",
    }
  `);
});
