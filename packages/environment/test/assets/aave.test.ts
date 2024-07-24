import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import {
  getUnderlyingAssetAddressLowerCase,
  getUnderlyingAssetAddressUpperCase,
} from "../utils/contracts/AaveToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const aave = environment.getAssets({ types: [AssetType.AAVE_V2] });

test.each(aave)("aave underlying is correct: $symbol ($name): $id", async (asset) => {
  const checksum = await getUnderlyingAssetAddressUpperCase(client, { asset: asset.id }).catch(() =>
    getUnderlyingAssetAddressLowerCase(client, { asset: asset.id }),
  );

  expect(checksum.toLowerCase(), "Actual underlying asset does not match expected").toBe(asset.underlying);

  // check if underlying asset is registerd
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
