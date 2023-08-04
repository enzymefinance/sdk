import { multiplyBySlippage } from "./slippage.js";
import { expect, test } from "vitest";

test("multiplyBySlippage should work correctly", () => {
  expect(
    multiplyBySlippage({
      amount: 250n,
      slippage: 1n,
    }),
  ).toMatchInlineSnapshot('247n');

  expect(
    multiplyBySlippage({
      amount: 2432n,
      slippage: 13n,
    }),
  ).toMatchInlineSnapshot('2115n');
});
