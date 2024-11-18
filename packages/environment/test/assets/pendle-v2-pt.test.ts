import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getSyFromPt, getYieldTokenFromSy } from "../utils/contracts/PendleV2PtToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const pendleV2PtAssets = environment.getAssets({ types: [AssetType.PENDLE_V2_PT] });
const assets = environment.getAssets();

test.each(pendleV2PtAssets)("pendle v2 pt underlying is correct: $symbol ($name): $id", async (asset) => {
  // check if deposit token is correct
  const sy = await getSyFromPt(client, { asset: asset.id });
  const yieldToken = await getYieldTokenFromSy(client, { asset: sy });

  expect(yieldToken.toLowerCase(), "Actual underlying asset does not match expected").toBe(asset.underlying);

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
