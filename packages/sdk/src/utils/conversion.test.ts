import { test, expect } from "vitest";
import { applySlippage, toBps } from "./conversion.js";
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

test.each([
  {
    value: 100n,
    slippage: 0.01,
    expected: 99n,
  },
  {
    value: 10000n,
    slippage: 0.33,
    expected: 6700n,
  },
  {
    value: 123456n,
    slippage: 0.5,
    expected: 61728n,
  },
  {
    value: 1000n,
    slippage: 0.9,
    expected: 100n,
  },
  {
    value: 1000n,
    slippage: 1,
    expected: 0n,
  },
])("should return $expected for $slippage slippage on $value", ({ value, slippage, expected }) => {
  expect(applySlippage(value, toBps(slippage))).toBe(expected);
});
