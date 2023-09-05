import { publicClientMainnet } from "../../tests/globals.js";
import { getIdleRate } from "./getIdleRate.js";
import { isAddress } from "viem";
import { assert, expect, test } from "vitest";

test("get idle rate should work correctly", async () => {
  const result = await getIdleRate(publicClientMainnet, {
    priceFeed: "0x13c2263e534BD27149d96b8Cb9961ea1beB560Ef",
    poolToken: "0x3fE7940616e5Bc47b0775a0dccf6237893353bB4",
    poolTokenDecimals: 18,
  });

  assert(result !== undefined);
  expect(Object.keys(result).length).toBeGreaterThan(0);

  for (const [underlying, amount] of Object.entries(result)) {
    expect(isAddress(underlying)).toBeTruthy();
    expect(amount).toBeTypeOf("bigint");
  }
});
