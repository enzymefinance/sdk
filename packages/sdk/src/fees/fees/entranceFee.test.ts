import { test, expect } from "vitest";
import {
  decodeEntranceRateDirectFeeSettings,
  decodeEntranceRateBurnFeeSettings,
  encodeEntranceRateBurnFeeSettings,
  encodeEntranceRateDirectFeeSettings,
  calculateEntranceRateFeeSharesDue,
  entraceRateBurnFeeSettingsEncoding,
  entraceRateDirectFeeSettingsEncoding,
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

test("should encode entrance rate direct fee settings correctly", () => {
  const usingZeroAddress = encodeEntranceRateDirectFeeSettings({
    feeRateInBps: toBps(0.567),
  });
  expect(usingZeroAddress).toEqual(
    "0x00000000000000000000000000000000000000000000000000000000000016260000000000000000000000000000000000000000000000000000000000000000",
  );

  const usingAddress = encodeEntranceRateDirectFeeSettings({ feeRateInBps: toBps(0.567), feeRecipient: vitalik });
  expect(usingAddress).toEqual(
    "0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  );
});

test("should decode entrance rate direct fee settings correctly", () => {
  expect(
    decodeEntranceRateDirectFeeSettings(
      "0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toEqual({
    feeRateInBps: toBps(0.567),
    feeRecipient: vitalik,
  });
});

test("should calculate entrance fee shares due correctly", () => {
  expect(
    calculateEntranceRateFeeSharesDue({ feeRateInBps: toBps(0.12345), sharesBought: 1000000000000000000n }),
  ).toEqual(123400000000000000n);
});

test("entraceRateBurnFeeSettingsEncoding should have correct properties", () => {
  expect(entraceRateBurnFeeSettingsEncoding.length).toEqual(1);
  expect(entraceRateBurnFeeSettingsEncoding[0].type).toEqual("uint256");
  expect(entraceRateBurnFeeSettingsEncoding[0].name).toEqual("feeRate");
});

test("entraceRateDirectFeeSettingsEncoding should have correct properties", () => {
  expect(entraceRateDirectFeeSettingsEncoding.length).toEqual(2);
  expect(entraceRateDirectFeeSettingsEncoding[0].type).toEqual("uint256");
  expect(entraceRateDirectFeeSettingsEncoding[0].name).toEqual("feeRate");
  expect(entraceRateDirectFeeSettingsEncoding[1].type).toEqual("address");
  expect(entraceRateDirectFeeSettingsEncoding[1].name).toEqual("feeRecipient");
});
