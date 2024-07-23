import { Utils } from "@enzymefinance/sdk";
import { isAddressEqual } from "viem";
import { expect, test } from "vitest";
import type { BalancerPoolAsset } from "../../src/index.js";
import { AssetType, BalancerStakingType, toAddress } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getPoolGauge, isGaugeFromFactory } from "../utils/contracts/BalancerLiquidityGaugeFactory.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const balancerPoolGauge = environment.getAssets({ registered: true, types: [AssetType.BALANCER_POOL_GAUGE] });

test.each(balancerPoolGauge)("balancer pool gauge details: $symbol ($name): $id", async (asset) => {
  // Check that the underlying tokens are correct and ordered properly
  const poolAsset = environment.getAsset(asset.pool) as BalancerPoolAsset;

  expect(
    asset.underlyings.every((underlying, index) =>
      Utils.Address.safeSameAddress(underlying, poolAsset.underlyings[index]),
    ),
    "Underlying tokens do not match the ones returned by the contract",
  ).toBe(true);

  // Check that all underlying assets are in the environment
  expect(
    asset.underlyings.every((underlying) => environment.getAssets().find((a) => isAddressEqual(a.id, underlying))),
    "Underlying assets not found in the environment",
  ).toBe(true);

  // Check that LP token lists the balancer pool gauge token under staking
  expect(
    poolAsset.staking.filter(
      (stakingAsset) => stakingAsset.token === asset.id && stakingAsset.type === BalancerStakingType.GAUGE,
    ).length,
    "Balancer pool gauge token not found in the LP token staking list",
  ).toBe(1);

  // Check that the underlying pool is correct

  const isFromFactory = await isGaugeFromFactory(client, { gaugeFactory: asset.gaugeFactory, gauge: asset.id });

  expect(isFromFactory).toBeTruthy();

  try {
    const gauge = await getPoolGauge(client, { gaugeFactory: asset.gaugeFactory, pool: asset.pool });
    expect(toAddress(gauge), "Gauge does not match the one returned by the contract").toEqual(asset.id);
  } catch {
    // some gauges factory don't implement this method
  }
});

test.skip("empty test suite fallback");
