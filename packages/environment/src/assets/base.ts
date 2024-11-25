import { AssetType, defineAssetList } from "../assets.js";
import { Network } from "../networks.js";
import { PriceFeedType, RateAsset } from "../price-feeds.js";
import { releases } from "../releases.js";

const { sulu } = releases.base;

export default defineAssetList(Network.BASE, [
  {
    decimals: 18,
    id: "0x4200000000000000000000000000000000000006",
    name: "Wrapped Ether",
    releases: [sulu],
    symbol: "WETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.WETH,
    },
  },
  {
    decimals: 18,
    id: "0x7c298664bd6582f6f264c2cb5a4b9cc09b6e3889",
    name: "Melon Token",
    releases: [sulu],
    symbol: "MLN",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0x0000000000000000000000000000000000000000",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 18,
    id: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
    name: "Dai Stablecoin",
    releases: [sulu],
    symbol: "DAI",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0x0000000000000000000000000000000000000000",
      rateAsset: RateAsset.USD,
    },
  },
]);
