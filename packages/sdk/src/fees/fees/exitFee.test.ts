import { test, expect } from "vitest";
import {
  encodeExitRateBurnFeeSettings,
  encodeExitRateDirectFeeSettings,
  exitRateBurnFeeSettingsEncoding,
  exitRateDirectFeeSettingsEncoding,
  calculateExitRateFeeSharesDue,
} from "./exitFee.js";
import { toBps } from "src/index.js";
import { vitalik } from "tests/utils/constants.js";

test("encodeExitRateBurnFeeSettings should work correctly", () => {
  expect(encodeExitRateBurnFeeSettings({})).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  );

  expect(
    encodeExitRateBurnFeeSettings({
      inKindRateInBps: toBps(0.12345),
      specificAssetsRate: 123n,
    }),
  ).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000000000007b",
  );
});

test("exitRateBurnFeeSettingsEncoding should have correct properties", () => {
  expect(exitRateBurnFeeSettingsEncoding.length).toEqual(2);
  expect(exitRateBurnFeeSettingsEncoding[0].type).toEqual("uint256");
  expect(exitRateBurnFeeSettingsEncoding[0].name).toEqual("inKindRate");
  expect(exitRateBurnFeeSettingsEncoding[1].type).toEqual("uint256");
  expect(exitRateBurnFeeSettingsEncoding[1].name).toEqual("specificAssetsRate");
});

test("encodeExitRateDirectFeeSettings should work correctly", () => {
  expect(encodeExitRateDirectFeeSettings({})).toEqual(
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  );

  expect(
    encodeExitRateDirectFeeSettings({
      inKindRateInBps: toBps(0.12345),
      specificAssetsRate: 572208134435n,
      feeRecipient: vitalik,
    }),
  ).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000853a433923000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  );
});

test("exitRateDirectFeeSettingsEncoding should have correct properties", () => {
  expect(exitRateDirectFeeSettingsEncoding.length).toEqual(3);
  expect(exitRateDirectFeeSettingsEncoding[0].type).toEqual("uint256");
  expect(exitRateDirectFeeSettingsEncoding[0].name).toEqual("inKindRate");
  expect(exitRateDirectFeeSettingsEncoding[1].type).toEqual("uint256");
  expect(exitRateDirectFeeSettingsEncoding[1].name).toEqual("specificAssetsRate");
  expect(exitRateDirectFeeSettingsEncoding[2].type).toEqual("address");
  expect(exitRateDirectFeeSettingsEncoding[2].name).toEqual("feeRecipient");
});

test("calculateExitRateFeeSharesDue should work correctly", () => {
  expect(
    calculateExitRateFeeSharesDue({
      feeRate: toBps(4),
      sharesRedeemed: 2n,
    }),
  ).toEqual(8n);
});
