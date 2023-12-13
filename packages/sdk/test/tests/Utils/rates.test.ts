import { Conversion, Rates } from "@enzymefinance/sdk/Utils";
import { expect, test } from "vitest";

// TODO: Provide better test fixtures.
test.each([
  {
    rate: 1000000000158946658547141210n,
    since: Conversion.toSeconds({ years: 1 }),
    amount: 1000000000000000000n,
    expected: 5028576134389896n,
  },
  {
    rate: 1000000000158946658547141210n,
    since: Conversion.toSeconds({ days: 1 }),
    amount: 1000000000000000000n,
    expected: 13733085595338n,
  },
  {
    rate: 1000000000158946658547141210n,
    since: Conversion.toSeconds({ hours: 1 }),
    amount: 1000000000000000000n,
    expected: 572208134435n,
  },
])(
  "calculateAmountDueForScaledPerSecondRate({ scaledPerSecondRate: $rate, secondsSinceLastSettled: $since, totalAmount: $amount }) -> $expected",
  ({ rate, since, amount, expected }) => {
    const result = Rates.calculateAmountDueForScaledPerSecondRate({
      scaledPerSecondRate: rate,
      secondsSinceLastSettled: since,
      totalAmount: amount,
    });

    expect(result).toBe(expected);
  },
);

test("convertScaledPerSecondRateToRate should work correctly", () => {
  expect(
    Rates.convertScaledPerSecondRateToRate({
      scaledPerSecondRate: 1000000000158946658547141210n,
      adjustInflation: true,
    }),
  ).toMatchInlineSnapshot("5003416075721110n");

  expect(
    Rates.convertScaledPerSecondRateToRate({
      scaledPerSecondRate: 1000000000158946658547141210n,
      adjustInflation: false,
    }),
  ).toMatchInlineSnapshot("5028576134389900n");
});

test("convertRateToScaledPerSecondRate should work correctly", () => {
  expect(
    Rates.convertRateToScaledPerSecondRate({
      perAnnumRate: Conversion.toWei(0.123),
      adjustInflation: true,
    }),
  ).toMatchInlineSnapshot("1000000004159007240185733350n");

  expect(
    Rates.convertRateToScaledPerSecondRate({
      perAnnumRate: Conversion.toWei(0.123),
      adjustInflation: false,
    }),
  ).toMatchInlineSnapshot("1000000003675934670872217630n");
});

test("multiplyByRate should work correctly", () => {
  expect(
    Rates.multiplyByRate({
      inverse: true,
      rate: Conversion.toWei(200),
      rateDecimals: 18,
      value: Conversion.toWei(250),
    }),
  ).toMatchInlineSnapshot("1250000000000000000n");

  expect(
    Rates.multiplyByRate({
      inverse: false,
      rate: Conversion.toWei(150),
      rateDecimals: 6,
      value: Conversion.toWei(200),
    }),
  ).toMatchInlineSnapshot("30000000000000000000000000000000000n");
});
