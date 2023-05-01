import { ALICE, WETH } from "../../tests/constants.js";
import { testActions } from "../../tests/globals.js";
import { prepareFreelyTransferableSharesParams } from "./setFreelyTransferableShares.js";
import { expect, test } from "vitest";

test("sets freely transferable shares correctly", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const firstFreelyTransferableShares = await testActions.sharesAreFreelyTransferable({
    address: vaultProxy,
  });

  expect(firstFreelyTransferableShares).toBe(false);

  await testActions.setFreelyTransferableShares({
    vaultProxy,
    account: ALICE,
  });

  const secondFreelyTransferableShares = await testActions.sharesAreFreelyTransferable({
    address: vaultProxy,
  });

  expect(secondFreelyTransferableShares).toBe(true);
});

test("should prepare params correctly", () => {
  expect(prepareFreelyTransferableSharesParams()).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [],
          "name": "setFreelyTransferableShares",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "functionName": "setFreelyTransferableShares",
    }
  `);
});
