import { expect } from "vitest";
import { type Address } from "viem";
import { testActions } from "../globals.js";

export async function assertBalanceOf({
  token,
  account,
  expected,
  message,
}: {
  token: Address;
  account: Address;
  expected: bigint;
  message?: string;
}) {
  const actual = await testActions.getBalanceOf({
    token,
    account,
  });

  expect(actual, message).toBe(expected);
}
