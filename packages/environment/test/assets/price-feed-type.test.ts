import { expect, suite, test } from "vitest";
import { PriceFeedType } from "../../src/price-feeds.js";
import { environment } from "../utils/fixtures.js";

const assets = environment.getAssets();

suite.each(assets)("$symbol ($name): $id", (asset) => {
  test("has the correct price feed type", () => {
    if (asset.registered === false) {
      expect(asset.priceFeed.type).toBe(PriceFeedType.NONE);
    } else {
      expect(asset.priceFeed.type).not.toBe(PriceFeedType.NONE);
    }
  });
});

test.skip("empty test suite fallback");
