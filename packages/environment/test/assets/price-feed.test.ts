import { Protocol } from "@enzymefinance/sdk";
import { expect, suite, test } from "vitest";
import { Assertion } from "../../../sdk/src/Utils.js";
import { AssetType } from "../../src/assets.js";
import { PriceFeedType, derivativePriceFeeds, primitivePriceFeeds } from "../../src/price-feeds.js";
import { toAddress } from "../../src/utils.js";
import { getClient } from "../utils/client.js";
import { aggregatorDecimals, aggregatorDescription } from "../utils/contracts/ChainlinkAggregator.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets({ types: [AssetType.YEARN_VAULT_V2] });

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

    switch (priceFeedType) {
      case PriceFeedType.NONE:
        break;

      case PriceFeedType.WETH: {
        expect(asset.symbol).toBe("WETH");
        break;
      }

      // TODO: check Chainlink / Redstone details
      case PriceFeedType.PRIMITIVE_CHAINLINK: {
        const [aggregator, rateAsset, description, decimals] = await Promise.all([
          Protocol.getAggregatorForPrimitive(client, { valueInterpreter, asset: asset.id }),
          Protocol.getRateAssetForPrimitive(client, { valueInterpreter, asset: asset.id }),
          aggregatorDescription(client, { aggregator: asset.priceFeed.aggregrator }),
          aggregatorDecimals(client, { aggregator: asset.priceFeed.aggregrator }),
        ]);

        expect(toAddress(aggregator)).toBe(asset.priceFeed.aggregrator);
        expect(rateAsset).toBe(asset.priceFeed.rateAsset);
        expect(description.substring(description.length - 3)).toBe(asset.priceFeed.rateAsset === 0 ? "ETH" : "USD");
        expect(decimals).toBe(asset.priceFeed.rateAsset === 0 ? 18 : 8);

        break;
      }
      case PriceFeedType.PRIMITIVE_REDSTONE: {
        const [aggregator, rateAsset, description, decimals] = await Promise.all([
          Protocol.getAggregatorForPrimitive(client, { valueInterpreter, asset: asset.id }),
          Protocol.getRateAssetForPrimitive(client, { valueInterpreter, asset: asset.id }),
          aggregatorDescription(client, { aggregator: asset.priceFeed.aggregrator }),
          aggregatorDecimals(client, { aggregator: asset.priceFeed.aggregrator }),
        ]);

        expect(toAddress(aggregator)).toBe(asset.priceFeed.aggregrator);
        expect(rateAsset).toBe(asset.priceFeed.rateAsset);
        expect(description).toBe("Redstone Price Feed");
        expect(decimals).toBe(asset.priceFeed.rateAsset === 0 ? 18 : 8);

        break;
      }

      case PriceFeedType.PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION: {
        const [aggregator, rateAsset, decimals] = await Promise.all([
          Protocol.getAggregatorForPrimitive(client, { valueInterpreter, asset: asset.id }),
          Protocol.getRateAssetForPrimitive(client, { valueInterpreter, asset: asset.id }),
          aggregatorDecimals(client, { aggregator: asset.priceFeed.aggregrator }),
        ]);

        expect(toAddress(aggregator)).toBe(asset.priceFeed.aggregrator);
        expect(rateAsset).toBe(asset.priceFeed.rateAsset);
        expect(decimals).toBe(asset.priceFeed.rateAsset === 0 ? 18 : 8);

        break;
      }

      // TODO: check derivative price feed details
      case PriceFeedType.DERIVATIVE_ARRAKIS_V2:
      case PriceFeedType.DERIVATIVE_BALANCER_V2_GAUGE_TOKEN:
      case PriceFeedType.DERIVATIVE_BALANCER_V2_STABLE_POOL:
      case PriceFeedType.DERIVATIVE_BALANCER_V2_WEIGHTED_POOL:
      case PriceFeedType.DERIVATIVE_COMPOUND:
      case PriceFeedType.DERIVATIVE_CURVE:
      case PriceFeedType.DERIVATIVE_ERC4626:
      case PriceFeedType.DERIVATIVE_ETHERFI:
      case PriceFeedType.DERIVATIVE_PEGGED_DERIVATIVES:
      case PriceFeedType.DERIVATIVE_REVERTING:
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
