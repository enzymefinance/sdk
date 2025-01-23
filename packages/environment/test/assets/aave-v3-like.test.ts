import { expect, test } from "vitest";

import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getUnderlyingAssetAddressUpperCase } from "../utils/contracts/AaveToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const aaveV3LikeAssets = environment.getAssets({
  types: [AssetType.AAVE_V3, AssetType.ZERO_LEND_AAVE_V3_LRT_BTC, AssetType.ZERO_LEND_AAVE_V3_RWA_STABLECOINS],
});
const assets = environment.getAssets();

test.each(aaveV3LikeAssets)("aave V3 like underlying is correct: $symbol ($name): $id", async (asset) => {
  // check if underlying is correct
  const checksum = await getUnderlyingAssetAddressUpperCase(client, { asset: asset.id });
  expect(checksum.toLowerCase(), "Actual underlying asset does not match expected").toBe(asset.underlying);

  // Check that the underlying asset exists.
  expect(
    assets.filter((item) => item.id === asset.underlying).length,
    "Underlying asset not found in the environment",
  ).toBe(1);

  // check if underlying asset is registered
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});
test.skip("empty test suite fallback");
