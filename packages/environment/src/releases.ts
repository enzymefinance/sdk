import type { AssetDefinition, CompoundV2Asset, ERC4626Asset, PrimitiveAsset } from "./assets.js";
import type { VersionContracts } from "./contracts.js";
import { Version, isVersion } from "./contracts.js";
import type { Network } from "./networks.js";
import type { Address } from "./types.js";

export enum Status {
  LIVE = "live",
  PENDING = "pending",
  DEPRECATED = "deprecated",
}

export enum Deployment {
  ARBITRUM = "arbitrum",
  BASE = "base",
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
  TESTNET = "testnet",
}

export type DeploymentNetwork<TDeployment extends Deployment> = TDeployment extends Deployment.ARBITRUM
  ? Network.ARBITRUM
  : TDeployment extends Deployment.BASE
    ? Network.BASE
    : TDeployment extends Deployment.ETHEREUM
      ? Network.ETHEREUM
      : TDeployment extends Deployment.POLYGON
        ? Network.POLYGON
        : TDeployment extends Deployment.TESTNET
          ? Network.POLYGON
          : never;

export function isDeployment(value: any): value is Deployment {
  return typeof value === "string" && Object.values<any>(Deployment).includes(value);
}

export function isRelease(value: any): value is Release {
  if (typeof value === "string") {
    const [deployment, version] = value.split(".");

    if (isDeployment(deployment) && isVersion(version)) {
      return Object.keys(releases[deployment]).includes(version);
    }
  }

  return false;
}

export interface ReleaseDefinition<TVersion extends Version, TDeployment extends Deployment> {
  /**
   * The unique release identifier.
   */
  readonly slug: `${TDeployment}.${TVersion}`;
  /**
   * The network identifier.
   */
  readonly network: DeploymentNetwork<TDeployment>;
  /**
   * The address of the fund deployer contract.
   */
  readonly address: Address;
  /**
   * The version (e.g. sulu, encore, phoenix) of the release.
   */
  readonly version: TVersion;
  /**
   * The block number at which the fund deployer contract was deployed.
   */
  readonly inception: number;
  /**
   * Mapping of contract names and their addresses within this release.
   */
  readonly contracts: VersionContracts<TVersion>;
  /**
   * The release status (pending, deprecated or live).
   */
  readonly status: Status;
}

export enum Kind {
  TEST = "test",
  LIVE = "live",
}

export interface DeploymentNamedTokensArbitrum {
  readonly bal: Address;
  readonly comp: Address;
  readonly crv: Address;
  readonly cvx: Address;
  readonly dai: Address;
  readonly grt: Address;
  readonly mln: Address;
  readonly usdt: Address;
  readonly weth: Address;
}

export interface DeploymentNamedTokensBase {
  readonly comp: Address;
  readonly dai: Address;
  readonly mln: Address;
  readonly usdt: Address;
  readonly weth: Address;
}

export interface DeploymentNamedTokensEthereum {
  readonly aave: Address;
  readonly bal: Address;
  readonly ceth: Address;
  readonly comp: Address;
  readonly crv: Address;
  readonly cvx: Address;
  readonly dai: Address;
  readonly diva: Address;
  readonly ethx: Address;
  readonly grt: Address;
  readonly idle: Address;
  readonly lusd: Address;
  readonly mln: Address;
  readonly mpl: Address;
  readonly paxg: Address;
  readonly ptkn_mln: Address;
  readonly steth: Address;
  readonly sthoundeth: Address;
  readonly stkaave: Address;
  readonly stusd: Address;
  readonly sweth: Address;
  readonly uni: Address;
  readonly usda: Address;
  readonly usdc: Address;
  readonly usdt: Address;
  readonly weth: Address;
}

export interface DeploymentNamedTokensPolygon {
  readonly aave: Address;
  readonly bal: Address;
  readonly comp: Address;
  readonly crv: Address;
  readonly cvx: Address;
  readonly dai: Address;
  readonly eure: Address;
  readonly grt: Address;
  readonly mln: Address;
  readonly uni: Address;
  readonly usdc: Address;
  readonly usdt: Address;
  readonly weth: Address;
}

export type DeploymentNamedTokens<TDeployment extends Deployment> = TDeployment extends Deployment.ARBITRUM
  ? DeploymentNamedTokensArbitrum
  : TDeployment extends Deployment.BASE
    ? DeploymentNamedTokensBase
    : TDeployment extends Deployment.ETHEREUM
      ? DeploymentNamedTokensEthereum
      : TDeployment extends Deployment.POLYGON
        ? DeploymentNamedTokensPolygon
        : TDeployment extends Deployment.TESTNET
          ? DeploymentNamedTokensPolygon
          : never;

export interface DeploymentNamedTokensAssetsArbitrum {
  readonly bal: PrimitiveAsset;
  readonly comp: PrimitiveAsset;
  readonly crv: PrimitiveAsset;
  readonly cvx: PrimitiveAsset;
  readonly dai: PrimitiveAsset;
  readonly grt: PrimitiveAsset;
  readonly mln: PrimitiveAsset;
  readonly nativeTokenWrapper: PrimitiveAsset;
  readonly usdt: PrimitiveAsset;
  readonly weth: PrimitiveAsset;
}

