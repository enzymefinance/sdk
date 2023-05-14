import { testActions } from "../globals.js";
import type { Address } from "viem";
import { expect } from "vitest";

export async function assertBalanceOf({
  token,
  account,
  expected,
  fuzziness,
}: {
  /**
   * The token to check the balance of.
   */
  token: Address;
  /**
   * The account to check the balance of.
   */
  account: Address;
  /**
   * The expected balance of the account.
   */
  expected: bigint;
  /**
   * Allows the actual balance to be within a certain range of the expected balance.
   */
  fuzziness?: bigint;
}) {
  const actual = await testActions.getBalanceOf({
    token,
    account,
  });

  if (fuzziness === undefined) {
    expect(actual).toBe(expected);
  } else {
    expect(actual).toBeGreaterThanOrEqual(expected - BigInt(fuzziness));
    expect(actual).toBeLessThanOrEqual(expected + BigInt(fuzziness));
  }
}
