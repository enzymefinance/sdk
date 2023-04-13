import { test, expect } from "vitest";
import {
  decodePerformanceFeeSettings,
  encodePerformanceFeeSettings,
  performanceFeeSettingsEncoding,
} from "./performanceFee.js";

import { vitalik } from "../../../tests/utils/constants.js";
import { toBps } from "../../utils/conversion.js";

test("should encode performance fee settings correctly", () => {
  expect(
    encodePerformanceFeeSettings({
      feeRateInBps: toBps(0.123),
      feeRecipient: vitalik,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045"',
  );
});

test("should decode performance fee settings correctly", () => {
  expect(
    decodePerformanceFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRateInBps": 1230n,
      "feeRecipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    }
  `);
});

test("performanceFeeSettingsEncoding should have correct properties", () => {
  expect(performanceFeeSettingsEncoding).toMatchInlineSnapshot(`
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
