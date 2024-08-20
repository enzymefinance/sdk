import { AssetType, defineAssetList } from "../assets.js";
import { Network } from "../networks.js";
import { PriceFeedType } from "../price-feeds.js";
import { releases } from "../releases.js";

const { sulu } = releases.arbitrum;

export default defineAssetList(Network.ARBITRUM, [
  {
    decimals: 18,
    id: "0x040d1edc9569d4bab2d15287dc5a4f10f56a56b8",
    name: "Balancer",
    releases: [],
    symbol: "BAL",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x354a6da3fcde098f8389cad84b0182725c6c91de",
    name: "Compound",
    releases: [],
    symbol: "COMP",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x11cdb42b0eb46d95f990bedd4695a6e3fa034978",
    name: "Curve DAO Token",
    releases: [],
    symbol: "CRV",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xaafcfd42c9954c6689ef1901e03db742520829c5",
    name: "Convex Token",
    releases: [],
    symbol: "CVX",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x9623063377ad1b27544c965ccd7342f7ea7e88c7",
    name: "Graph Token",
    releases: [],
    symbol: "GRT",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    name: "Tether USD",
    releases: [],
    symbol: "USDT",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x1debd73e752beaf79865fd6446b0c970eae7732f",
    name: "Coinbase Wrapped Staked ETH",
    releases: [sulu],
    symbol: "cbETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x2416092f143378750bb29b79ed961ab195cceea5",
    name: "Renzo Restaked ETH",
    releases: [sulu],
    symbol: "ezETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 9,
    id: "0x2bcc6d6cdbbdc0a4071e48bb3b969b06b3330c07",
    name: "Wrapped SOL",
    releases: [sulu],
    symbol: "SOL",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 8,
    id: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    name: "Wrapped BTC",
    releases: [sulu],
    symbol: "WBTC",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x3082cc23568ea640225c2467653db90e9250aaa0",
    name: "Radiant",
    releases: [sulu],
    symbol: "RDNT",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x35751007a407ca6feffe80b3cb397736d2cf4dbe",
    name: "Wrapped eETH",
    releases: [sulu],
    symbol: "weETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x4186bfc76e2e237523cbc30fd220fe055156b41f",
    name: "KelpDao Restaked ETH",
    releases: [sulu],
    symbol: "rsETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x565609faf65b92f7be02468acf86f8979423e514",
    name: "Wrapped AVAX",
    releases: [sulu],
    symbol: "WAVAX",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x5979d7b546e38e414f7e9822514be443a4800529",
    name: "Wrapped liquid staked Ether 2.0",
    releases: [sulu],
    symbol: "wstETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    name: "Wrapped Ether",
    releases: [sulu],
    symbol: "WETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x8f5c1a99b1df736ad685006cb6adca7b7ae4b514",
    name: "Melon Token",
    releases: [sulu],
    symbol: "MLN",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0x912ce59144191c1204e64559fe8253a0e49e6548",
    name: "Arbitrum",
    releases: [sulu],
    symbol: "ARB",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xa9004a5421372e1d83fb1f85b0fc986c912f91f3",
    name: "Wrapped BNB",
    releases: [sulu],
    symbol: "WBNB",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xac800fd6159c2a2cb8fc31ef74621eb430287a5a",
    name: "Optimism",
    releases: [sulu],
    symbol: "OP",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 6,
    id: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    name: "USD Coin",
    releases: [sulu],
    symbol: "USDC",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xba5ddd1f9d7f570dc94a51479a000e3bce967196",
    name: "Aave Token",
    releases: [sulu],
    symbol: "AAVE",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xbc011a12da28e8f0f528d9ee5e7039e22f91cf18",
    name: "swETH",
    releases: [sulu],
    symbol: "swETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    name: "Dai Stablecoin",
    releases: [sulu],
    symbol: "DAI",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8",
    name: "Rocket Pool ETH",
    releases: [sulu],
    symbol: "rETH",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
    name: "ChainLink Token",
    releases: [sulu],
    symbol: "LINK",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
    name: "Uniswap",
    releases: [sulu],
    symbol: "UNI",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 18,
    id: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    name: "GMX",
    releases: [sulu],
    symbol: "GMX",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
  {
    decimals: 6,
    id: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    name: "Tether USD",
    releases: [sulu],
    symbol: "USDT",
    type: AssetType.PRIMITIVE,
    priceFeed: {
      type: PriceFeedType.NONE,
    },
  },
]);
