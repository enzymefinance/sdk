import type { Address } from "viem";

export enum PriceFeedType {
  NONE = "NONE",
  WETH = "WETH",
  PRIMITIVE_CHAINLINK = "PRIMITIVE_CHAINLINK",
  PRIMITIVE_REDSTONE = "PRIMITIVE_REDSTONE",
  PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION = "PRIMITIVE_NON_STANDARD_PRECISION",
  DERIVATIVE_ARRAKIS_V2 = "DERIVATIVE_ARRAKIS_V2",
  DERIVATIVE_BALANCER_V2_GAUGE_TOKEN = "DERIVATIVE_BALANCER_V2_GAUGE_TOKEN",
  DERIVATIVE_BALANCER_V2_STABLE_POOL = "DERIVATIVE_BALANCER_V2_STABLE_POOL",
  DERIVATIVE_BALANCER_V2_WEIGHTED_POOL = "DERIVATIVE_BALANCER_V2_WEIGHTED_POOL",
  DERIVATIVE_COMPOUND = "DERIVATIVE_COMPOUND",
  DERIVATIVE_CURVE = "DERIVATIVE_CURVE",
  DERIVATIVE_ERC4626 = "DERIVATIVE_ERC4626",
  DERIVATIVE_ETHERFI = "DERIVATIVE_ETHERFI",
  DERIVATIVE_PEGGED_DERIVATIVES = "DERIVATIVE_PEGGED_DERIVATIVES",
  DERIVATIVE_REVERTING = "DERIVATIVE_REVERTING",
  DERIVATIVE_UNISWAP_V2_POOL = "DERIVATIVE_UNISWAP_V2_POOL",
  DERIVATIVE_WSTETH = "DERIVATIVE_WSTETH",
  DERIVATIVE_YEARN_VAULT_V2 = "DERIVATIVE_YEARN_VAULT_V2",
}

export const primitivePriceFeeds = [
  PriceFeedType.PRIMITIVE_CHAINLINK,
  PriceFeedType.PRIMITIVE_REDSTONE,
  PriceFeedType.PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION,
];

export const derivativePriceFeeds = [
  PriceFeedType.DERIVATIVE_ARRAKIS_V2,
  PriceFeedType.DERIVATIVE_BALANCER_V2_GAUGE_TOKEN,
  PriceFeedType.DERIVATIVE_BALANCER_V2_STABLE_POOL,
  PriceFeedType.DERIVATIVE_BALANCER_V2_WEIGHTED_POOL,
  PriceFeedType.DERIVATIVE_COMPOUND,
  PriceFeedType.DERIVATIVE_CURVE,
  PriceFeedType.DERIVATIVE_ERC4626,
  PriceFeedType.DERIVATIVE_ETHERFI,
  PriceFeedType.DERIVATIVE_PEGGED_DERIVATIVES,
  PriceFeedType.DERIVATIVE_UNISWAP_V2_POOL,
  PriceFeedType.DERIVATIVE_WSTETH,
  PriceFeedType.DERIVATIVE_YEARN_VAULT_V2,
];

export enum RateAsset {
  ETH = 0,
  USD = 1,
}

export type PriceFeed =
  | NoPriceFeed
  | WethPriceFeed
  | PrimitiveChainlinkPriceFeed
  | PrimitiveRedstonePriceFeed
  | PrimitiveNonStandardPrecisionPriceFeed
  | DerivativeArrakisV2PriceFeed
  | DerivativeBalancerV2GaugeTokenPriceFeed
  | DerivativeBalancerV2StablePoolPriceFeed
  | DerivativeBalancerV2WeightedPoolPriceFeed
  | DerivativeCompoundPriceFeed
  | DerivativeCurvePriceFeed
  | DerivativeERC4626PriceFeed
  | DerivativeEtherfiPriceFeed
  | DerivativePeggedDerivativesPriceFeed
  | DerivativeUniswapV2PoolPriceFeed
  | DerivativeWstethPriceFeed
  | DerivativeYearnVaultV2PriceFeed;

export interface NoPriceFeed {
  type: PriceFeedType.NONE;
}

export interface WethPriceFeed {
  type: PriceFeedType.WETH;
}

export interface PrimitiveChainlinkPriceFeed {
  type: PriceFeedType.PRIMITIVE_CHAINLINK;
  aggregator: Address;
  rateAsset: RateAsset;
}

export interface PrimitiveRedstonePriceFeed {
  type: PriceFeedType.PRIMITIVE_REDSTONE;
  aggregator: Address;
  rateAsset: RateAsset;
}

export interface PrimitiveNonStandardPrecisionPriceFeed {
  type: PriceFeedType.PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION;
  aggregator: Address;
  rateAsset: RateAsset;
}

export interface DerivativeArrakisV2PriceFeed {
  type: PriceFeedType.DERIVATIVE_ARRAKIS_V2;
  address: Address;
}

export interface DerivativeBalancerV2GaugeTokenPriceFeed {
  type: PriceFeedType.DERIVATIVE_BALANCER_V2_GAUGE_TOKEN;
  address: Address;
}

export interface DerivativeBalancerV2StablePoolPriceFeed {
  type: PriceFeedType.DERIVATIVE_BALANCER_V2_STABLE_POOL;
  address: Address;
}

export interface DerivativeBalancerV2WeightedPoolPriceFeed {
  type: PriceFeedType.DERIVATIVE_BALANCER_V2_WEIGHTED_POOL;
  address: Address;
}

export interface DerivativeCompoundPriceFeed {
  type: PriceFeedType.DERIVATIVE_COMPOUND;
  address: Address;
}

export interface DerivativeCurvePriceFeed {
  type: PriceFeedType.DERIVATIVE_CURVE;
  address: Address;
}

export interface DerivativeERC4626PriceFeed {
  type: PriceFeedType.DERIVATIVE_ERC4626;
  address: Address;
}

export interface DerivativeEtherfiPriceFeed {
  type: PriceFeedType.DERIVATIVE_ETHERFI;
  address: Address;
}

export interface DerivativePeggedDerivativesPriceFeed {
  type: PriceFeedType.DERIVATIVE_PEGGED_DERIVATIVES;
  address: Address;
}

export interface DerivativeUniswapV2PoolPriceFeed {
  type: PriceFeedType.DERIVATIVE_UNISWAP_V2_POOL;
  address: Address;
}

export interface DerivativeWstethPriceFeed {
  type: PriceFeedType.DERIVATIVE_WSTETH;
  address: Address;
}

export interface DerivativeYearnVaultV2PriceFeed {
  type: PriceFeedType.DERIVATIVE_YEARN_VAULT_V2;
  address: Address;
}
