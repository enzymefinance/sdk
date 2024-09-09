import type { Address } from "viem";

export enum PriceFeedType {
  NONE = "NONE",
  WETH = "WETH",
  PRIMITIVE_CHAINLINK = "PRIMITIVE_CHAINLINK",
  PRIMITIVE_CHAINLINK_LIKE_YNETH = "PRIMITIVE_CHAINLINK_LIKE_YNETH",
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
  DERIVATIVE_STADER_SD = "DERIVATIVE_STADER_SD",
  DERIVATIVE_UNISWAP_V2_POOL = "DERIVATIVE_UNISWAP_V2_POOL",
  DERIVATIVE_WSTETH = "DERIVATIVE_WSTETH",
  DERIVATIVE_YEARN_VAULT_V2 = "DERIVATIVE_YEARN_VAULT_V2",
}

export const primitivePriceFeeds = [
  PriceFeedType.PRIMITIVE_CHAINLINK,
  PriceFeedType.PRIMITIVE_CHAINLINK_LIKE_YNETH,
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
  PriceFeedType.DERIVATIVE_STADER_SD,
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
  | PrimitiveChainlinkLikeYnEthPriceFeed
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
  | DerivativeStaderSDPriceFeed
  | DerivativeUniswapV2PoolPriceFeed
  | DerivativeWstethPriceFeed
  | DerivativeYearnVaultV2PriceFeed;

interface PriceFeedBase {
  nonStandard?: boolean;
  peggedTo?: string;
  comment?: string;
}

export interface NoPriceFeed extends PriceFeedBase {
  type: PriceFeedType.NONE;
}

export interface WethPriceFeed extends PriceFeedBase {
  type: PriceFeedType.WETH;
}

export interface PrimitiveChainlinkPriceFeed extends PriceFeedBase {
  type: PriceFeedType.PRIMITIVE_CHAINLINK;
  aggregator: Address;
  rateAsset: RateAsset;
}

export interface PrimitiveChainlinkLikeYnEthPriceFeed extends PriceFeedBase {
  type: PriceFeedType.PRIMITIVE_CHAINLINK_LIKE_YNETH;
  aggregator: Address;
  rateAsset: RateAsset.ETH;
}

export interface PrimitiveRedstonePriceFeed extends PriceFeedBase {
  type: PriceFeedType.PRIMITIVE_REDSTONE;
  aggregator: Address;
  rateAsset: RateAsset;
}

export interface PrimitiveNonStandardPrecisionPriceFeed extends PriceFeedBase {
  type: PriceFeedType.PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION;
  aggregator: Address;
  rateAsset: RateAsset;
}

export interface DerivativeArrakisV2PriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_ARRAKIS_V2;
  address: Address;
}

export interface DerivativeBalancerV2GaugeTokenPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_BALANCER_V2_GAUGE_TOKEN;
  address: Address;
}

export interface DerivativeBalancerV2StablePoolPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_BALANCER_V2_STABLE_POOL;
  address: Address;
}

export interface DerivativeBalancerV2WeightedPoolPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_BALANCER_V2_WEIGHTED_POOL;
  address: Address;
}

export interface DerivativeCompoundPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_COMPOUND;
  address: Address;
}

export interface DerivativeCurvePriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_CURVE;
  address: Address;
}

export interface DerivativeERC4626PriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_ERC4626;
  address: Address;
}

export interface DerivativeEtherfiPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_ETHERFI;
  address: Address;
}

export interface DerivativePeggedDerivativesPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_PEGGED_DERIVATIVES;
  address: Address;
}

export interface DerivativeStaderSDPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_STADER_SD;
  address: Address;
}

export interface DerivativeUniswapV2PoolPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_UNISWAP_V2_POOL;
  address: Address;
}

export interface DerivativeWstethPriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_WSTETH;
  address: Address;
}

export interface DerivativeYearnVaultV2PriceFeed extends PriceFeedBase {
  type: PriceFeedType.DERIVATIVE_YEARN_VAULT_V2;
  address: Address;
}
