import { AssetType, type PrimitiveAsset } from "./assets.js";
import { PriceFeedType } from "./price-feeds.js";
import type { Address } from "./types.js";

export enum Network {
  ARBITRUM = 42161,
  BASE = 8453,
  ETHEREUM = 1,
  POLYGON = 137,
}

export enum NetworkSlug {
  ARBITRUM = "arbitrum",
  BASE = "base",
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
}

export type SlugByNetwork<TNetwork extends Network> = TNetwork extends Network.ARBITRUM
  ? NetworkSlug.ARBITRUM
  : TNetwork extends Network.BASE
    ? NetworkSlug.BASE
    : TNetwork extends Network.ETHEREUM
      ? NetworkSlug.ETHEREUM
      : TNetwork extends Network.POLYGON
        ? NetworkSlug.POLYGON
        : never;

export type NetworkBySlug<TNetworkSlug extends NetworkSlug> = TNetworkSlug extends NetworkSlug.ARBITRUM
  ? Network.ARBITRUM
  : TNetworkSlug extends NetworkSlug.BASE
    ? Network.BASE
    : TNetworkSlug extends NetworkSlug.ETHEREUM
      ? Network.ETHEREUM
      : TNetworkSlug extends NetworkSlug.POLYGON
        ? Network.POLYGON
        : never;

export function getNetwork<TNetwork extends Network = Network>(network: TNetwork): NetworkDefinition<TNetwork>;
export function getNetwork<TNetworkSlug extends NetworkSlug = NetworkSlug>(
  slug: TNetworkSlug,
): NetworkDefinition<NetworkBySlug<TNetworkSlug>>;
export function getNetwork(networkOrSlug: Network | NetworkSlug): NetworkDefinition;

export function getNetwork(networkOrSlug: Network | NetworkSlug): NetworkDefinition {
  if (isSupportedNetwork(networkOrSlug)) {
    return networks[networkOrSlug];
  }

  if (isSupportedNetworkSlug(networkOrSlug)) {
    return networks[networkBySlug[networkOrSlug]];
  }

  throw new Error(`Invalid network ${networkOrSlug}`);
}

export function isNetworkIdentifier(value: any): value is Network | NetworkSlug {
  return isSupportedNetwork(Number(value)) || isSupportedNetworkSlug(value);
}

export function isSupportedNetworkSlug(value: any): value is NetworkSlug {
  return typeof value === "string" && Object.values<any>(NetworkSlug).includes(value);
}

export function isSupportedNetwork(value: any): value is Network {
  const number = Number(value);

  return !Number.isNaN(number) && Object.values<any>(Network).includes(number);
}

export interface NetworkDefinition<TNetwork extends Network = Network> {
  readonly currency: {
    readonly wrapper: Address;
    readonly nativeToken: PrimitiveAsset;
  };
  readonly explorer: {
    readonly label: string;
    readonly url: string;
  };
  readonly id: TNetwork;
  readonly slug: SlugByNetwork<TNetwork>;
  readonly label: string;
  readonly rpc: string;
}

export const slugByNetwork: {
  readonly [TNetwork in Network]: SlugByNetwork<TNetwork>;
} = {
  [Network.ARBITRUM]: NetworkSlug.ARBITRUM,
  [Network.BASE]: NetworkSlug.BASE,
  [Network.ETHEREUM]: NetworkSlug.ETHEREUM,
  [Network.POLYGON]: NetworkSlug.POLYGON,
};

export const networkBySlug: {
  readonly [TNetworkSlug in NetworkSlug]: NetworkBySlug<TNetworkSlug>;
} = {
  [NetworkSlug.ARBITRUM]: Network.ARBITRUM,
  [NetworkSlug.BASE]: Network.BASE,
  [NetworkSlug.ETHEREUM]: Network.ETHEREUM,
  [NetworkSlug.POLYGON]: Network.POLYGON,
};

const arbitrum: NetworkDefinition<Network.ARBITRUM> = {
  currency: {
    wrapper: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    nativeToken: {
      id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      type: AssetType.PRIMITIVE,
      releases: [],
      network: Network.ARBITRUM,
      registered: false,
      priceFeed: {
        type: PriceFeedType.NONE,
      },
    },
  },
  explorer: {
    label: "Arbiscan",
    url: "https://arbiscan.io/",
  },
  id: Network.ARBITRUM,
  label: "Arbitrum",
  rpc: "https://arb1.arbitrum.io/rpc",
  slug: NetworkSlug.ARBITRUM,
};

const base: NetworkDefinition<Network.BASE> = {
  currency: {
    wrapper: "0x4200000000000000000000000000000000000006",
    nativeToken: {
      id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      type: AssetType.PRIMITIVE,
      releases: [],
      network: Network.BASE,
      registered: false,
      priceFeed: {
        type: PriceFeedType.NONE,
      },
    },
  },
  explorer: {
    label: "BaseScan",
    url: "https://basescan.org/",
  },
  id: Network.BASE,
  label: "Base",
  rpc: "https://mainnet.base.org",
  slug: NetworkSlug.BASE,
};

const mainnet: NetworkDefinition<Network.ETHEREUM> = {
  currency: {
    wrapper: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    nativeToken: {
      id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      type: AssetType.PRIMITIVE,
      releases: [],
      network: Network.ETHEREUM,
      registered: false,
      priceFeed: {
        type: PriceFeedType.NONE,
      },
    },
  },
  explorer: {
    label: "Etherscan",
    url: "https://etherscan.io",
  },
  id: Network.ETHEREUM,
  label: "Ethereum",
  rpc: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  slug: NetworkSlug.ETHEREUM,
};

const polygon: NetworkDefinition<Network.POLYGON> = {
  currency: {
    wrapper: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    nativeToken: {
      id: "0x0000000000000000000000000000000000001010",
      name: "Polygon Ecosystem Token",
      symbol: "POL",
      decimals: 18,
      type: AssetType.PRIMITIVE,
      releases: [],
      network: Network.POLYGON,
      registered: false,
      priceFeed: {
        type: PriceFeedType.NONE,
      },
    },
  },
  explorer: {
    label: "Polygonscan",
    url: "https://polygonscan.com",
  },
  id: Network.POLYGON,
  label: "Polygon",
  rpc: "https://polygon-rpc.com",
  slug: NetworkSlug.POLYGON,
};

export const networks: {
  readonly [TNetwork in Network]: NetworkDefinition<TNetwork>;
} = {
  [Network.ARBITRUM]: arbitrum,
  [Network.BASE]: base,
  [Network.ETHEREUM]: mainnet,
  [Network.POLYGON]: polygon,
};
