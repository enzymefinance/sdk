import { it, expect } from "vitest";
import { ONE_DAY_IN_SECONDS, ONE_HOUR_IN_SECONDS, ONE_YEAR_IN_SECONDS } from "../constants/time.js";
import { calculateAmountDueForScaledPerSecondRate } from "./rates.js";

// TODO: Provide better test fixtures.
it.each([
  {
    rate: 1000000000158946658547141210n,
    since: ONE_YEAR_IN_SECONDS,
    amount: 1000000000000000000n,
    expected: 5028576134389896n,
  },
  {
    rate: 1000000000158946658547141210n,
    since: ONE_DAY_IN_SECONDS,
    amount: 1000000000000000000n,
    expected: 13733085595338n,
  },
  {
    rate: 1000000000158946658547141210n,
    since: ONE_HOUR_IN_SECONDS,
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
