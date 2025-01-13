import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { toAddress } from "../../src/utils.js";
import { getClient } from "../utils/client.js";
import { getYieldTokenFromSy, readTokensFromMarket } from "../utils/contracts/PendleV2Tokens.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const pendleV2PtAssets = environment.getAssets({ types: [AssetType.PENDLE_V2_PT] });
const assets = environment.getAssets();

test.each(pendleV2PtAssets)("pendle v2 pt underlying is correct: $symbol ($name): $id", async (asset) => {
  for (const market in asset.markets) {
    // check if deposit token is correct
    const { sy, pt } = await readTokensFromMarket(client, { market: toAddress(market) });

    expect(pt.toLowerCase(), "Asset token does not match expected").toBe(asset.id);

    const yieldToken = await getYieldTokenFromSy(client, { asset: sy });

    expect(yieldToken.toLowerCase(), "Actual underlying asset does not match expected").toBe(asset.underlying);
  }

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
