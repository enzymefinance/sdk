import { test, expect } from "vitest";
import {
  decodeEntranceRateDirectFeeSettings,
  decodeEntranceRateBurnFeeSettings,
  encodeEntranceRateBurnFeeSettings,
  encodeEntranceRateDirectFeeSettings,
  calculateEntranceRateFeeSharesDue,
  entranceRateBurnFeeSettingsEncoding,
  entranceRateDirectFeeSettingsEncoding,
} from "./entranceFee.js";
import { ALICE } from "../../../tests/constants.js";
import { toBps } from "../../utils/conversion.js";

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
    encodeEntranceRateDirectFeeSettings({ feeRateInBps: toBps(0.567), feeRecipient: ALICE }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000000000000000000000001626000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266"',
  );
});

test("should decode entrance rate direct fee settings correctly", () => {
  expect(
    decodeEntranceRateDirectFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000016260000000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRateInBps": 5670n,
      "feeRecipient": "0x0000000000000000000000000000000000000000",
    }
  `);

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
  ).toMatchInlineSnapshot("123400000000000000n");
});

test("entranceRateBurnFeeSettingsEncoding should have correct properties", () => {
  expect(entranceRateBurnFeeSettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "feeRate",
        "type": "uint256",
      },
    ]
  `);
});

test("entranceRateDirectFeeSettingsEncoding should have correct properties", () => {
  expect(entranceRateDirectFeeSettingsEncoding).toMatchInlineSnapshot(`
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
