import { Asset } from "@enzymefinance/sdk";
import { TestEnvironment } from "@enzymefinance/sdk/test";
import type { Address, Chain } from "viem";
import { expect } from "vitest";

export async function assertBalanceOf<TChain extends Chain>({
  environment,
  asset,
  owner,
  expected,
  fuzziness,
}: {
  environment: TestEnvironment<TChain>;
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

  if (fuzziness === undefined) {
    expect(actual).toBe(expected);
  } else {
    expect(actual).toBeGreaterThanOrEqual(expected - BigInt(fuzziness));
    expect(actual).toBeLessThanOrEqual(expected + BigInt(fuzziness));
  }

  return actual;
}
