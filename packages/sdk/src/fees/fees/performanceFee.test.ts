import { test, expect } from "vitest";
import { decodePerformanceFeeSettings, encodePerformanceFeeSettings } from "./performanceFee.js";

import { toBps } from "../../index.js";
import { vitalik } from "../../../tests/utils/constants.js";

test("should encode performance fee settings correctly", () => {
  expect(
    encodePerformanceFeeSettings({
      feeRateInBps: toBps(0.123),
      feeRecipient: vitalik,
    }),
  ).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  );
});

test("should decode performance fee settings correctly", () => {
  expect(
    decodePerformanceFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toEqual({
    feeRateInBps: toBps(0.123),
    feeRecipient: vitalik,
  });
});
