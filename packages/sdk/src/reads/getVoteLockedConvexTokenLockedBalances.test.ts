import { publicClientMainnet } from "../../tests/globals.js";
import { getVoteLockedConvexTokenLockedBalances } from "./getVoteLockedConvexTokenLockedBalances.js";
import { assert, expect, test } from "vitest";

test("get vote locked convex token locked balances should work correctly", async () => {
  const voteLockedConvexToken = "0x72a19342e8F1838460eBFCCEf09F6585e32db86E" as const;
  const positionAddress = "0x09602d67d2db8166ad38add363f025f5c8feaad9" as const;

  const result = await getVoteLockedConvexTokenLockedBalances(publicClientMainnet, {
    voteLockedConvexToken,
    positionAddress,
  });

  assert(result !== undefined && result !== null);
  expect(Object.keys(result).length).toBeGreaterThan(0);

  expect(result.total).toBeTypeOf("bigint");
  expect(result.unlockable).toBeTypeOf("bigint");
  expect(result.locked).toBeTypeOf("bigint");
});
