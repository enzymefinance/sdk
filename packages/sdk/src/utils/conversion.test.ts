import { applySlippage, toBps, toSeconds, toWei } from "./conversion.js";
import { Decimal } from "decimal.js";
import { expect, test } from "vitest";

test.each([
  {
    decimal: 0.1,
    bps: 1000n,
    wei: 100000000000000000n,
  },
  {
    decimal: 1,
    bps: 10000n,
    wei: 1000000000000000000n,
  },
  {
    decimal: 0.33,
    bps: 3300n,
    wei: 330000000000000000n,
  },
  {
    decimal: new Decimal("0.123456789123456789123456789123456789123456789"),
    bps: 1234n,
    wei: 123456789123456789n,
  },
  {
    decimal: 123123123,
    bps: 1231231230000n,
    wei: 123123123000000000000000000n,
  },
])("should convert $decimal to $bps bps correctly", ({ decimal, bps, wei }) => {
  expect(toBps(decimal)).toBe(bps);
  expect(toWei(decimal)).toBe(wei);
});

test("toSeconds should work correctly", () => {
  expect(toSeconds({ minutes: 1 })).toMatchInlineSnapshot("60n");
  expect(toSeconds({ hours: 1 })).toMatchInlineSnapshot("3600n");
  expect(toSeconds({ days: 1 })).toMatchInlineSnapshot("86400n");
  expect(toSeconds({ weeks: 1 })).toMatchInlineSnapshot("604800n");
  expect(toSeconds({ years: 1 })).toMatchInlineSnapshot("31557600n");
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
