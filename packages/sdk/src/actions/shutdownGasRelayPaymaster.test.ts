import { ALICE, WETH } from "../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../tests/globals.js";
import { toWei } from "../utils/conversion.js";
import { prepareShutdownGasRelayPaymasterParams } from "./shutdownGasRelayPaymaster.js";
import { expect, test } from "vitest";

test("should shutdown gas relay paymaster correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(500);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  const withoutGasRelayPaymaster = await testActions.getGasRelayPaymaster({
    comptrollerProxy,
  });

  await testActions.deployGasRelayPaymaster({
    account: ALICE,
    address: comptrollerProxy,
  });

  const withGasRelayPaymaster = await testActions.getGasRelayPaymaster({
    comptrollerProxy,
  });

  expect(withGasRelayPaymaster).not.toEqual(withoutGasRelayPaymaster);

  await expect(
    sendTestTransaction({
      account: ALICE,
      address: comptrollerProxy,
      ...prepareShutdownGasRelayPaymasterParams(),
    }),
  ).resolves.not.toThrow();

  const shutdownGasRelayPaymaster = await testActions.getGasRelayPaymaster({
    comptrollerProxy,
  });

  expect(withoutGasRelayPaymaster).toEqual(shutdownGasRelayPaymaster);
});

test("should prepare params correctly", async () => {
  expect(prepareShutdownGasRelayPaymasterParams()).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [],
          "name": "shutdownGasRelayPaymaster",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "functionName": "shutdownGasRelayPaymaster",
    }
  `);
});
