import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ZERO_ADDRESS } from "../constants/misc.js";
import { prepareClaimOwnershipParams } from "./claimOwnership.js";
import { prepareRemoveNominatedOwnerParams } from "./removeNominatedOwner.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import { expect, test } from "vitest";

test("should remove nominated owner correctly", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner: ALICE,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const firstNominatedOwner = await publicClientMainnet.readContract({
    abi: IVaultLib,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  expect(firstNominatedOwner).toEqual(ZERO_ADDRESS);

  await testActions.setNominatedOwner({
    network: "mainnet",
    nominatedOwner: BOB,
    account: ALICE,
    vaultProxy,
  });

  const newNominatedOwner = await publicClientMainnet.readContract({
    abi: IVaultLib,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  expect(newNominatedOwner).toEqual(BOB);

  const { request } = await publicClientMainnet.simulateContract({
    ...prepareRemoveNominatedOwnerParams(),
    account: ALICE,
    address: vaultProxy,
  });

  await sendTestTransaction({ ...request, network: "mainnet" });

  const lastNominatedOwner = await publicClientMainnet.readContract({
    abi: IVaultLib,
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
