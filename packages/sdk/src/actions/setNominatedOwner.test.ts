import { expect, test } from "vitest";
import { publicClient, testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { decodeSetNominatedOwnerParams, prepareSetNominatedOwnerParams } from "./setNominatedOwner.js";
import { encodeFunctionData } from "viem";

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

test("should prepare params correctly", () => {
  expect(
    prepareSetNominatedOwnerParams({
      nominatedOwner: BOB,
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
    nominatedOwner: BOB,
  };

  const prepared = prepareSetNominatedOwnerParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetNominatedOwnerParams(encoded);

  expect(decoded).toEqual(params);
});
