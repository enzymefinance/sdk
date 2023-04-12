import { test, expect } from "vitest";
import {
  encodeManagementFeeSettings,
  managementFeeSettingsEncoding,
  calculateManagementFeeSharesDue,
} from "./managementFee.js";
import { toBps, toSeconds } from "src/index.js";
import { vitalik } from "tests/utils/constants.js";

test("encodeManagementFeeSettings should work correctly", () => {
  expect(
    encodeManagementFeeSettings({
      perAnnumRateInBps: toBps(0.123),
    }),
  ).toEqual(
    "0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e60000000000000000000000000000000000000000000000000000000000000000",
  );

  expect(
    encodeManagementFeeSettings({
      scaledPerSecondRate: toBps(0.123),
    }),
  ).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000004ce0000000000000000000000000000000000000000000000000000000000000000",
  );

  expect(
    encodeManagementFeeSettings({
      perAnnumRateInBps: toBps(0.123),
      feeRecipient: vitalik,
    }),
  ).toEqual(
    "0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e6000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  );

  expect(
    encodeManagementFeeSettings({
      scaledPerSecondRate: toBps(0.123),
      feeRecipient: vitalik,
    }),
  ).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  );
});

test("managementFeeSettingsEncoding should have correct properties", () => {
  expect(managementFeeSettingsEncoding.length).toEqual(2);
  expect(managementFeeSettingsEncoding[0].type).toEqual("uint256");
  expect(managementFeeSettingsEncoding[0].name).toEqual("feeRate");
  expect(managementFeeSettingsEncoding[1].type).toEqual("address");
  expect(managementFeeSettingsEncoding[1].name).toEqual("feeRecipient");
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
