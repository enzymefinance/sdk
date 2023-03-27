import { expect, it } from "vitest";

import { ONE_HOUR_IN_SECONDS, ONE_DAY_IN_SECONDS, ONE_WEEK_IN_SECONDS, ONE_YEAR_IN_SECONDS } from "./time.js";

it("ONE_HOUR_IN_SECONDS is correct", () => {
  expect(ONE_HOUR_IN_SECONDS).toBe(BigInt(60 * 60));
});

it("ONE_DAY_IN_SECONDS is correct", () => {
  expect(ONE_DAY_IN_SECONDS).toBe(BigInt(60 * 60 * 24));
});

it("ONE_WEEK_IN_SECONDS is correct", () => {
  expect(ONE_WEEK_IN_SECONDS).toBe(BigInt(60 * 60 * 24 * 7));
});

it("ONE_YEAR_IN_SECONDS is correct", () => {
  expect(ONE_YEAR_IN_SECONDS).toBe(BigInt(60 * 60 * 24 * 365.25));
});
