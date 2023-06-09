import { ALICE, WETH } from "../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../tests/globals.js";
import { toWei } from "../utils/conversion.js";
import { prepareDepositToGasRelayPaymasterParams } from "./depositToGasRelayPaymaster.js";
import { expect, test } from "vitest";

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
    sendTestTransaction({
      account: ALICE,
      address: comptrollerProxy,
      ...prepareDepositToGasRelayPaymasterParams(),
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
