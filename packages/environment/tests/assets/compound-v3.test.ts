import { isAddressEqual } from "viem";
import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getBaseToken } from "../utils/contracts/CompoundV3Comet.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const compound = environment.getAssets({ types: [AssetType.COMPOUND_V3] });
const assets = environment.getAssets();

test.each(compound)("compound underlying is correct: $symbol ($name): $id", async (asset) => {
  const base = await getBaseToken(client, { compoundV3Comet: asset.id });

  expect(isAddressEqual(base, asset.underlying), "Actual underlying asset does not match expected").toBeTruthy();

  expect(
    assets.find((a) => isAddressEqual(asset.underlying, a.id)),
    "Underlying asset not found in the environment",
  ).toBeTruthy();

  // check if underlying asset is registerd
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
