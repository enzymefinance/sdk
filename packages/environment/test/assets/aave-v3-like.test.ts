import { expect, test } from "vitest";

import type { Address } from "viem";
import { AssetType, Network } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getUnderlyingAssetAddressUpperCase } from "../utils/contracts/AaveToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const aaveV3LikeAssets = environment.getAssets({
  types: [AssetType.AAVE_V3],
});
const assets = environment.getAssets();

const unusualPriceFeedsAssetsForNetwork: Record<Network, Array<Address>> = {
  [Network.ETHEREUM]: [
    "0x0b925ed163218f6662a35e0f0371ac234f9e9371", // Aave Ethereum wstETH"
    "0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8", // Aave Ethereum WETH
  ],
  [Network.POLYGON]: [
    "0x28424507fefb6f7f8e9d3860f56504e4e5f5f390", // Aave WETH
    "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8", // Aave Polygon WETH
  ],
  [Network.BASE]: [
    "0xd4a0e0b9149bcee3c920d2e00b5de09138fd8bb7", // Aave Base WETH
  ],
  [Network.ARBITRUM]: [
    "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8", // Aave Arbitrum WETH
  ],
} as const;

test.each(aaveV3LikeAssets)("aave V3 like underlying is correct: $symbol ($name): $id", async (asset) => {
  // check if underlying is correct
  const checksum = await getUnderlyingAssetAddressUpperCase(client, { asset: asset.id });
  expect(checksum.toLowerCase(), "Actual underlying asset does not match expected").toBe(asset.underlying);

  // Check that the underlying asset exists.
  expect(
    assets.filter((item) => item.id === asset.underlying).length,
    "Underlying asset not found in the environment",
  ).toBe(1);

  const underlying = environment.getAsset(asset.underlying);

  // check if underlying asset is registered
  expect(asset.registered ? underlying.registered : true, "Underlying asset not registered").toBe(true);

  const unusualPriceFeedsAsset = unusualPriceFeedsAssetsForNetwork[environment.network.id];

  if (!unusualPriceFeedsAsset.includes(asset.id)) {
    // check if the price feed is the same as the underlying asset
    expect(asset.priceFeed, "Price feed asset does not match the underlying price feed").toStrictEqual(
      underlying.priceFeed,
    );
  }
});

test.skip("empty test suite fallback");