export interface DeploymentNamedTokensAssetsBase {
  readonly comp: PrimitiveAsset;
  readonly dai: PrimitiveAsset;
  readonly mln: PrimitiveAsset;
  readonly nativeTokenWrapper: PrimitiveAsset;
  readonly usdt: PrimitiveAsset;
  readonly weth: PrimitiveAsset;
}

export interface DeploymentNamedTokensAssetsEthereum {
  readonly aave: PrimitiveAsset;
  readonly bal: PrimitiveAsset;
  readonly ceth: CompoundV2Asset;
  readonly comp: PrimitiveAsset;
  readonly crv: PrimitiveAsset;
  readonly cvx: PrimitiveAsset;
  readonly dai: PrimitiveAsset;
  readonly diva: PrimitiveAsset;
  readonly ethx: PrimitiveAsset;
  readonly grt: PrimitiveAsset;
  readonly idle: PrimitiveAsset;
  readonly lusd: PrimitiveAsset;
  readonly mln: PrimitiveAsset;
  readonly mpl: PrimitiveAsset;
  readonly nativeTokenWrapper: PrimitiveAsset;
  readonly paxg: PrimitiveAsset;
  readonly ptkn_mln: PrimitiveAsset;
  readonly sthoundeth: PrimitiveAsset;
  readonly stkaave: PrimitiveAsset;
  readonly steth: PrimitiveAsset;
  readonly stusd: ERC4626Asset;
  readonly sweth: PrimitiveAsset;
  readonly uni: PrimitiveAsset;
  readonly usda: PrimitiveAsset;
  readonly usdc: PrimitiveAsset;
  readonly usdt: PrimitiveAsset;
  readonly weth: PrimitiveAsset;
}

export interface DeploymentNamedTokensAssetsPolygon {
  readonly aave: PrimitiveAsset;
  readonly bal: PrimitiveAsset;
  readonly comp: PrimitiveAsset;
  readonly crv: PrimitiveAsset;
  readonly cvx: PrimitiveAsset;
  readonly dai: PrimitiveAsset;
  readonly eure: PrimitiveAsset;
  readonly grt: PrimitiveAsset;
  readonly mln: PrimitiveAsset;
  readonly nativeTokenWrapper: PrimitiveAsset;
  readonly uni: PrimitiveAsset;
  readonly usdc: PrimitiveAsset;
  readonly usdt: PrimitiveAsset;
  readonly weth: PrimitiveAsset;
}

export type DeploymentNamedAssetsTokens<TDeployment extends Deployment> = TDeployment extends Deployment.ARBITRUM
  ? DeploymentNamedTokensAssetsArbitrum
  : TDeployment extends Deployment.BASE
    ? DeploymentNamedTokensAssetsBase
    : TDeployment extends Deployment.ETHEREUM
      ? DeploymentNamedTokensAssetsEthereum
      : TDeployment extends Deployment.POLYGON
        ? DeploymentNamedTokensAssetsPolygon
        : TDeployment extends Deployment.TESTNET
          ? DeploymentNamedTokensAssetsPolygon
          : never;

export interface SubgraphMapping {
  readonly core: { slug: string; id: string; devVersion: string };
  readonly assets: { slug: string; id: string };
  readonly shares: { slug: string; id: string };
  readonly balances: { slug: string; id: string };
  readonly vaults: { slug: string; id: string };
}

export type KnownAddressListIdMapping<TDeployment extends Deployment> = {
  noSlippageAdapters: bigint;
  adapters: bigint;
  fees: bigint;
  policies: bigint;
  nonStandardPriceFeedAssets: bigint;
  aTokens: bigint;
} & (TDeployment extends Deployment.ETHEREUM ? KnownAddressListIdMappingEthereumSpecific : {});

export type KnownAddressListIdMappingEthereumSpecific = {
  kilnStakingContracts: bigint;
  zeroLendRWAStablecoinsATokens: bigint;
  zeroLendLRTBTCATokens: bigint;
};

export interface KnownUintListIdMapping {
  allowedMorphoBlueVaults?: bigint;
}

