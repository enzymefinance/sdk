import type { Network } from "./networks.js";
import type { PriceFeed } from "./price-feeds.js";
import type { Release } from "./releases.js";
import type { Address, Hex, NarrowByType } from "./types.js";

interface AssetBase {
  /**
   * The asset address.
   */
  readonly id: Address;
  /**
   * The asset name.
   */
  readonly name: string;
  /**
   * The asset symbol
   */
  readonly symbol: string;
  /**
   * Number of decimal places.
   */
  readonly decimals: number;
  /**
   * The asset type.
   */
  readonly type: AssetType;
  /**
   * List of release slugs the asset is registered on.
   */
  readonly releases: Array<Release>;
  /**
   * The network the asset is deployed on.
   */
  readonly network: Network;
  /**
   * Whether the asset is registered on the current release.
   */
  readonly registered: boolean;
  /**
   * Price feed used for the asset.
   */
  readonly priceFeed: PriceFeed;
}

export type AssetDefinitionInput = {
  [TAssetType in AssetType]: Omit<NarrowByType<Asset, TAssetType>, "network" | "registered">;
}[AssetType];

export type AssetDefinition = {
  [TAssetType in AssetType]: NarrowByType<Asset, TAssetType>;
}[AssetType];

export type Asset =
  | AaveV2Asset
  | AaveV3Asset
  | BalancerPoolAsset
  | BalancerPoolGaugeAsset
  | CompoundV2Asset
  | CompoundV3Asset
  | CurvePoolGaugeAsset
  | CurvePoolLpAsset
  | ERC4626Asset
  | IdleAsset
  | MapleV1Asset
  | MapleV2Asset
  | PrimitiveAsset
  | SynthetixAsset
  | UniswapV2PoolAsset
  | YearnVaultV2Asset;

export enum AssetType {
  AAVE_V2 = "aave-v2",
  AAVE_V3 = "aave-v3",
  BALANCER_POOL = "balancer-pool",
  BALANCER_POOL_GAUGE = "balancer-pool-gauge",
  COMPOUND_V2 = "compound-v2",
  COMPOUND_V3 = "compound-v3",
  CURVE_POOL_LP = "curve-pool-lp",
  CURVE_POOL_GAUGE = "curve-pool-gauge",
  IDLE = "idle",
  PRIMITIVE = "primitive",
  SYNTHETIX = "synthetix",
  UNISWAP_V2_POOL = "uniswap-v2-pool",
  YEARN_VAULT_V2 = "yearn-vault-v2",
  MAPLE_V1 = "maple-v1",
  MAPLE_V2 = "maple-v2",
  ERC_4626 = "erc-4626",
}

export interface SynthetixAsset extends AssetBase {
  readonly type: AssetType.SYNTHETIX;
}

export interface PrimitiveAsset extends AssetBase {
  readonly type: AssetType.PRIMITIVE;
}

