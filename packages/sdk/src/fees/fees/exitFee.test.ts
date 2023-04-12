import { test, expect } from "vitest";
import {
  encodeExitRateBurnFeeSettings,
  encodeExitRateDirectFeeSettings,
  exitRateBurnFeeSettingsEncoding,
  exitRateDirectFeeSettingsEncoding,
  calculateExitRateFeeSharesDue,
} from "./exitFee.js";
import { toBps } from "../../index.js";
import { vitalik } from "../../../tests/utils/constants.js";

test("encodeExitRateBurnFeeSettings should work correctly", () => {
  expect(encodeExitRateBurnFeeSettings({})).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeExitRateBurnFeeSettings({
      inKindRateInBps: toBps(0.12345),
      specificAssetsRate: 123n,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000000000007b"',
  );
});

test("exitRateBurnFeeSettingsEncoding should have correct properties", () => {
  expect(exitRateBurnFeeSettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "inKindRate",
        "type": "uint256",
      },
      {
        "name": "specificAssetsRate",
        "type": "uint256",
      },
    ]
  `);
});

test("encodeExitRateDirectFeeSettings should work correctly", () => {
  expect(encodeExitRateDirectFeeSettings({})).toMatchInlineSnapshot(
    '"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeExitRateDirectFeeSettings({
      inKindRateInBps: toBps(0.12345),
      specificAssetsRate: 572208134435n,
      feeRecipient: vitalik,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000853a433923000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045"',
  );
});

test("exitRateDirectFeeSettingsEncoding should have correct properties", () => {
  expect(exitRateDirectFeeSettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "inKindRate",
        "type": "uint256",
      },
      {
        "name": "specificAssetsRate",
        "type": "uint256",
      },
      {
        "name": "feeRecipient",
        "type": "address",
      },
    ]
  `);
});

test("calculateExitRateFeeSharesDue should work correctly", () => {
  expect(
    calculateExitRateFeeSharesDue({
      feeRate: toBps(4),
      sharesRedeemed: 2n,
    }),
  ).toEqual(8n);
});
