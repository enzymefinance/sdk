import { expect, test } from "vitest";

import {
  MAX_UINT_128,
  MAX_UINT_256,
  SHARES_UNIT,
  ETH_ADDRESS,
  ZERO_ADDRESS,
  ZERO_ADDRESS_ALT,
  SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS,
  LIB_INIT_GENERIC_DUMMY_ADDRESS,
} from "./misc.js";

test("SHARES_UNIT is correct", () => {
  expect(SHARES_UNIT).toBe(10n ** 18n);
});

test("MAX_UINT_128 is correct", () => {
  expect(MAX_UINT_128).toBe(2n ** 128n - 1n);
});

test("MAX_UINT_256 is correct", () => {
  expect(MAX_UINT_256).toBe(2n ** 256n - 1n);
});

test("ETH_ADDRESS is correct", () => {
  expect(ETH_ADDRESS).toEqual("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
});

test("ZERO_ADDRESS is correct", () => {
  expect(ZERO_ADDRESS).toEqual("0x0000000000000000000000000000000000000000");
});

test("ZERO_ADDRESS_ALT is correct", () => {
  expect(ZERO_ADDRESS_ALT).toEqual("0x0000000000000000000000000000000000000001");
});

test("SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS is correct", () => {
  expect(SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS).toEqual("0x000000000000000000000000000000000000aaaa");
});

test("LIB_INIT_GENERIC_DUMMY_ADDRESS is correct", () => {
  expect(LIB_INIT_GENERIC_DUMMY_ADDRESS).toEqual("0x0000000000000000000000000000000000009999");
});
