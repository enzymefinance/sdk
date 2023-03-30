import { test, expect } from "vitest";
import { toSeconds } from "./conversion.js";
import { calculateAmountDueForScaledPerSecondRate } from "./rates.js";

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
  }
);
