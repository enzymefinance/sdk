import { test, expect } from "vitest";
import {
  encodeManagementFeeSettings,
  managementFeeSettingsEncoding,
  calculateManagementFeeSharesDue,
} from "./managementFee.js";
import { VITALIK } from "../../../tests/utils/constants.js";
import { toBps, toSeconds } from "../../utils/conversion.js";

test("encodeManagementFeeSettings should work correctly", () => {
  expect(
    encodeManagementFeeSettings({
      perAnnumRateInBps: toBps(0.123),
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e60000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeManagementFeeSettings({
      scaledPerSecondRate: toBps(0.123),
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce0000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeManagementFeeSettings({
      perAnnumRateInBps: toBps(0.123),
      feeRecipient: VITALIK,
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e6000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045"',
  );

  expect(
    encodeManagementFeeSettings({
      scaledPerSecondRate: toBps(0.123),
      feeRecipient: VITALIK,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045"',
  );
});

test("managementFeeSettingsEncoding should have correct properties", () => {
  expect(managementFeeSettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "feeRate",
        "type": "uint256",
      },
      {
        "name": "feeRecipient",
        "type": "address",
      },
    ]
  `);
});

test("calculateManagementFeeSharesDue should work correctly", () => {
  expect(
    calculateManagementFeeSharesDue({
      scaledPerSecondRate: 1000000000158946658547141210n,
      sharesSupply: 1000000000000000000n,
      secondsSinceLastSettled: toSeconds({ years: 1 }),
    }),
  ).toEqual(5028576134389896n);
});
