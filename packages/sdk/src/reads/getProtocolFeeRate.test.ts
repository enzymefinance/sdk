import { publicClientMainnet } from "../../tests/globals.js";
import { getProtocolFeeRate } from "./getProtocolFeeRate.js";
import { expect, test } from "vitest";

test("get protocol fee rate should work correctly", async () => {
  const vaultProxy = "0x278C647F7cfb9D55580c69d3676938608C945ba8" as const;

  const protocolFeeRate = await getProtocolFeeRate(publicClientMainnet, {
    vaultProxy,
  });

  expect(protocolFeeRate).toBeTypeOf("bigint");
});
