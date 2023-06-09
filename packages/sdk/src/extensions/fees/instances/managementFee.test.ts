import { ALICE } from "../../../../tests/constants.js";
import { toBps, toSeconds } from "../../../utils/conversion.js";
import {
  calculateManagementFeeSharesDue,
  decodeManagementFeeSettings,
  encodeManagementFeeSettings,
  managementFeeSettingsEncoding,
} from "./managementFee.js";
import { expect, test } from "vitest";

test("encodeManagementFeeSettings should work correctly", () => {
  expect(
    encodeManagementFeeSettings({
      perAnnumRateInBps: toBps(0.123),
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e60000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeManagementFeeSettings({
      scaledPerSecondRate: toBps(0.123),
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce0000000000000000000000000000000000000000000000000000000000000000"',
  );

  expect(
    encodeManagementFeeSettings({
      perAnnumRateInBps: toBps(0.123),
      feeRecipient: ALICE,
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e6000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266"',
  );

  expect(
    encodeManagementFeeSettings({
      scaledPerSecondRate: toBps(0.123),
      feeRecipient: ALICE,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266"',
  );
});

test("managementFeeSettingsEncoding should have correct properties", () => {
  expect(managementFeeSettingsEncoding).toMatchInlineSnapshot(`
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

test("decodeManagementFeeSettings should decode correctly", () => {
  expect(
    decodeManagementFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004ce000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRecipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      "scaledPerSecondRate": 1230n,
    }
  `);

  expect(
    decodeManagementFeeSettings(
      "0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e6000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRecipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      "scaledPerSecondRate": 1000000004159007240185733350n,
    }
  `);

  expect(
    decodeManagementFeeSettings(
      "0x00000000000000000000000000000000000000000000000000000000000004ce0000000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRecipient": "0x0000000000000000000000000000000000000000",
      "scaledPerSecondRate": 1230n,
    }
  `);

  expect(
    decodeManagementFeeSettings(
      "0x0000000000000000000000000000000000000000033b2e3cd9884349998c60e60000000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toMatchInlineSnapshot(`
    {
      "feeRecipient": "0x0000000000000000000000000000000000000000",
      "scaledPerSecondRate": 1000000004159007240185733350n,
    }
  `);
});

test("calculateManagementFeeSharesDue should work correctly", () => {
  expect(
    calculateManagementFeeSharesDue({
      scaledPerSecondRate: 1000000000158946658547141210n,
      sharesSupply: 1000000000000000000n,
      secondsSinceLastSettled: toSeconds({ years: 1 }),
    }),
  ).toMatchInlineSnapshot("5028576134389896n");
});
