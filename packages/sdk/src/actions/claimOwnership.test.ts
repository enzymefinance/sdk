import { expect, test } from "vitest";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { prepareClaimOwnershipParams } from "./claimOwnership.js";

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

  const { request } = await publicClient.simulateContract({
    ...prepareClaimOwnershipParams(),
    address: vaultProxy,
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
