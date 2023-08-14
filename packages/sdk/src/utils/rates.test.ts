import { toBps, toSeconds, toWei } from "./conversion.js";
import {
  calculateAmountDueForScaledPerSecondRate,
  convertRateToScaledPerSecondRate,
  convertScaledPerSecondRateToRate,
  multiplyByRate,
} from "./rates.js";
import { expect, test } from "vitest";

// TODO: Provide better test fixtures.
test.each([
  {
    rate: 1000000000158946658547141210n,
    since: toSeconds({ years: 1 }),
    amount: 1000000000000000000n,
    expected: 5028576134389896n,
  },
  {
    rate: 1000000000158946658547141210n,
    since: toSeconds({ days: 1 }),
    amount: 1000000000000000000n,
    expected: 13733085595338n,
  },
  {
    rate: 1000000000158946658547141210n,
    since: toSeconds({ hours: 1 }),
    amount: 1000000000000000000n,
    expected: 572208134435n,
  },
])(
  "calculateAmountDueForScaledPerSecondRate({ scaledPerSecondRate: $rate, secondsSinceLastSettled: $since, totalAmount: $amount }) -> $expected",
  ({ rate, since, amount, expected }) => {
    const result = calculateAmountDueForScaledPerSecondRate({
      scaledPerSecondRate: rate,
      secondsSinceLastSettled: since,
      totalAmount: amount,
    });

    expect(result).toBe(expected);
  },
);

test("convertScaledPerSecondRateToRate should work correctly", () => {
  expect(
    convertScaledPerSecondRateToRate({
      scaledPerSecondRate: 1000000000158946658547141210n,
      adjustInflation: true,
    }),
  ).toMatchInlineSnapshot("5003416075721110n");

  expect(
    convertScaledPerSecondRateToRate({
      scaledPerSecondRate: 1000000000158946658547141210n,
      adjustInflation: false,
    }),
  ).toMatchInlineSnapshot("5028576134389900n");
});

test("convertRateToScaledPerSecondRate should work correctly", () => {
  expect(
    convertRateToScaledPerSecondRate({
      perAnnumRateInBps: toBps(0.123),
      adjustInflation: true,
    }),
  ).toMatchInlineSnapshot("1000000004159007240185733350n");

  expect(
    convertRateToScaledPerSecondRate({
      perAnnumRateInBps: toBps(0.123),
      adjustInflation: false,
    }),
  ).toMatchInlineSnapshot("1000000003675934670872217630n");
});

test("multiplyByRate should work correctly", () => {
  expect(
    multiplyByRate({
      inverse: true,
      rate: toWei(200),
      rateDecimals: 18,
      value: toWei(250),
    }),
  ).toMatchInlineSnapshot("1250000000000000000n");

  expect(
    multiplyByRate({
      inverse: false,
      rate: toWei(150),
      rateDecimals: 6,
      value: toWei(200),
    }),
  ).toMatchInlineSnapshot("30000000000000000000000000000000000n");
});
