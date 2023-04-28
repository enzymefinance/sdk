import { expect, test } from "vitest";
import { testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { prepareDepositToGasRelayPaymasterParams } from "./depositToGasRelayPaymaster.js";
import { toWei } from "../utils/conversion.js";

test("should deposit to gas relay paymaster correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(1500);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await testActions.deployGasRelayPaymaster({
    account: ALICE,
    address: comptrollerProxy,
  });

  await expect(
    testActions.depositToGasRelayPaymaster({
      account: ALICE,
      address: comptrollerProxy,
    }),
  ).resolves.not.toThrow();
});

test("should prepare params correctly", () => {
  expect(prepareDepositToGasRelayPaymasterParams()).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [],
          "name": "depositToGasRelayPaymaster",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "functionName": "depositToGasRelayPaymaster",
    }
  `);
});
