import { isAddressEqual } from "viem";
import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getAsset } from "../utils/contracts/ERC4626Token.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const erc4626Assets = environment.getAssets({ types: [AssetType.ERC_4626] });

test.each(erc4626Assets)("ERC4626 underlying is correct", async (asset) => {
  const checksum = await getAsset(client, { erc4626Token: asset.id });

  expect(isAddressEqual(checksum, asset.underlying), "Actual underlying asset does not match expected").toBeTruthy();

  // check if underlying asset is registered
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
