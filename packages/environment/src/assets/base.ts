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
    releases: [],
    symbol: "MLN",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
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
      aggregator: "0x591e79239a7d679378ec8c847e5038150364c78f",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 18,
    id: "0x9e1028f5f1d5ede59748ffcee5532509976840e0",
    name: "Compound",
    releases: [sulu],
    symbol: "COMP",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0x9dda783de64a9d1a60c49ca761ebe528c35ba428",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 6,
    id: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    name: "USD Coin",
    releases: [sulu],
    symbol: "USDC",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0x7e860098f58bbfc8648a4311b374b1d669a2bc6b",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 6,
    id: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
    name: "Tether USD",
    releases: [sulu],
    symbol: "USDT",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0xf19d560eb8d2adf07bd6d13ed03e1d11215721f9",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 8,
    id: "0x0555e30da8f98308edb960aa94c0db47230d2b9c",
    name: "Wrapped BTC",
    releases: [sulu],
    symbol: "WBTC",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0xccadc697c55bbb68dc5bcdf8d3cbe83cdd4e071e",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 18,
    id: "0xd4a0e0b9149bcee3c920d2e00b5de09138fd8bb7",
    name: "Aave Base WETH",
    releases: [sulu],
    symbol: "aBasWETH",
    type: AssetType.AAVE_V3,
    underlying: "0x4200000000000000000000000000000000000006",
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0x71041dddad3595f9ced3dccfbe3d1f4b0a16bb70",
      rateAsset: RateAsset.USD,
    },
  },
  {
    decimals: 6,
    id: "0x4e65fe4dba92790696d040ac24aa414708f5c0ab",
    name: "Aave Base USDC",
    releases: [sulu],
    symbol: "aBasUSDC",
    type: AssetType.AAVE_V3,
    underlying: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    priceFeed: {
      type: PriceFeedType.PRIMITIVE_CHAINLINK,
      aggregator: "0x7e860098f58bbfc8648a4311b374b1d669a2bc6b",
      rateAsset: RateAsset.USD,
    },
  },
]);
