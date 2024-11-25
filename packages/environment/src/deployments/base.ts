import assets from "../assets/base.js";
import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, Kind, Status, defineDeployment } from "../releases.js";

export default defineDeployment<Deployment.BASE>({
  address: "0x0000000000000000000000000000000000000000",
  assets,
  externalContracts: {
    aaveUIIncentiveDataProvider: "0x0000000000000000000000000000000000000000",
    aaveV2IncentivesController: "0x0000000000000000000000000000000000000000",
    aaveV2LendingPoolProvider: "0x0000000000000000000000000000000000000000",
    aaveV3RewardsController: "0x0000000000000000000000000000000000000000",
    aaveV3LendingPoolProvider: "0x0000000000000000000000000000000000000000",
    aaveV3ProtocolDataProvider: "0x0000000000000000000000000000000000000000",
    aliceOrderManager: "0x0000000000000000000000000000000000000000",
    arrakisV2Helper: "0x0000000000000000000000000000000000000000",
    arrakisV2Resolver: "0x0000000000000000000000000000000000000000",
    balancerMinter: "0x0000000000000000000000000000000000000000",
    balancerProtocolFeesCollector: "0x0000000000000000000000000000000000000000",
    balancerGaugeController: "0x0000000000000000000000000000000000000000",
    balancerHelpers: "0x0000000000000000000000000000000000000000",
    balancerVault: "0x0000000000000000000000000000000000000000",
    chainlinkFeedsRegistry: "0x0000000000000000000000000000000000000000",
    compoundComptroller: "0x0000000000000000000000000000000000000000",
    compoundV3Rewards: "0x0000000000000000000000000000000000000000",
    curveChildLiquidityGaugeFactory: "0x0000000000000000000000000000000000000000",
    curveMinter: "0x0000000000000000000000000000000000000000",
    curveRegistry: "0x0000000000000000000000000000000000000000",
    cvxCrvStaking: "0x0000000000000000000000000000000000000000",
    gmxV2ExchangeRouter: "0x0000000000000000000000000000000000000000",
    gmxV2ChainlinkPriceFeed: "0x0000000000000000000000000000000000000000",
    gmxV2DataStore: "0x0000000000000000000000000000000000000000",
    gmxV2Reader: "0x0000000000000000000000000000000000000000",
    gmxV2ReferralStorage: "0x0000000000000000000000000000000000000000",
    kilnStaking: "0x0000000000000000000000000000000000000000",
    lidoWithdrawalsQueue: "0x0000000000000000000000000000000000000000",
    liquityHintHelpers: "0x0000000000000000000000000000000000000000",
    liquitySortedTroves: "0x0000000000000000000000000000000000000000",
    liquityTroveManager: "0x0000000000000000000000000000000000000000",
    liquityCollSurplusPool: "0x0000000000000000000000000000000000000000",
    paraswapV5AugustusSwapper: "0x0000000000000000000000000000000000000000",
    paraswapV5TokenTransferProxy: "0x0000000000000000000000000000000000000000",
    pendlePtLpOracle: "0x0000000000000000000000000000000000000000",
    stakeWiseV3KeeperRewards: "0x0000000000000000000000000000000000000000",
    uniswapV3NonFungiblePositionManager: "0x0000000000000000000000000000000000000000",
    voteLockedConvexToken: "0x0000000000000000000000000000000000000000",
    votiumVoteProxy: "0x0000000000000000000000000000000000000000",
    zeroExExchangeProxy: "0x0000000000000000000000000000000000000000",
    theGraphEpochManagerProxy: "0x0000000000000000000000000000000000000000",
    theGraphDelegationStakingProxy: "0x0000000000000000000000000000000000000000",
    multicall: "0x0000000000000000000000000000000000000000",
    makerMCDPotAddress: "0x0000000000000000000000000000000000000000",
    zeroExV4Exchange: "0x0000000000000000000000000000000000000000",
    staderStakingPoolManager: "0x0000000000000000000000000000000000000000",
  },
  inception: 22694485,
  kind: Kind.TEST,
  knownAddressLists: {
    noSlippageAdapters: 1n,
    adapters: 2n,
    fees: 3n,
    policies: 4n,
    nonStandardPriceFeedAssets: 16n,
    aTokens: 8n,
  },
  label: "Base",
  namedTokens: {
    bal: "0x4158734d47fc9692176b5085e0f52ee0da5d47f1",
    comp: "0x9e1028f5f1d5ede59748ffcee5532509976840e0",
    dai: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
    mln: "0x7c298664bd6582f6f264c2cb5a4b9cc09b6e3889",
    weth: "0x4200000000000000000000000000000000000006",
  },
  network: Network.BASE,
  releases: {
    [Version.SULU]: {
      address: "0x0000000000000000000000000000000000000000",
      contracts: {
        AaveDebtPositionLib: "0x0000000000000000000000000000000000000000",
        AaveDebtPositionParser: "0x0000000000000000000000000000000000000000",
        AavePriceFeed: "0x0000000000000000000000000000000000000000",
        AaveV2Adapter: "0x0000000000000000000000000000000000000000",
        AaveV2ATokenListOwner: "0x0000000000000000000000000000000000000000",
        AaveV3Adapter: "0x0000000000000000000000000000000000000000",
        AaveV3ATokenListOwner: "0x0000000000000000000000000000000000000000",
        AaveV3DebtPositionLib: "0x0000000000000000000000000000000000000000",
        AaveV3DebtPositionParser: "0x0000000000000000000000000000000000000000",
        AaveV3FlashLoanAssetManagerFactory: "0x0000000000000000000000000000000000000000",
        AaveV3FlashLoanAssetManagerLib: "0x0000000000000000000000000000000000000000",
        AddressListRegistry: "0x0000000000000000000000000000000000000000",
        AlicePositionLib: "0x0000000000000000000000000000000000000000",
        AlicePositionParser: "0x0000000000000000000000000000000000000000",
        AllowedAdapterIncomingAssetsPolicy: "0x0000000000000000000000000000000000000000",
        AllowedAdaptersPerManagerPolicy: "0x0000000000000000000000000000000000000000",
        AllowedAdaptersPolicy: "0x0000000000000000000000000000000000000000",
        AllowedAssetsForRedemptionPolicy: "0x0000000000000000000000000000000000000000",
        AllowedDepositRecipientsPolicy: "0x0000000000000000000000000000000000000000",
        AllowedExternalPositionTypesPerManagerPolicy: "0x0000000000000000000000000000000000000000",
        AllowedExternalPositionTypesPolicy: "0x0000000000000000000000000000000000000000",
        AllowedRedeemersForSpecificAssetsPolicy: "0x0000000000000000000000000000000000000000",
        AllowedSharesTransferRecipientsPolicy: "0x0000000000000000000000000000000000000000",
        ArbitraryLoanPositionLib: "0x0000000000000000000000000000000000000000",
        ArbitraryLoanPositionParser: "0x0000000000000000000000000000000000000000",
        ArbitraryLoanTotalNominalDeltaOracleModule: "0x0000000000000000000000000000000000000000",
        ArrakisV2Adapter: "0x0000000000000000000000000000000000000000",
        ArrakisV2PriceFeed: "0x0000000000000000000000000000000000000000",
        AssetValueCalculator: "0x0000000000000000000000000000000000000000",
        BalancerV2GaugeTokenPriceFeed: "0x0000000000000000000000000000000000000000",
        BalancerV2LiquidityAdapter: "0x0000000000000000000000000000000000000000",
        BalancerV2StablePoolPriceFeed: "0x0000000000000000000000000000000000000000",
        BalancerV2WeightedPoolPriceFeed: "0x0000000000000000000000000000000000000000",
        ChainlinkLikeWstethPriceFeed: "0x0000000000000000000000000000000000000000",
        ChainlinkLikeYnEthPriceFeed: "0x0000000000000000000000000000000000000000",
        CompoundAdapter: "0x0000000000000000000000000000000000000000",
        CompoundDebtPositionLib: "0x0000000000000000000000000000000000000000",
        CompoundDebtPositionParser: "0x0000000000000000000000000000000000000000",
        CompoundPriceFeed: "0x0000000000000000000000000000000000000000",
        CompoundV3TokenListOwner: "0x0000000000000000000000000000000000000000",
        CompoundV3Adapter: "0x0000000000000000000000000000000000000000",
        ComptrollerLib: "0x0000000000000000000000000000000000000000",
        ConvexVotingPositionLib: "0x0000000000000000000000000000000000000000",
        ConvexVotingPositionParser: "0x0000000000000000000000000000000000000000",
        CumulativeSlippageTolerancePolicy: "0x0000000000000000000000000000000000000000",
        CurveExchangeAdapter: "0x0000000000000000000000000000000000000000",
        CurveLiquidityAaveAdapter: "0x0000000000000000000000000000000000000000",
        CurveLiquidityAdapter: "0x0000000000000000000000000000000000000000",
        CurveLiquiditySethAdapter: "0x0000000000000000000000000000000000000000",
        CurveLiquidityStethAdapter: "0x0000000000000000000000000000000000000000",
        CurvePriceFeed: "0x0000000000000000000000000000000000000000",
        DepositWrapper: "0x0000000000000000000000000000000000000000",
        DisallowedAdapterIncomingAssetsPolicy: "0x0000000000000000000000000000000000000000",
        Dispatcher: "0x0000000000000000000000000000000000000000",
        EntranceRateBurnFee: "0x0000000000000000000000000000000000000000",
        EntranceRateDirectFee: "0x0000000000000000000000000000000000000000",
        ERC4626Adapter: "0x0000000000000000000000000000000000000000",
        ERC4626PriceFeed: "0x0000000000000000000000000000000000000000",
        EtherFiEthPriceFeed: "0x0000000000000000000000000000000000000000",
        ExitRateBurnFee: "0x0000000000000000000000000000000000000000",
        ExitRateDirectFee: "0x0000000000000000000000000000000000000000",
        ExternalPositionFactory: "0x0000000000000000000000000000000000000000",
        ExternalPositionManager: "0x0000000000000000000000000000000000000000",
        FeeManager: "0x0000000000000000000000000000000000000000",
        FiduPriceFeed: "0x0000000000000000000000000000000000000000",
        FundDataProviderRouter: "0x0000000000000000000000000000000000000000",
        FundDeployer: "0x0000000000000000000000000000000000000000",
        FundValueCalculator: "0x0000000000000000000000000000000000000000",
        FundValueCalculatorRouter: "0x0000000000000000000000000000000000000000",
        GasRelayPaymasterFactory: "0x0000000000000000000000000000000000000000",
        GasRelayPaymasterLib: "0x0000000000000000000000000000000000000000",
        GatedRedemptionQueueSharesWrapperFactory: "0x0000000000000000000000000000000000000000",
        GatedRedemptionQueueSharesWrapperLib: "0x0000000000000000000000000000000000000000",
        GenericAdapter: "0x0000000000000000000000000000000000000000",
        GlobalConfigLib: "0x0000000000000000000000000000000000000000",
        GlobalConfigProxy: "0x0000000000000000000000000000000000000000",
        GMXV2LeverageTradingPositionLib: "0x0000000000000000000000000000000000000000",
        GMXV2LeverageTradingPositionParser: "0x0000000000000000000000000000000000000000",
        IntegrationManager: "0x0000000000000000000000000000000000000000",
        KilnStakingPositionLib: "0x0000000000000000000000000000000000000000",
        KilnStakingPositionParser: "0x0000000000000000000000000000000000000000",
        LidoWithdrawalsPositionLib: "0x0000000000000000000000000000000000000000",
        LidoWithdrawalsPositionParser: "0x0000000000000000000000000000000000000000",
        LiquityDebtPositionLib: "0x0000000000000000000000000000000000000000",
        LiquityDebtPositionParser: "0x0000000000000000000000000000000000000000",
        ManagementFee: "0x0000000000000000000000000000000000000000",
        ManualValueOracleFactory: "0x0000000000000000000000000000000000000000",
        MapleLiquidityPositionLib: "0x0000000000000000000000000000000000000000",
        MapleLiquidityPositionParser: "0x0000000000000000000000000000000000000000",
        MinAssetBalancesPostRedemptionPolicy: "0x0000000000000000000000000000000000000000",
        MinMaxInvestmentPolicy: "0x0000000000000000000000000000000000000000",
        MinSharesSupplyFee: "0x0000000000000000000000000000000000000000",
        MorphoBluePositionLib: "0x0000000000000000000000000000000000000000",
        MorphoBluePositionParser: "0x0000000000000000000000000000000000000000",
        NoDepegOnRedeemSharesForSpecificAssetsPolicy: "0x0000000000000000000000000000000000000000",
        NotionalV2PositionLib: "0x0000000000000000000000000000000000000000",
        NotionalV2PositionParser: "0x0000000000000000000000000000000000000000",
        OneInchV5Adapter: "0x0000000000000000000000000000000000000000",
        OnlyRemoveDustExternalPositionPolicy: "0x0000000000000000000000000000000000000000",
        OnlyUntrackDustOrPricelessAssetsPolicy: "0x0000000000000000000000000000000000000000",
        ParaSwapV5Adapter: "0x0000000000000000000000000000000000000000",
        PeggedDerivativesPriceFeed: "0x0000000000000000000000000000000000000000",
        PerformanceFee: "0x0000000000000000000000000000000000000000",
        PendleV2Adapter: "0x0000000000000000000000000000000000000000",
        PendleV2PositionLib: "0x0000000000000000000000000000000000000000",
        PendleV2PositionParser: "0x0000000000000000000000000000000000000000",
        PendleMarketsRegistry: "0x0000000000000000000000000000000000000000",
        PolicyManager: "0x0000000000000000000000000000000000000000",
        PoolTogetherV4Adapter: "0x0000000000000000000000000000000000000000",
        PoolTogetherV4PriceFeed: "0x0000000000000000000000000000000000000000",
        ProtocolFeeReserveLib: "0x0000000000000000000000000000000000000000",
        ProtocolFeeReserveProxy: "0x0000000000000000000000000000000000000000",
        ProtocolFeeTracker: "0x0000000000000000000000000000000000000000",
        SharePriceThrottledAssetManagerFactory: "0x0000000000000000000000000000000000000000",
        SharePriceThrottledAssetManagerLib: "0x0000000000000000000000000000000000000000",
        SharesSplitterFactory: "0x0000000000000000000000000000000000000000",
        SingleAssetRedemptionQueueFactory: "0x0000000000000000000000000000000000000000",
        SingleAssetRedemptionQueueLib: "0x0000000000000000000000000000000000000000",
        SolvV2BondBuyerPositionLib: "0x0000000000000000000000000000000000000000",
        SolvV2BondBuyerPositionParser: "0x0000000000000000000000000000000000000000",
        SolvV2BondIssuerPositionLib: "0x0000000000000000000000000000000000000000",
        SolvV2BondIssuerPositionParser: "0x0000000000000000000000000000000000000000",
        StaderStakingAdapter: "0x0000000000000000000000000000000000000000",
        StaderSDPriceFeed: "0x0000000000000000000000000000000000000000",
        StakeWiseV3StakingPositionLib: "0x0000000000000000000000000000000000000000",
        StakeWiseV3StakingPositionParser: "0x0000000000000000000000000000000000000000",
        SwellStakingAdapter: "0x0000000000000000000000000000000000000000",
        SynthetixAdapter: "0x0000000000000000000000000000000000000000",
        TermFinanceV1LendingPositionLib: "0x0000000000000000000000000000000000000000",
        TermFinanceV1LendingPositionParser: "0x0000000000000000000000000000000000000000",
        TheGraphDelegationPositionLib: "0x0000000000000000000000000000000000000000",
        TheGraphDelegationPositionParser: "0x0000000000000000000000000000000000000000",
        ThreeOneThirdAdapter: "0x0000000000000000000000000000000000000000",
        TransferAssetsAdapter: "0x0000000000000000000000000000000000000000",
        UintListRegistry: "0x0000000000000000000000000000000000000000",
        UniswapV2ExchangeAdapter: "0x0000000000000000000000000000000000000000",
        UniswapV2LiquidityAdapter: "0x0000000000000000000000000000000000000000",
        UniswapV2PoolPriceFeed: "0x0000000000000000000000000000000000000000",
        UniswapV3Adapter: "0x0000000000000000000000000000000000000000",
        UniswapV3LiquidityPositionLib: "0x0000000000000000000000000000000000000000",
        UniswapV3LiquidityPositionParser: "0x0000000000000000000000000000000000000000",
        UnpermissionedActionsWrapper: "0x0000000000000000000000000000000000000000",
        UsdEthSimulatedAggregator: "0x0000000000000000000000000000000000000000",
        ValueInterpreter: "0x0000000000000000000000000000000000000000",
        VaultLib: "0x0000000000000000000000000000000000000000",
        WstethPriceFeed: "0x0000000000000000000000000000000000000000",
        YearnVaultV2Adapter: "0x0000000000000000000000000000000000000000",
        YearnVaultV2PriceFeed: "0x0000000000000000000000000000000000000000",
        ZeroExV2Adapter: "0x0000000000000000000000000000000000000000",
        ZeroExV4Adapter: "0x0000000000000000000000000000000000000000",
        ZeroExV4AdapterPmm2Kyc: "0x0000000000000000000000000000000000000000",
      },
      inception: 22694485,
      network: Network.BASE,
      slug: `${Deployment.BASE}.${Version.SULU}`,
      status: Status.LIVE,
      version: Version.SULU,
    },
  },
  slug: Deployment.BASE,
  subgraphs: {
    assets: { slug: "asset-universe-base", id: "" },
    balances: { slug: "vault-balances-base", id: "" },
    core: {
      slug: "enzyme-core-base",
      id: "",
      devVersion: "version/latest",
    },
    shares: { slug: "vault-shares-base", id: "" },
    vaults: { slug: "vault-lineage-base", id: "" },
  },
});
