import { Utils } from "@enzymefinance/sdk";
import { expect, test } from "vitest";
import type { CurvePoolLpAsset } from "../../src/index.js";
import { AssetType, CurveStakingType, Environment } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getLpToken } from "../utils/contracts/CurveGauge.js";
import { getCoins, getCoinsInt128 } from "../utils/contracts/CurvePool.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets();
const gauges = environment.getAssets({ types: [AssetType.CURVE_POOL_GAUGE] });

const usdEthSimulatedAggregator = Environment.isSulu(environment)
  ? environment.contracts.UsdEthSimulatedAggregator
  : undefined;

test.each(gauges)("curve gauge details: $symbol ($name): $id", async (asset) => {
  // Check that the invariant proxy asset exists in the asset universe, or that it is equal to the UsdEthSimulatedAggregator.
  expect(
    [...(asset.ipa === usdEthSimulatedAggregator ? [true] : []), ...assets.filter((item) => item.id === asset.ipa)]
      .length,
    "Invariant proxy asset not found",
  ).toBe(1);

  // Check that the lp token is correct
  const lpToken = await getLpToken(client, { curveGauge: asset.id });
  expect(lpToken.toLowerCase(), "LP token does not match the one returned by the contract").toEqual(asset.lp);

  // Check that the lp token exists.
  expect(assets.filter((item) => item.id === asset.lp).length, "LP token not found in the environment").toBe(1);

  // Check that LP token lists the convex token under staking
  const lpAsset = environment.getAsset(asset.lp) as CurvePoolLpAsset;
  expect(
    lpAsset.staking.filter(
      (stakingAsset) => stakingAsset.token === asset.id && stakingAsset.type === CurveStakingType.GAUGE,
    ).length,
    "Curve gauge token not found in the LP token staking list",
  ).toBe(1);

  // Check that the underlying tokens are correct and ordered properly
  const coins = await Promise.all(
    asset.underlyings.map(async (_, index) => {
      try {
        return await getCoins(client, { curvePool: asset.pool, index: BigInt(index) });
      } catch {
        return getCoinsInt128(client, { curvePool: asset.pool, index: BigInt(index) });
      }
    }),
  );

  expect(
    asset.underlyings.every((underlying, index) => {
      // Replace the ethAddress with wETH
      const coin = Utils.Address.safeSameAddress(coins[index], "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE")
        ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        : coins[index];

      return Utils.Address.safeSameAddress(underlying, coin);
    }),
    "Underlying tokens do not match the ones returned by the contract",
  ).toBe(true);
});

test.skip("empty test suite fallback");
