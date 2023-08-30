import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../tests/globals.js";
import { prepareClaimOwnershipParams } from "./claimOwnership.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import { expect, test } from "vitest";

test("should claim ownership correctly", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner: ALICE,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const originalOwner = await publicClientMainnet.readContract({
    abi: IVaultLib,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(originalOwner).toEqual(ALICE);

  await testActions.setNominatedOwner({
    network: "mainnet",
    nominatedOwner: BOB,
    account: ALICE,
    vaultProxy,
  });

  const { request } = await publicClientMainnet.simulateContract({
    ...prepareClaimOwnershipParams(),
    address: vaultProxy,
    account: BOB,
  });

  await sendTestTransaction({ ...request, network: "mainnet" });

  const newOwner = await publicClientMainnet.readContract({
    abi: IVaultLib,
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