export interface ExternalContractsMapping {
  readonly aaveUIIncentiveDataProvider: Address;
  readonly aaveV2IncentivesController: Address;
  readonly aaveV2LendingPoolProvider: Address;
  readonly aaveV3LendingPoolProvider: Address;
  readonly aaveV3ProtocolDataProvider: Address;
  readonly aaveV3RewardsController: Address;
  readonly aliceOrderManager: Address;
  readonly arrakisV2Helper: Address;
  readonly arrakisV2Resolver: Address;
  readonly balancerGaugeController: Address;
  readonly balancerHelpers: Address;
  readonly balancerMinter: Address;
  readonly balancerProtocolFeesCollector: Address;
  readonly balancerVault: Address;
  readonly chainlinkFeedsRegistry: Address;
  readonly compoundComptroller: Address;
  readonly compoundV3Rewards: Address;
  readonly curveChildLiquidityGaugeFactory: Address;
  readonly curveMinter: Address;
  readonly curveRegistry: Address;
  readonly cvxCrvStaking: Address;
  readonly gmxV2ChainlinkPriceFeed: Address;
  readonly gmxV2DataStore: Address;
  readonly gmxV2ExchangeRouter: Address;
  readonly gmxV2Reader: Address;
  readonly gmxV2ReferralStorage: Address;
  readonly kilnStaking: Address;
  readonly lidoWithdrawalsQueue: Address;
  readonly liquityCollSurplusPool: Address;
  readonly liquityHintHelpers: Address;
  readonly liquitySortedTroves: Address;
  readonly liquityTroveManager: Address;
  readonly makerMCDPotAddress: Address;
  readonly merklDistributor: Address;
  readonly morphoBlue: Address;
  readonly multicall: Address;
  readonly paraswapV5AugustusSwapper: Address;
  readonly paraswapV5TokenTransferProxy: Address;
  readonly pendlePtLpOracle: Address;
  readonly staderStakingPoolManager: Address;
  readonly staderUserWithdrawManager: Address;
  readonly stakeWiseV3KeeperRewards: Address;
  readonly theGraphDelegationStakingProxy: Address;
  readonly theGraphEpochManagerProxy: Address;
  readonly uniswapV3NonFungiblePositionManager: Address;
  readonly voteLockedConvexToken: Address;
  readonly votiumVoteProxy: Address;
  readonly zeroExExchangeProxy: Address;
  readonly zeroExV4Exchange: Address;
  readonly zeroLendAaveV3UIIncentiveDataProvider: Address;
  readonly zeroLendLRTBTCAaveV3LendingPoolProvider: Address;
  readonly zeroLendLRTBTCAaveV3ProtocolDataProvider: Address;
  readonly zeroLendLRTBTCAaveV3RewardsController: Address;
  readonly zeroLendRWAStablecoinsAaveV3LendingPoolProvider: Address;
  readonly zeroLendRWAStablecoinsAaveV3ProtocolDataProvider: Address;
  readonly zeroLendRWAStablecoinsAaveV3RewardsController: Address;
}

export interface DeploymentDefinition<TDeployment extends Deployment> {
  /**
   * The unique deployment identifier.
   */
  readonly slug: TDeployment;
  /**
   * The network identifier.
   */
  readonly network: DeploymentNetwork<TDeployment>;
  /**
   * The external contracts identifier.
   */
  readonly externalContracts: ExternalContractsMapping;
  /**
   * Ids for known address lists.
   */
  readonly knownAddressLists: KnownAddressListIdMapping<TDeployment>;
  /**
   * Ids for known uint lists.
   */
  readonly knownUintLists: KnownUintListIdMapping;
  /**
   * The kind of the deployment (e.g. testnet or production).
   */
  readonly kind: Kind;
  /**
   * The address of the dispatcher contract.
   */
  readonly address: Address;
  /**
   * The human readable name of the deployment.
   */
  readonly label: string;
  /**
   * The block number at which the dispatcher contract was deployed.
   */
  readonly inception: number;
  /**
   * Asset list bound to this deployment.
   */
  readonly assets: Array<AssetDefinition>;
  /**
   * Deployment specific tokens.
   */
  readonly namedTokens: DeploymentNamedTokens<TDeployment>;
  /**
   * Subgraph name mapping.
   */
  readonly subgraphs: SubgraphMapping;
  /**
   * List of releases that belong to this deployment.
   */
  readonly releases: Partial<{
    readonly [TVersion in Version]: ReleaseDefinition<TVersion, TDeployment>;
  }>;
}

export function defineDeployment<TDeployment extends Deployment>(deployment: DeploymentDefinition<TDeployment>) {
  return deployment;
}

export type Release = {
  [TDeployment in Deployment]: (typeof releases)[TDeployment][keyof (typeof releases)[TDeployment]];
}[Deployment];

export const releases = {
  [Deployment.ARBITRUM]: {
    [Version.SULU]: `${Deployment.ARBITRUM}.${Version.SULU}`,
  },
  [Deployment.BASE]: {
    [Version.SULU]: `${Deployment.BASE}.${Version.SULU}`,
  },
  [Deployment.ETHEREUM]: {
    [Version.SULU]: `${Deployment.ETHEREUM}.${Version.SULU}`,
    [Version.ENCORE]: `${Deployment.ETHEREUM}.${Version.ENCORE}`,
    [Version.PHOENIX]: `${Deployment.ETHEREUM}.${Version.PHOENIX}`,
  },
  [Deployment.POLYGON]: {
    [Version.SULU]: `${Deployment.POLYGON}.${Version.SULU}`,
  },
  [Deployment.TESTNET]: {
    [Version.SULU]: `${Deployment.TESTNET}.${Version.SULU}`,
  },
} as const;
