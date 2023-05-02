import { ALICE } from "../../../tests/constants.js";
import { toBps } from "../../utils/conversion.js";
import {
  decodePerformanceFeeSettings,
  encodePerformanceFeeSettings,
  performanceFeeSettingsEncoding,
} from "./performanceFee.js";
import { expect, test } from "vitest";

test("should encode performance fee settings correctly", () => {
  expect(
    encodePerformanceFeeSettings({
      feeRateInBps: toBps(0.123),
      feeRecipient: ALICE,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266"',
  );

  expect(
    encodePerformanceFeeSettings({
      feeRateInBps: toBps(0.123),
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce0000000000000000000000000000000000000000000000000000000000000000"',
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

  expect(
    decodePerformanceFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004ce0000000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRateInBps": 1230n,
      "feeRecipient": "0x0000000000000000000000000000000000000000",
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
