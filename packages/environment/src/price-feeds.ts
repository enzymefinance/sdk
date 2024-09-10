import type { Address } from "viem";

export enum PriceFeedType {
  NONE = "NONE",
  WETH = "WETH",
  PRIMITIVE_CHAINLINK = "PRIMITIVE_CHAINLINK",
  PRIMITIVE_CHAINLINK_LIKE_WSTETH = "PRIMITIVE_CHAINLINK_LIKE_WSTETH",
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
  PriceFeedType.PRIMITIVE_CHAINLINK_LIKE_WSTETH,
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
  | PrimitiveChainlinkLikeWstEthPriceFeed
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
  readonly type: PriceFeedType.NONE;
}

export interface WethPriceFeed {
  readonly type: PriceFeedType.WETH;
}

export interface PrimitiveChainlinkPriceFeed {
  readonly type: PriceFeedType.PRIMITIVE_CHAINLINK;
  /**
   * Aggregator address
   */
  readonly aggregator: Address;
  /**
   * Rate Asset (ETH = 0, USD = 1)
   */
  readonly rateAsset: RateAsset;
}

export interface PrimitiveChainlinkLikeWstEthPriceFeed {
  readonly type: PriceFeedType.PRIMITIVE_CHAINLINK_LIKE_WSTETH;
  /**
   * Aggregator address
   */
  readonly aggregator: Address;
  /**
   * Rate Asset (ETH = 0, USD = 1)
   */
  readonly rateAsset: RateAsset.ETH;
}

export interface PrimitiveRedstonePriceFeed {
  readonly type: PriceFeedType.PRIMITIVE_REDSTONE;
  /**
   * Aggregator address
   */
  readonly aggregator: Address;
  /**
   * Rate Asset (ETH = 0, USD = 1)
   */
  readonly rateAsset: RateAsset;
}

export interface PrimitiveNonStandardPrecisionPriceFeed {
  readonly type: PriceFeedType.PRIMITIVE_REDSTONE_NON_STANDARD_PRECISION;
  /**
   * Aggregator address
   */
  readonly aggregator: Address;
  /**
   * Rate Asset (ETH = 0, USD = 1)
   */
  readonly rateAsset: RateAsset;
}

export interface DerivativeArrakisV2PriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_ARRAKIS_V2;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeBalancerV2GaugeTokenPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_BALANCER_V2_GAUGE_TOKEN;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeBalancerV2StablePoolPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_BALANCER_V2_STABLE_POOL;
  /**
   * Price Feed address
   */
  readonly address: Address;
  /**
   * Invariant Proxy Asset (ipa)
   */
  readonly ipa: Address;
}

export interface DerivativeBalancerV2WeightedPoolPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_BALANCER_V2_WEIGHTED_POOL;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeCompoundPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_COMPOUND;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeCurvePriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_CURVE;
  /**
   * Price Feed address
   */
  readonly address: Address;
  /**
   * Invariant Proxy Asset (ipa)
   */
  readonly ipa: Address;
}

export interface DerivativeERC4626PriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_ERC4626;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeEtherfiPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_ETHERFI;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativePeggedDerivativesPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_PEGGED_DERIVATIVES;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeUniswapV2PoolPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_UNISWAP_V2_POOL;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeWstethPriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_WSTETH;
  /**
   * Price Feed address
   */
  readonly address: Address;
}

export interface DerivativeYearnVaultV2PriceFeed {
  readonly type: PriceFeedType.DERIVATIVE_YEARN_VAULT_V2;
  /**
   * Price Feed address
   */
  readonly address: Address;
}
