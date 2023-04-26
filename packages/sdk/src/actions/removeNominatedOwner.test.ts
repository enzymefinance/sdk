import { expect, test } from "vitest";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { ZERO_ADDRESS } from "../constants/misc.js";
import { prepareClaimOwnershipParams } from "./claimOwnership.js";
import { prepareRemoveNominatedOwnerParams } from "./removeNominatedOwner.js";

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

  const { request } = await publicClient.simulateContract({
    ...prepareRemoveNominatedOwnerParams(),
    account: ALICE,
    address: vaultProxy,
  });

  await sendTestTransaction(request);

  const lastNominatedOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  expect(lastNominatedOwner).toEqual(ZERO_ADDRESS);
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
