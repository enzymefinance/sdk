import { Utils } from "@enzymefinance/sdk";
import { expect, test } from "vitest";
import { AssetType, BalancerPoolType, Environment } from "../../src/index.js";
import { Network } from "../../src/networks.js";
import { getClient } from "../utils/client.js";
import { getPoolId, getVault } from "../utils/contracts/BalancerPool.js";
import { isPoolFromFactory } from "../utils/contracts/BalancerPoolFactory.js";
import { getPoolTokens } from "../utils/contracts/BalancerVault.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets();
const lps = environment.getAssets({ types: [AssetType.BALANCER_POOL] });

const usdEthSimulatedAggregator = Environment.isSulu(environment)
  ? environment.contracts.UsdEthSimulatedAggregator
  : undefined;

const deprecatedFactories = {
  [Network.ARBITRUM]: [""],
  [Network.ETHEREUM]: [
    "0x7d833fef5bb92ddb578da85fc0c35cd5cc00fb3e", // AaveLinearPoolFactory (v3)
    "0xf9ac7b9df2b3454e841110cce5550bd5ac6f875f", // ComposableStablePoolFactory
    "0x85a80afee867adf27b50bdb7b76da70f1e853062", // ComposableStablePoolFactory (v2)
    "0x9ac3e70db606659bf32d4bdfbb687ad193fd1f5b", // ManagedPoolFactory
    "0xc66ba2b6595d3613ccab350c886ace23866ede24", // StablePoolFactory
    "0xcc508a455f5b0073973107db6a878ddbdab957bc", // WeightedPoolFactory (v2)
    "0xb08e16cfc07c684daa2f93c70323badb2a6cbfd2", // StablePhantomPoolFactory
  ],
  [Network.POLYGON]: [
    "0x35c425234dc42e7402f54cc54573f77842963a56", // AaveLinearPoolFactory (v3)
    "0x136fd06fa01ecf624c7f2b3cb15742c1339dc2c4", // ComposableStablePoolFactory
    "0x85a80afee867adf27b50bdb7b76da70f1e853062", // ComposableStablePoolFactory (v2)
    "0x9ac3e70db606659bf32d4bdfbb687ad193fd1f5b", // ManagedPoolFactory
    "0xc66ba2b6595d3613ccab350c886ace23866ede24", // StablePoolFactory
    "0x0e39c3d9b2ec765efd9c5c70bb290b1fcd8536e3", // WeightedPoolFactory (v2)
    "0xc128a9954e6c874ea3d62ce62b468ba073093f25", // StablePhantomPoolFactory
  ],
};

test.each(lps)("balancer pool details: $symbol ($name): $id", async (asset) => {
  // Check that the invariant proxy asset exists (only for non weighted pools).
  expect(
    [
      ...(asset.poolType === BalancerPoolType.WEIGHTED
        ? [true]
        : [
            ...(asset.ipa === usdEthSimulatedAggregator ? [true] : [...assets.filter((item) => item.id === asset.ipa)]),
          ]),
    ].length,
    "Invariant proxy asset not found",
  ).toBe(1);

  // Check that the underlying tokens are correct and ordered properly
  const [poolId, vaultAddress] = await Promise.all([
    getPoolId(client, { balancerPool: asset.id }),
    getVault(client, { balancerPool: asset.id }),
  ]);

  expect(asset.poolId, "Pool ID does not match the one returned by the contract").toBe(poolId);

  const tokens = await getPoolTokens(client, { vault: vaultAddress, pool: poolId });

  expect(
    asset.underlyings.every((underlying, index) => Utils.Address.safeSameAddress(underlying, tokens.tokens[index])),
    "Underlying tokens do not match the ones returned by the contract",
  ).toBe(true);

  // Check that all underlying assets are in the environment
  expect(
    asset.underlyings.every((underlying) =>
      environment.getAssets().find((a) => Utils.Address.safeSameAddress(a.id, underlying)),
    ),
    "Underlying assets not found",
  ).toBe(true);

  // Check that the staking assets exist
  expect(
    asset.staking.every((stakingAsset) => assets.find((a) => stakingAsset.token === a.id) !== undefined),
    "Staking assets not found",
  ).toBe(true);

  // Check that the factory is correct

  expect(
    isPoolFromFactory(client, { poolFactory: asset.poolFactory, pool: asset.id }),
    "Pool is not from the correct factory",
  ).resolves.toBe(true);

  if (asset.registered) {
    expect(
      deprecatedFactories[environment.network.id].includes(asset.poolFactory),
      "Pool is from a deprecated factory",
    ).toBeFalsy();
  }
});

test.skip("empty test suite fallback");
