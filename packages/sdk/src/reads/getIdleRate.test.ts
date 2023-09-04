import { type Address, isAddress } from "viem";
import { expect, test } from "vitest";
import { publicClientMainnet } from "../../tests/globals.js";
import { getIdleRate } from "./getIdleRate.js";

test("get idle rate should work correctly", async () => {
  const idlePriceFeed = "0x13c2263e534BD27149d96b8Cb9961ea1beB560Ef" as const;
  const idlePoolToken = {
    address: "0x3fE7940616e5Bc47b0775a0dccf6237893353bB4" as Address,
    decimals: 18,
  };

  const result = await getIdleRate(publicClientMainnet, {
    idlePriceFeed,
    idlePoolToken,
  });

  if (!result) {
    throw new Error("Ide Rate result returned undefined");
  }

  const rateAddress = result[0][0] ?? "";
  const rate = result[1][0] ?? undefined;

  expect(isAddress(rateAddress)).toBeTruthy();
  expect(rate).toBeTypeOf("bigint");
});
