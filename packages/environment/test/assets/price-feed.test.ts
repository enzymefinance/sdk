import { Protocol } from "@enzymefinance/sdk";
import { expect, suite, test } from "vitest";
import { AssetType } from "../../src/assets.js";
import { PriceFeedType, derivativePriceFeeds, primitivePriceFeeds } from "../../src/price-feeds.js";
import { toAddress } from "../../src/utils.js";
import { getClient } from "../utils/client.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets({ types: [AssetType.PRIMITIVE] });

const valueInterpreter = environment.getContract("ValueInterpreter");

suite.each(assets)("$symbol ($name): $id", (asset) => {
  test.skip("is correctly registered or not-registered", async () => {
    await expect(Protocol.isSupportedAsset(client, { valueInterpreter, asset: asset.id })).resolves.toBe(
      asset.registered,
    );
  });

  test.skipIf(asset.registered === false && asset.priceFeed.type === PriceFeedType.NONE)(
    "is correctly registered as a primitive or derivative asset",
    async () => {
      if (primitivePriceFeeds.includes(asset.priceFeed.type)) {
        await expect(Protocol.isSupportedPrimitiveAsset(client, { valueInterpreter, asset: asset.id })).resolves.toBe(
          true,
        );
      } else if (derivativePriceFeeds.includes(asset.priceFeed.type)) {
        await expect(Protocol.isSupportedDerivativeAsset(client, { valueInterpreter, asset: asset.id })).resolves.toBe(
          true,
        );
      }
    },
  );

  test("has the correct price feed address", async () => {
    if (primitivePriceFeeds.includes(asset.priceFeed.type)) {
      const aggregator = await Protocol.getAggregatorForPrimitive(client, { valueInterpreter, asset: asset.id });

      expect(toAddress(aggregator)).toBe(asset.priceFeed.address);
    }
  });
});

test.skip("empty test suite fallback");
