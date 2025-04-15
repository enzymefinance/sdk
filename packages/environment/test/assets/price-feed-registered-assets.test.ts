import { Protocol } from "@enzymefinance/sdk";
import { expect, suite, test } from "vitest";
import { BalancerV2, Curve } from "../../../sdk/src/Portfolio/Integrations.js";
import { Assertion } from "../../../sdk/src/Utils.js";
import { AssetType, type CurvePoolGaugeAsset, type CurvePoolLpAsset } from "../../src/assets.js";
import { Environment } from "../../src/environment.js";
import { PriceFeedType, derivativePriceFeeds, primitivePriceFeeds } from "../../src/price-feeds.js";
import { toAddress } from "../../src/utils.js";
import { getClient } from "../utils/client.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets();

const valueInterpreter = environment.getContract("ValueInterpreter");

suite.each(assets)("$symbol ($name): $id", (asset) => {
  test("is correctly registered", async () => {
    await expect(Protocol.isSupportedAsset(client, { valueInterpreter, asset: asset.id })).resolves.toBe(
      asset.registered,
    );

    if (asset.registered === false) {
      expect(asset.priceFeed.type).toBe(PriceFeedType.NONE);
    } else {
      expect(asset.priceFeed.type).not.toBe(PriceFeedType.NONE);

      if (primitivePriceFeeds.includes(asset.priceFeed.type)) {
        await expect(Protocol.isSupportedPrimitiveAsset(client, { valueInterpreter, asset: asset.id })).resolves.toBe(
          true,
        );
      } else if (derivativePriceFeeds.includes(asset.priceFeed.type)) {
        await expect(Protocol.isSupportedDerivativeAsset(client, { valueInterpreter, asset: asset.id })).resolves.toBe(
          true,
        );
      }
    }
  });

  test("has the correct price feed details", async () => {
    const priceFeedType = asset.priceFeed.type;

    const usdEthSimulatedAggregator = Environment.isSulu(environment)
      ? environment.contracts.UsdEthSimulatedAggregator
      : undefined;

    switch (priceFeedType) {
      case PriceFeedType.NONE:
        break;

      case PriceFeedType.WETH: {
        expect(asset.symbol).toBe("WETH");
        break;
      }

      case PriceFeedType.PRIMITIVE_CHAINLINK:
      case PriceFeedType.PRIMITIVE_CHAINLINK_LIKE:
      case PriceFeedType.PRIMITIVE_REDSTONE:
      case PriceFeedType.PRIMITIVE_REDSTONE_QUOTED:
      case PriceFeedType.PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION:
      case PriceFeedType.PRIMITIVE_PENDLE_V2: {
        const [aggregator, rateAsset] = await Promise.all([
          Protocol.getAggregatorForPrimitive(client, { valueInterpreter, asset: asset.id }),
          Protocol.getRateAssetForPrimitive(client, { valueInterpreter, asset: asset.id }),
        ]);

        expect(toAddress(aggregator)).toBe(asset.priceFeed.aggregator);
        expect(rateAsset).toBe(asset.priceFeed.rateAsset);

        break;
      }

      case PriceFeedType.DERIVATIVE_BALANCER_V2_STABLE_POOL: {
        const [priceFeed, poolInfo] = await Promise.all([
          Protocol.getPriceFeedForDerivative(client, { valueInterpreter, asset: asset.id }),
          BalancerV2.getPoolInfo(client, { balancerV2StablePoolPriceFeed: asset.priceFeed.address, pool: asset.id }),
        ]);

        expect(toAddress(priceFeed)).toBe(asset.priceFeed.address);
        expect(toAddress(poolInfo.invariantProxyAsset)).toBe(asset.priceFeed.ipa);

        const isSupportedAssetForDerivativePriceFeed = await Protocol.isSupportedAssetForDerivativePriceFeed(client, {
          derivativePriceFeed: priceFeed,
          asset: asset.id,
        });

        expect(isSupportedAssetForDerivativePriceFeed).toBe(true);
        const ipa = asset.priceFeed.ipa;
        // Check that the invariant proxy asset exists in the asset universe, or that it is equal to the UsdEthSimulatedAggregator
        // (but not both)
        expect(ipa === usdEthSimulatedAggregator || environment.hasAsset(ipa)).toBe(true);

        break;
      }

      case PriceFeedType.DERIVATIVE_CURVE: {
        expect([AssetType.CURVE_POOL_LP, AssetType.CURVE_POOL_GAUGE].includes(asset.type)).toBe(true);
        const pool = (asset as CurvePoolLpAsset | CurvePoolGaugeAsset).pool;

        const [priceFeed, poolInfo] = await Promise.all([
          Protocol.getPriceFeedForDerivative(client, { valueInterpreter, asset: asset.id }),
          Curve.getPoolInfo(client, { curvePriceFeed: asset.priceFeed.address, pool }),
        ]);

        expect(toAddress(priceFeed)).toBe(asset.priceFeed.address);
        expect(toAddress(poolInfo.invariantProxyAsset)).toBe(asset.priceFeed.ipa);

        const isSupportedAssetForDerivativePriceFeed = await Protocol.isSupportedAssetForDerivativePriceFeed(client, {
          derivativePriceFeed: priceFeed,
          asset: asset.id,
        });

        expect(isSupportedAssetForDerivativePriceFeed).toBe(true);
        const ipa = asset.priceFeed.ipa;
        // Check that the invariant proxy asset exists in the asset universe, or that it is equal to the UsdEthSimulatedAggregator
        // (but not both)
        expect(ipa === usdEthSimulatedAggregator || environment.hasAsset(ipa)).toBe(true);

        break;
      }

      // TODO: check derivative price feed details
      case PriceFeedType.DERIVATIVE_ARRAKIS_V2:
      case PriceFeedType.DERIVATIVE_BALANCER_V2_GAUGE_TOKEN:
      case PriceFeedType.DERIVATIVE_BALANCER_V2_WEIGHTED_POOL:
      case PriceFeedType.DERIVATIVE_COMPOUND:
      case PriceFeedType.DERIVATIVE_ENZYME_VAULT:
      case PriceFeedType.DERIVATIVE_ERC4626:
      case PriceFeedType.DERIVATIVE_ETHERFI:
      case PriceFeedType.DERIVATIVE_PEGGED_DERIVATIVES:
      case PriceFeedType.DERIVATIVE_STADER_SD:
      case PriceFeedType.DERIVATIVE_UNISWAP_V2_POOL:
      case PriceFeedType.DERIVATIVE_WSTETH:
      case PriceFeedType.DERIVATIVE_YEARN_VAULT_V2: {
        const priceFeed = await Protocol.getPriceFeedForDerivative(client, { valueInterpreter, asset: asset.id });

        expect(toAddress(priceFeed)).toBe(asset.priceFeed.address);

        const isSupportedAssetForDerivativePriceFeed = await Protocol.isSupportedAssetForDerivativePriceFeed(client, {
          derivativePriceFeed: priceFeed,
          asset: asset.id,
        });

        expect(isSupportedAssetForDerivativePriceFeed).toBe(true);

        break;
      }

      default:
        Assertion.never(priceFeedType, "Invalid price feed type");
    }
  });
});

test.skip("empty test suite fallback");
