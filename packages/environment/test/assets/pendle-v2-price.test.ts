import { Protocol } from "@enzymefinance/sdk";
import { formatUnits } from "viem";
import { expect, suite, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { PriceFeedType, RateAsset } from "../../src/price-feeds.js";
import { getClient } from "../utils/client.js";
import { aggregatorLatestRound } from "../utils/contracts/ChainlinkAggregator.js";
import { environment } from "../utils/fixtures.js";
import { getPendleAssetPrice } from "../utils/pendle.js";

const client = getClient(environment.network.id);

const pendleV2Assets = environment.getAssets({ types: [AssetType.PENDLE_V2_PT, AssetType.PENDLE_V2_LP] });

suite("prices are correct", async () => {
  const valueInterpreter = environment.getContract("ValueInterpreter");
  const wethDecimals = environment.getAsset(environment.namedTokens.weth.id).decimals;

  const ethUsdAggregator = await Protocol.getEthUsdAggregator(client, {
    valueInterpreter,
  });

  const { answer: answerEthUsd } = await aggregatorLatestRound(client, { aggregator: ethUsdAggregator });

  test.each(pendleV2Assets)("pendle v2 price is correct: $symbol ($name): $id", async (asset) => {
    if (asset.priceFeed.type !== PriceFeedType.PRIMITIVE_PENDLE_V2) {
      throw new Error("Invalid price feed type");
    }

    const [priceOffChain, { answer }] = await Promise.all([
      getPendleAssetPrice(environment.network.id, asset),
      aggregatorLatestRound(client, { aggregator: asset.priceFeed.aggregator }),
    ]);

    const priceOnchainInUsd =
      asset.priceFeed.rateAsset === RateAsset.ETH ? (answer * answerEthUsd) / 10n ** BigInt(wethDecimals) : answer;

    const usdDecimals = 8;
    const priceOnchainInUsdFormatted = Number(formatUnits(priceOnchainInUsd, usdDecimals));

    const deviationAllowed = priceOffChain * 0.01; // 1% deviation allowed

    expect(priceOffChain).closeTo(
      priceOnchainInUsdFormatted,
      deviationAllowed,
      "OffChain price does not match onChain price",
    );
  });
});

test.skip("empty test suite fallback");
