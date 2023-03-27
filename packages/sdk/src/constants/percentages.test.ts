import { expect, it } from "vitest";

import {
  ONE_PERCENT_IN_BPS,
  FIVE_PERCENT_IN_BPS,
  TEN_PERCENT_IN_BPS,
  ONE_HUNDRED_PERCENT_IN_BPS,
  ONE_ONE_HUNDREDTH_PERCENT_IN_WEI,
  ONE_PERCENT_IN_WEI,
  FIVE_PERCENT_IN_WEI,
  TEN_PERCENT_IN_WEI,
  ONE_HUNDRED_PERCENT_IN_WEI,
} from "./percentages.js";

it("ONE_PERCENT_IN_BPS is correct", () => {
  expect(ONE_PERCENT_IN_BPS).toBe(100n);
});

it("FIVE_PERCENT_IN_BPS is correct", () => {
  expect(FIVE_PERCENT_IN_BPS).toBe(500n);
});

it("TEN_PERCENT_IN_BPS is correct", () => {
  expect(TEN_PERCENT_IN_BPS).toBe(1_000n);
});

it("ONE_HUNDRED_PERCENT_IN_BPS is correct", () => {
  expect(ONE_HUNDRED_PERCENT_IN_BPS).toBe(10_000n);
});

it("ONE_ONE_HUNDREDTH_PERCENT_IN_WEI is correct", () => {
  expect(ONE_ONE_HUNDREDTH_PERCENT_IN_WEI).toBe(10n ** 14n);
});

it("ONE_PERCENT_IN_WEI is correct", () => {
  expect(ONE_PERCENT_IN_WEI).toBe(10n ** 16n);
});

it("FIVE_PERCENT_IN_WEI is correct", () => {
  expect(FIVE_PERCENT_IN_WEI).toBe(10n ** 16n * 5n);
});

it("TEN_PERCENT_IN_WEI is correct", () => {
  expect(TEN_PERCENT_IN_WEI).toBe(10n ** 17n);
});

it("ONE_HUNDRED_PERCENT_IN_WEI is correct", () => {
  expect(ONE_HUNDRED_PERCENT_IN_WEI).toBe(10n ** 18n);
});
