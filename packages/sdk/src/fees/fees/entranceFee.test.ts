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
  expect(encodeEntranceRateBurnFeeSettings({ feeRateInBps: toBps(0.123) })).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce"',
  );
});

test("should decode entrance rate burn fee settings correctly", () => {
  expect(
    decodeEntranceRateBurnFeeSettings("0x00000000000000000000000000000000000000000000000000000000000004ce"),
  ).toMatchInlineSnapshot(`
    {
      "feeRateInBps": 1230n,
    }
  `);
});

test("should encode entrance rate direct fee settings correctly", () => {
  expect(
    encodeEntranceRateDirectFeeSettings({
      feeRateInBps: toBps(0.567),
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000016260000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeEntranceRateDirectFeeSettings({ feeRateInBps: toBps(0.567), feeRecipient: vitalik }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045"',
  );
});

test("should decode entrance rate direct fee settings correctly", () => {
  expect(
    decodeEntranceRateDirectFeeSettings(
      "0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRateInBps": 5670n,
      "feeRecipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    }
  `);
});

test("should calculate entrance fee shares due correctly", () => {
  expect(
    calculateEntranceRateFeeSharesDue({ feeRateInBps: toBps(0.12345), sharesBought: 1000000000000000000n }),
  ).toEqual(123400000000000000n);
});

test("entraceRateBurnFeeSettingsEncoding should have correct properties", () => {
  expect(entraceRateBurnFeeSettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "feeRate",
        "type": "uint256",
      },
    ]
  `);
});

test("entraceRateDirectFeeSettingsEncoding should have correct properties", () => {
  expect(entraceRateDirectFeeSettingsEncoding).toMatchInlineSnapshot(`
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
