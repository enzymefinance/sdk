import { test, expect } from "vitest";
import { testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH, MANAGEMENT_FEE } from "../../tests/constants.js";
import { encodeManagementFeeSettings } from "../fees/fees/managementFee.js";
import { toBps } from "../utils/conversion.js";

test("should set recipient for fund correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
    feeSettings: [
      {
        address: MANAGEMENT_FEE,
        settings: encodeManagementFeeSettings({
          perAnnumRateInBps: toBps(0.1),
        }),
      },
    ],
  });

  await testActions.setRecipientForFund({
    account: ALICE,
    comptrollerProxy,
    recipient: BOB,
  });

  const newRecipient = await testActions.getRecipientForFund({
    comptrollerProxy,
  });

  expect(newRecipient).toEqual(BOB);
});
