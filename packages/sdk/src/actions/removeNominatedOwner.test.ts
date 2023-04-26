import { expect, test } from "vitest";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { simulateRemoveNominatedOwner } from "./removeNominatedOwner.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import { ZERO_ADDRESS } from "../constants/misc.js";
import { REMOVE_NOMINATED_OWNER_NO_OWNER } from "../errors/errorCodes.js";
import { prepareClaimOwnershipParams } from "./claimOwnership.js";

test("should remove nominated owner correctly", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const firstNominatedOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  expect(firstNominatedOwner).toEqual(ZERO_ADDRESS);

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

  const { request } = await simulateRemoveNominatedOwner({
    publicClient,
    account: ALICE,
    vaultProxy,
  });

  await sendTestTransaction(request);

  const lastNominatedOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  expect(lastNominatedOwner).toEqual(ZERO_ADDRESS);
});

test("should fail if called when there is no nominated owner", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await expect(async () => {
    try {
      await simulateRemoveNominatedOwner({
        publicClient,
        vaultProxy,
        account: ALICE,
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(REMOVE_NOMINATED_OWNER_NO_OWNER));
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
