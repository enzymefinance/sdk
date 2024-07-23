import { expect, test } from "vitest";

import { AssetType } from "../../src/index.js";
import { environment } from "../utils/fixtures.js";

const aaveV3Assets = environment.getAssets({ types: [AssetType.AAVE_V3] });
const assets = environment.getAssets();

test.each(aaveV3Assets)("aave V3 underlying is correct: $symbol ($name): $id", async (asset) => {
  // Check that the underlying asset exists.
  expect(
    assets.filter((item) => item.id === asset.underlying).length,
    "Underlying asset not found in the environment",
  ).toBe(1);

  // check if underlying asset is registerd
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
