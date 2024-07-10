import { AssetType, defineAssetList } from "../assets.js";
import { Network } from "../networks.js";
import { releases } from "../releases.js";

const { sulu } = releases.arbitrum;

export default defineAssetList(Network.ARBITRUM, [
  {
    decimals: 18,
    id: "0x8f5c1a99b1df736ad685006cb6adca7b7ae4b514",
    name: "Melon Token",
    releases: [sulu],
    symbol: "MLN",
    type: AssetType.PRIMITIVE,
  },
  {
    decimals: 18,
    id: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    name: "Wrapped Ether",
    releases: [sulu],
    symbol: "WETH",
    type: AssetType.PRIMITIVE,
  },
]);
