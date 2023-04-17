import { test, expect } from "vitest";
import {
  encodeExitRateBurnFeeSettings,
  decodeExitRateBurnFeeSettings,
  encodeExitRateDirectFeeSettings,
  decodeExitRateDirectFeeSettings,
  exitRateBurnFeeSettingsEncoding,
  exitRateDirectFeeSettingsEncoding,
  calculateExitRateFeeSharesDue,
} from "./exitFee.js";
import { VITALIK } from "../../../tests/utils/constants.js";
import { toBps } from "../../utils/conversion.js";

test("encodeExitRateBurnFeeSettings should work correctly", () => {
  expect(encodeExitRateBurnFeeSettings({})).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeExitRateBurnFeeSettings({
      inKindRateInBps: toBps(0.12345),
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004d20000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeExitRateBurnFeeSettings({
      specificAssetsRate: 123n,
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b"',
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

test("decodeExitRateBurnFeeSettings should decode correctly", () => {
  expect(
    decodeExitRateBurnFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000000000007b",
    ),
  ).toMatchInlineSnapshot(`
    {
      "inKindRateInBps": 1234n,
      "specificAssetsRate": 123n,
    }
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
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000853a4339230000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeExitRateDirectFeeSettings({
      inKindRateInBps: toBps(0.12345),
      specificAssetsRate: 572208134435n,
      feeRecipient: VITALIK,
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

test("decodeExitRateDirectFeeSettings should decode correctly", () => {
  expect(
    decodeExitRateDirectFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004d2000000000000000000000000000000000000000000000000000000853a433923000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRecipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      "inKindRateInBps": 1234n,
      "specificAssetsRate": 572208134435n,
    }
  `);
});

test("calculateExitRateFeeSharesDue should work correctly", () => {
  expect(
    calculateExitRateFeeSharesDue({
      feeRate: toBps(4),
      sharesRedeemed: 2n,
    }),
  ).toMatchInlineSnapshot("8n");
});
