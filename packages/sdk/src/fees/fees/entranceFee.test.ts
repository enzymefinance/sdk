import { test, expect } from "vitest";
import {
  decodeEntranceRateDirectFeeSettings,
  decodeEntranceRateBurnFeeSettings,
  encodeEntranceRateBurnFeeSettings,
  encodeEntranceRateDirectFeeSettings,
} from "./entranceFee.js";

import { toBps } from "../../index.js";
import { vitalik } from "../../../tests/utils/constants.js";

test("should encode entrance rate burn fee settings correctly", () => {
  expect(encodeEntranceRateBurnFeeSettings({ feeRateInBps: toBps(0.123) })).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000004ce",
  );
});

test("should decode entrance rate burn fee settings correctly", () => {
  expect(
    decodeEntranceRateBurnFeeSettings("0x00000000000000000000000000000000000000000000000000000000000004ce"),
  ).toEqual({
    feeRateInBps: toBps(0.123),
  });
});

test("should encode entrace rate direct fee settings correctly", () => {
  expect(encodeEntranceRateDirectFeeSettings({ feeRateInBps: toBps(0.567), feeRecipient: vitalik })).toEqual(
    "0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  );
});

test("should decode entrace rate direct fee settings correctly", () => {
  expect(
    decodeEntranceRateDirectFeeSettings(
      "0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toEqual({
    feeRateInBps: toBps(0.567),
    feeRecipient: vitalik,
  });
});
