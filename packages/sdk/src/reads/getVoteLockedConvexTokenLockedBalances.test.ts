import { publicClientMainnet } from "../../tests/globals.js";
import { getVoteLockedConvexTokenLockedBalances } from "./getVoteLockedConvexTokenLockedBalances.js";
import { assert, expect, test } from "vitest";

test("get liquity troves should work correctly", async () => {
  const result = await getVoteLockedConvexTokenLockedBalances(publicClientMainnet, {
    voteLockedConvexToken: "0x72a19342e8F1838460eBFCCEf09F6585e32db86E",
    positionAddress: "0x09602d67d2db8166ad38add363f025f5c8feaad9",
  });

  assert(result !== undefined && result !== null);
  expect(Object.keys(result).length).toBeGreaterThan(0);
});
