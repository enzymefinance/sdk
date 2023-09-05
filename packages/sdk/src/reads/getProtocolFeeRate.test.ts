import { publicClientMainnet } from "../../tests/globals.js";
import { getProtocolFeeRate } from "./getProtocolFeeRate.js";
import { expect, test } from "vitest";

test("get protocol fee rate should work correctly", async () => {
  const vaultProxy = "0x278C647F7cfb9D55580c69d3676938608C945ba8" as const;
  const protocolFeeTracker = "0xe97980f1d43c4cd4f1eef0277a2dea7ddbc2cd13" as const;

  const protocolFeeRate = await getProtocolFeeRate(publicClientMainnet, {
    vaultProxy,
    protocolFeeTracker,
  });

  expect(protocolFeeRate).toBeTypeOf("bigint");
});
