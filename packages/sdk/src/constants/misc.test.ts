import { expect, test } from "vitest";

import { MAX_UINT_128, MAX_UINT_256, SHARES_UNIT } from "./misc.js";

test("SHARES_UNIT is correct", () => {
  expect(SHARES_UNIT).toBe(10n ** 18n);
});

test("MAX_UINT_128 is correct", () => {
  expect(MAX_UINT_128).toBe(2n ** 128n - 1n);
});

test("MAX_UINT_256 is correct", () => {
  expect(MAX_UINT_256).toBe(2n ** 256n - 1n);
});
