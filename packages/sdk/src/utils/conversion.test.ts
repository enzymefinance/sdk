import { test, expect } from "vitest";
import { toBps } from "./conversion.js";
import { Decimal } from "decimal.js";

test.each([
  {
    decimal: 0.1,
    bps: 1000n,
  },
  {
    decimal: 1,
    bps: 10000n,
  },
  {
    decimal: 0.33,
    bps: 3300n,
  },
  {
    decimal: new Decimal("0.123456789123456789123456789123456789123456789"),
    bps: 1234n,
  },
  {
    decimal: 123123123,
    bps: 1231231230000n,
  },
])("should convert $decimal to $bps bps correctly", ({ decimal, bps }) => {
  expect(toBps(decimal)).toBe(bps);
});