export interface AaveV2Asset extends AssetBase {
  readonly type: AssetType.AAVE_V2;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface AaveV3Asset extends AssetBase {
  readonly type: AssetType.AAVE_V3;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface CompoundV2Asset extends AssetBase {
  readonly type: AssetType.COMPOUND_V2;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface CompoundV3Asset extends AssetBase {
  readonly type: AssetType.COMPOUND_V3;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface CompoundV3Asset extends AssetBase {
  readonly type: AssetType.COMPOUND_V3;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface IdleAsset extends AssetBase {
  readonly type: AssetType.IDLE;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface YearnVaultV2Asset extends AssetBase {
  readonly type: AssetType.YEARN_VAULT_V2;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export interface UniswapV2PoolAsset extends AssetBase {
  readonly type: AssetType.UNISWAP_V2_POOL;
  /**
   * Underlying Asset Pair.
   */
  readonly underlyings: readonly [Address, Address];
}

export interface MapleV1Asset extends AssetBase {
  readonly type: AssetType.MAPLE_V1;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
  readonly rewardsContract: Address;
}

export interface MapleV2Asset extends AssetBase {
  readonly type: AssetType.MAPLE_V2;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
  readonly poolManager: Address;
}

export interface ERC4626Asset extends AssetBase {
  readonly type: AssetType.ERC_4626;
  /**
   * The protocol of the ERC4626 asset (since there are multiple protocols that implement ERC4626 assets)
   */
  readonly protocol: Erc4626Protocol;
  /**
   * Underlying Asset.
   */
  readonly underlying: Address;
}

export enum Erc4626Protocol {
  ANGLE = "ANGLE",
  MORPHO = "MORPHO",
  SPARK = "SPARK",
  VAULTCRAFT = "VAULTCRAFT",
}

export enum BalancerStakingType {
  NONE = "none",
  GAUGE = "gauge",
}

export interface BalancerStaking {
  readonly token: Address;
  readonly type: BalancerStakingType;
}

export enum BalancerPoolType {
  META_STABLE = "meta-stable",
  STABLE = "stable",
  WEIGHTED = "weighted",
  COMPOSABLE_STABLE_V5 = "composable-stable-v5",
}

export interface BalancerPoolAsset extends AssetBase {
  readonly type: AssetType.BALANCER_POOL;
  /**
   * Balancer pool factory.
   */
  readonly poolFactory: Address;
  /**
   * Staking options.
   */
  readonly staking: Array<BalancerStaking>;
  /**
   * Balancer Pool type.
   */
  readonly poolType: BalancerPoolType;
  /**
   * Underlying Assets.
   */
  readonly underlyings: Array<Address>;

  /**
   * Pool id.
   */
  readonly poolId: Hex;
}

export interface BalancerPoolGaugeAsset extends AssetBase {
  readonly type: AssetType.BALANCER_POOL_GAUGE;
  /**
   * Balancer Pool.
   */
  readonly pool: Address;
  /**
   * Balancer gauge factory.
   */
  readonly gaugeFactory: Address;
  /**
   * Balancer Pool template.
   */
  readonly poolType: BalancerPoolType;
  /**
   * Underlying Assets.
   */
  readonly underlyings: Array<Address>;
}

export enum CurvePoolTemplate {
  AAVE = "aave",
  BASE = "base",
  ETH = "eth",
  META = "meta",
  YEARN = "yearn",
}

export enum CurveStakingType {
  NONE = "none",
  GAUGE = "gauge",
}

export interface CurveStaking {
  readonly token: Address;
  readonly type: CurveStakingType;
}

export interface CurvePoolLpAsset extends AssetBase {
  readonly type: AssetType.CURVE_POOL_LP;
  /**
   * Curve Pool.
   */
  readonly pool: Address;
  /**
   * Staking options.
   */
  readonly staking: Array<CurveStaking>;
  /**
   * Curve Pool template. See: https://github.com/curvefi/curve-contract/tree/master/contracts/pool-templates
   */
  readonly template: CurvePoolTemplate;
  /**
   * Underlying Assets.
   */
  readonly underlyings: Array<Address>;
}

export interface CurvePoolGaugeAsset extends AssetBase {
  readonly type: AssetType.CURVE_POOL_GAUGE;
  /**
   * Curve LP Token.
   */
  readonly lp: Address;
  /**
   * Curve Pool.
   */
  readonly pool: Address;
  /**
   * Curve Pool template. See: https://github.com/curvefi/curve-contract/tree/master/contracts/pool-templates
   */
  readonly template: CurvePoolTemplate;
  /**
   * Underlying Assets.
   */
  readonly underlyings: Array<Address>;
}

export function defineAssetList<TNetwork extends Network>(
  network: TNetwork,
  assets: ReadonlyArray<AssetDefinitionInput>,
) {
  return assets.map<AssetDefinition>((item) => ({ ...item, network, registered: false }));
}
