import { expect, test } from "vitest";
import { testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { prepareDeployGasRelayPaymasterParams } from "./deployGasRelayPaymaster.js";
import { toWei } from "../utils/conversion.js";
import { ZERO_ADDRESS } from "../constants/misc.js";

test("should deploy gas relay paymaster correctly", async () => {
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

  expect(withoutGasRelayPaymaster).toEqual(ZERO_ADDRESS);

  await testActions.deployGasRelayPaymaster({
    account: ALICE,
    address: comptrollerProxy,
  });

  const withGasRelayPaymaster = await testActions.getGasRelayPaymaster({
    comptrollerProxy,
  });

  expect(withGasRelayPaymaster).not.toEqual(ZERO_ADDRESS);
});

test("should prepare params correctly", () => {
  expect(prepareDeployGasRelayPaymasterParams()).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [],
          "name": "deployGasRelayPaymaster",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "functionName": "deployGasRelayPaymaster",
    }
  `);
});
