import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getToken0, getToken1 } from "../utils/contracts/UniswapPoolToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const pools = environment.getAssets({
  types: [AssetType.UNISWAP_V2_POOL],
});

test.each(pools)("uniswap pool underlying is correct: $symbol ($name): $id", async (asset) => {
  expect(asset.underlyings.length, "Uniswap v2 pool should have 2 underlyings").toBe(2);

  const [aExpected, bExpected] = asset.underlyings;
  const [aActual, bActual] = await Promise.all([
    getToken0(client, { pool: asset.id }),
    getToken1(client, { pool: asset.id }),
  ]);

  expect(aActual.toLowerCase(), "Actual A underlying asset does not match expected").toBe(aExpected);
  expect(bActual.toLowerCase(), "Actual B underlying asset does not match expected").toBe(bExpected);
});

test.skip("empty test suite fallback");
