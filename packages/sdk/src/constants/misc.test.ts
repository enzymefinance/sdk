import { expect, test } from "vitest";

import {
  ETH_ADDRESS,
  LIB_INIT_GENERIC_DUMMY_ADDRESS,
  MAX_UINT_128,
  MAX_UINT_256,
  SHARES_UNIT,
  SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS,
  ZERO_ADDRESS,
  ZERO_ADDRESS_ALT,
} from "./misc.js";

test("SHARES_UNIT is correct", () => {
  expect(SHARES_UNIT).toMatchInlineSnapshot("1000000000000000000n");
});

test("MAX_UINT_128 is correct", () => {
  expect(MAX_UINT_128).toMatchInlineSnapshot("340282366920938463463374607431768211455n");
});

test("MAX_UINT_256 is correct", () => {
  expect(MAX_UINT_256).toMatchInlineSnapshot(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935n",
  );
});

test("ETH_ADDRESS is correct", () => {
  expect(ETH_ADDRESS).toMatchInlineSnapshot('"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"');
});

test("ZERO_ADDRESS is correct", () => {
  expect(ZERO_ADDRESS).toMatchInlineSnapshot('"0x0000000000000000000000000000000000000000"');
});

test("ZERO_ADDRESS_ALT is correct", () => {
  expect(ZERO_ADDRESS_ALT).toMatchInlineSnapshot('"0x0000000000000000000000000000000000000001"');
});

test("SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS is correct", () => {
  expect(SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS).toMatchInlineSnapshot(
    '"0x000000000000000000000000000000000000aaaa"',
  );
});

test("LIB_INIT_GENERIC_DUMMY_ADDRESS is correct", () => {
  expect(LIB_INIT_GENERIC_DUMMY_ADDRESS).toMatchInlineSnapshot('"0x0000000000000000000000000000000000009999"');
});
