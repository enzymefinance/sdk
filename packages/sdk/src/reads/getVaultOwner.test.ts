import { publicClientMainnet } from "../../tests/globals.js";
import { getVaultOwner } from "./getVaultOwner.js";
import { isAddress } from "viem";
import { expect, test } from "vitest";

test("read vault owner should work correctly", async () => {
  const vaultProxy = "0x278C647F7cfb9D55580c69d3676938608C945ba8" as const;

  const vaultOwner = await getVaultOwner(publicClientMainnet, {
    vaultProxy,
  });

  expect(isAddress(vaultOwner)).toBeTruthy();
});
