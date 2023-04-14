import { test, expect } from "vitest";
import { toBps, toWei, toSeconds } from "./conversion.js";
import { Decimal } from "decimal.js";

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
  expect(toSeconds({ hours: 1 })).toMatchInlineSnapshot('3600n');
  expect(toSeconds({ days: 1 })).toMatchInlineSnapshot('86400n');
  expect(toSeconds({ weeks: 1 })).toMatchInlineSnapshot('604800n');
  expect(toSeconds({ years: 1 })).toMatchInlineSnapshot('31557600n');
});
