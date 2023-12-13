import { Asset } from "@enzymefinance/sdk";
import type { TestEnvironment } from "@enzymefinance/sdk/test";
import type { Address } from "viem";
import { expect } from "vitest";

export async function assertBalanceOf({
  environment,
  asset,
  owner,
  expected,
  fuzziness = 100n,
}: {
  environment: TestEnvironment;
  /**
   * The token to check the balance of.
   */
  asset: Address;
  /**
   * The account to check the balance of.
   */
  owner: Address;
  /**
   * The expected balance of the account.
   */
  expected: bigint;
  /**
   * Allows the actual balance to be within a certain range of the expected balance.
   */
  fuzziness?: bigint;
}) {
  const actual = await Asset.getBalanceOf(environment.client, {
    owner,
    asset,
  });

  if (fuzziness === undefined || fuzziness === 0n) {
    expect(actual).toBe(expected);
  } else {
    expect(actual).toBeGreaterThanOrEqual(expected - BigInt(fuzziness));
    expect(actual).toBeLessThanOrEqual(expected + BigInt(fuzziness));
  }

  return actual;
}
