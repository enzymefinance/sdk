import { Conversion, Slippage } from "@enzymefinance/sdk/Utils";
import { expect, test } from "vitest";

test("multiplyBySlippage should work correctly", () => {
  expect(
    Slippage.multiplyBySlippage({
      amount: 250n,
      slippage: 0.01,
    }),
  ).toMatchInlineSnapshot("248n");

  expect(
    Slippage.multiplyBySlippage({
      amount: 2432n,
      slippage: 0.13,
    }),
  ).toMatchInlineSnapshot("2116n");
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
  expect(Slippage.applySlippage(value, Conversion.toBps(slippage))).toBe(expected);
});
