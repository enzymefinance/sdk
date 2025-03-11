import assets from "../assets/polygon.js";
import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, Kind, Status, defineDeployment } from "../releases.js";
import polygonDeployment from "./polygon.js";

export default defineDeployment<Deployment.TESTNET>({
  address: "0xd77231f355c6790441c1fb95a2e2ef916d5b3d84",
  assets,
  externalContracts: polygonDeployment.externalContracts,
  inception: 25731749,
  kind: Kind.TEST,
  knownAddressLists: {
    noSlippageAdapters: 1n,
    adapters: 2n,
    fees: 3n,
    policies: 4n,
    nonStandardPriceFeedAssets: 128n,
    aTokens: 115n,
    depositWrapperAllowedExchanges: 125n,
  },
  knownUintLists: {},
  label: "Testnet",
  namedTokens: polygonDeployment.namedTokens,
  network: Network.POLYGON,
  releases: {
    [Version.SULU]: {
      address: "0x4bc71568feb39e38734db97113752a4e5657d319",
      contracts: {
        AaveDebtPositionLib: "0xb9ea765ed3443712f238520b0384c4beb4aeb8c2",
        AaveDebtPositionParser: "0x1191ad9888e895bc543e97b40ad6748f86a11a89",
        AavePriceFeed: "0xce08ed41e04bbd5906acaa3773f9ba03fa34146f",
        AaveV2Adapter: "0x0000000000000000000000000000000000000000",
        AaveV2ATokenListOwner: "0x0000000000000000000000000000000000000000",
        AaveV3Adapter: "0xd20f64252f984fa8560ecb5619cb86412178d336",
        AaveV3ATokenListOwner: "0x0000000000000000000000000000000000000000",
        AaveV3DebtPositionLib: "0x42ab51b812ef040bbf7c42eebe8108b89921ae0f",
        AaveV3DebtPositionParser: "0xfb80eaecc49eae3afcef2f8687988d8f1904637e",
        AaveV3FlashLoanAssetManagerFactory: "0x0000000000000000000000000000000000000000",
        AaveV3FlashLoanAssetManagerLib: "0x0000000000000000000000000000000000000000",
        AddressListRegistry: "0x477a4e56eabc94a871744d4f1d59e045fd53c1ef",
        AlicePositionLib: "0x0000000000000000000000000000000000000000",
        AlicePositionParser: "0x0000000000000000000000000000000000000000",
        AllowedAdapterIncomingAssetsPolicy: "0x390be32d5864fda0295d0e5f413d411eabd7c4ce",
        AllowedAdaptersPerManagerPolicy: "0xd63909b856ab759aff30eb52651e366d2625d1de",
        AllowedAdaptersPolicy: "0x35cf5a1fe0254f863c9f6c0cd5c2128ee61baf58",
        AllowedAssetsForRedemptionPolicy: "0x2be12155dfbe1bb92f314d0b9759bb127febde65",
        AllowedDepositRecipientsPolicy: "0x7656970e350e79ce550dd3051d4014373371df53",
        AllowedExternalPositionTypesPerManagerPolicy: "0x3291b7c08b2ac90d547e4cef11103f770f14b390",
        AllowedExternalPositionTypesPolicy: "0x2cb6b222e17167629f75de39dd13c0ba6d58f0cf",
        AllowedRedeemersForSpecificAssetsPolicy: "0xb4343ac6c53cba47aef22470c351f92e89bf7170",
        AllowedSharesTransferRecipientsPolicy: "0x0acfeb85b8dc2db3aa34f93151b7a494b84a99bc",
        ArbitraryLoanPositionLib: "0x8f3f038581e7e03518c078d964674b23b590f521",
        ArbitraryLoanPositionParser: "0xdd8c63313b9f0a8618a6cf557636c1e6c787a9fd",
        ArbitraryLoanTotalNominalDeltaOracleModule: "0xb0c636423757684f3ac92688274928b226a07eed",
        ArrakisV2Adapter: "0x1f4658d8d09a73a74cab97725a0144fcac47ce57",
        ArrakisV2PriceFeed: "0x86a7ecf8328dedc954714042ae67e50fb3bb3822",
        AssetValueCalculator: "0xbdfd3bb2c61aa0ea087d80f574166bec21fe3744",
        BalancerV2GaugeTokenPriceFeed: "0x7915090595c4321ea6f8acffb1bc0eeddda15ba3",
        BalancerV2LiquidityAdapter: "0x8ffe411488c2d2c55acbea7d1feab7beb5881605",
        BalancerV2StablePoolPriceFeed: "0xbbd3cc67c7f90f3fa546c62d13db59e3fd11eb36",
        BalancerV2WeightedPoolPriceFeed: "0xfd63783414032e146842e191d2568329a91b3aae",
        ChainlinkLikeWstethPriceFeed: "0x0000000000000000000000000000000000000000",
        ChainlinkLikeYnEthPriceFeed: "0x0000000000000000000000000000000000000000",
        CompoundAdapter: "0x0000000000000000000000000000000000000000",
        CompoundDebtPositionLib: "0x0000000000000000000000000000000000000000",
        CompoundDebtPositionParser: "0x0000000000000000000000000000000000000000",
        CompoundPriceFeed: "0x0000000000000000000000000000000000000000",
        CompoundV3TokenListOwner: "0xca64c1d5e337f18e9d270225aa5004be5a8e570c",
        CompoundV3Adapter: "0xaa1cb33f9659ff7cb1876eba57ee6ae5ea053e99",
        ComptrollerLib: "0x1c3279e12f94943bf3021029cbcd0287b4c89135",
        ConvertedQuoteAggregatorFactory: "0x0000000000000000000000000000000000000000",
        ConvexVotingPositionLib: "0x0000000000000000000000000000000000000000",
        ConvexVotingPositionParser: "0x0000000000000000000000000000000000000000",
        CumulativeSlippageTolerancePolicy: "0x561176cd43b958482d33dcd62a1eb437bd7bfef9",
        CurveExchangeAdapter: "0x174cbc353607c2ec9d8829d26e9e1ed7bf7de2e9",
        CurveLiquidityAaveAdapter: "0x0000000000000000000000000000000000000000",
        CurveLiquidityAdapter: "0x278c870e693a06bf55eb518a5546d615af0e0ff3",
        CurveLiquiditySethAdapter: "0x0000000000000000000000000000000000000000",
        CurveLiquidityStethAdapter: "0x0000000000000000000000000000000000000000",
        CurvePriceFeed: "0x5876b6044d8aea8a5e59e4feb00d50f9c8b0c8f2",
        DepositWrapper: "0x0043bd9b82095724ec613136083e093436dc0649",
        DisallowedAdapterIncomingAssetsPolicy: "0xb496d3453a07801248d7b4339e09546ac13eb141",
        Dispatcher: "0xd77231f355c6790441c1fb95a2e2ef916d5b3d84",
        EntranceRateBurnFee: "0x722e252e5140a46530cc3f4534eb1561851b8b57",
        EntranceRateDirectFee: "0xc1755fb4b9157186aecf0775c4f6c3a0dd0ea7af",
        ERC4626Adapter: "0x0000000000000000000000000000000000000000",
        ERC4626PriceFeed: "0x0000000000000000000000000000000000000000",
        EtherFiEthPriceFeed: "0x0000000000000000000000000000000000000000",
        ExitRateBurnFee: "0x00ded19f9f8e512dc8041f5b52b20d53ebdb69f8",
        ExitRateDirectFee: "0xaed3e269898de65715f71d88f7dcb7986d3f31b0",
        ExternalPositionFactory: "0x30ca263f9a3780c70530ffaf0ccc162ae3eba993",
        ExternalPositionManager: "0x370826fa91762609964723962187efba705c1f17",
        FeeManager: "0x22d1c7aabd397b4715afa64ff89bc225650787ba",
        FiduPriceFeed: "0x0000000000000000000000000000000000000000",
        FundDataProviderRouter: "0xad2ee0cd4820f62cd78121a22c582c56804740d9",
        FundDeployer: "0x4bc71568feb39e38734db97113752a4e5657d319",
        FundValueCalculator: "0x36d55c3c1c57a88efda07df425d10ff267f3f9d1",
        FundValueCalculatorRouter: "0xb9c46d50d25808014b9371a91f44e602ecda7f0f",
        GasRelayPaymasterFactory: "0xedabd8516499b4c0141057b19acca9d1df055323",
        GasRelayPaymasterLib: "0x900851aecffbb7440745724a8e37c7a7ae67ddf2",
        GatedRedemptionQueueSharesWrapperFactory: "0xd188ab263828d0bece1442da7dee7e0ae76f709c",
        GatedRedemptionQueueSharesWrapperLib: "0x33d092cf2859989d6dc52eab8ab7962b5486eab5",
        GenericAdapter: "0xd8d52afef3e073f6378b89885a1b15e36e1fb5e5",
        GlobalConfigLib: "0xa2669671b9de8acb4032f5e40d0240e4599e7a2d",
        GlobalConfigProxy: "0x864371e0ea7543e0b76f847a29f48dc77416f09b",
        GMXV2LeverageTradingPositionLib: "0x0000000000000000000000000000000000000000",
        GMXV2LeverageTradingPositionParser: "0x0000000000000000000000000000000000000000",
        IntegrationManager: "0xad31aaeffd50430b80386263aeb477b9e607b0d1",
        KilnStakingPositionLib: "0x0000000000000000000000000000000000000000",
        KilnStakingPositionParser: "0x0000000000000000000000000000000000000000",
        LidoWithdrawalsPositionLib: "0x0000000000000000000000000000000000000000",
        LidoWithdrawalsPositionParser: "0x0000000000000000000000000000000000000000",
        LiquityDebtPositionLib: "0x0000000000000000000000000000000000000000",
        LiquityDebtPositionParser: "0x0000000000000000000000000000000000000000",
        ManagementFee: "0x4a95185896adce31a8cdfaaa2832decc3d20dc2c",
        ManualValueOracleFactory: "0x0b7fa18e37e9bd2e156cac8467d164261f5119cc",
        MapleLiquidityPositionLib: "0x0000000000000000000000000000000000000000",
        MapleLiquidityPositionParser: "0x0000000000000000000000000000000000000000",
        MinAssetBalancesPostRedemptionPolicy: "0x7800955aae98c31e4eac22c1b4e7edd6ad0c3ba0",
        MinMaxInvestmentPolicy: "0xd2dbb1d5222200b94f4aea2618d88cc33146987b",
        MinSharesSupplyFee: "0x8a2cfb231be7c229209dc41e62def7756a6088a2",
        MorphoBluePositionLib: "0x0000000000000000000000000000000000000000",
        MorphoBluePositionParser: "0x0000000000000000000000000000000000000000",
        MysoV3PositionLib: "0x0000000000000000000000000000000000000000",
        MysoV3PositionParser: "0x0000000000000000000000000000000000000000",
        NoDepegOnRedeemSharesForSpecificAssetsPolicy: "0x91cf2e3a615428f1f14fa3240b8dd52a2bdae649",
        NotionalV2PositionLib: "0x0000000000000000000000000000000000000000",
        NotionalV2PositionParser: "0x0000000000000000000000000000000000000000",
        OneInchV5Adapter: "0xb474bd1b1f2fa3a0c0a815d63839d065af98fb12",
        OnlyRemoveDustExternalPositionPolicy: "0x713e7dac3c237b71dd54a8718ce21ecd5d2dc747",
        OnlyUntrackDustOrPricelessAssetsPolicy: "0xc1f7b231874e2f9b2c9d4ec701dc6f046eab253a",
        ParaSwapV5Adapter: "0xb663c344ce8f66f906dd1bb7f1e269ed352deea9",
        PeggedDerivativesPriceFeed: "0xad80a1c732e3e3b979c64e1df6815f739d3317f7",
        PerformanceFee: "0xf1fcba510713355d7504b87a163420a2bd116a4b",
        PendleV2Adapter: "0x0000000000000000000000000000000000000000",
        PendleV2PositionLib: "0x0000000000000000000000000000000000000000",
        PendleV2PositionParser: "0x0000000000000000000000000000000000000000",
        PendleMarketsRegistry: "0x0000000000000000000000000000000000000000",
        PolicyManager: "0xbec6c9e0f2aa62413144b37095faf60656b26007",
        PoolTogetherV4Adapter: "0x0ed3e9c0a16cfafdc4e06a07576302b39249116d",
        PoolTogetherV4PriceFeed: "0x64b466b2630249a926d72bbb2d64b33bbbec155d",
        ProtocolFeeReserveLib: "0xd7ada00e0d9d05436c9c271fdc7c9e398ed678dc",
        ProtocolFeeReserveProxy: "0x9b3011a1152139555fb8a560e6582c3367dd93f7",
        ProtocolFeeTracker: "0xa77585469f71499b0f2784c5151aaa919fdfffca",
        SharePriceThrottledAssetManagerFactory: "0x0000000000000000000000000000000000000000",
        SharePriceThrottledAssetManagerLib: "0x0000000000000000000000000000000000000000",
        SharesSplitterFactory: "0x7d3a58e675362de47a4f79dd5451074f2ebc8459",
        SingleAssetRedemptionQueueFactory: "0xad1980b3301557eae118275e79c2554cb6efbd5a",
        SingleAssetRedemptionQueueLib: "0x78c357627c65c336a64abefa062a0b19ba6fa6f4",
        SolvV2BondBuyerPositionLib: "0x0000000000000000000000000000000000000000",
        SolvV2BondBuyerPositionParser: "0x0000000000000000000000000000000000000000",
        SolvV2BondIssuerPositionLib: "0x0000000000000000000000000000000000000000",
        SolvV2BondIssuerPositionParser: "0x0000000000000000000000000000000000000000",
        StaderSDPriceFeed: "0x0000000000000000000000000000000000000000",
        StaderStakingAdapter: "0x0000000000000000000000000000000000000000",
        StaderWithdrawalsPositionLib: "0x0000000000000000000000000000000000000000",
        StaderWithdrawalsPositionParser: "0x0000000000000000000000000000000000000000",
        StakeWiseV3StakingPositionLib: "0x0000000000000000000000000000000000000000",
        StakeWiseV3StakingPositionParser: "0x0000000000000000000000000000000000000000",
        SwellStakingAdapter: "0x0000000000000000000000000000000000000000",
        SynthetixAdapter: "0x0000000000000000000000000000000000000000",
        TermFinanceV1LendingPositionLib: "0x0000000000000000000000000000000000000000",
        TermFinanceV1LendingPositionParser: "0x0000000000000000000000000000000000000000",
        TheGraphDelegationPositionLib: "0x0000000000000000000000000000000000000000",
        TheGraphDelegationPositionParser: "0x0000000000000000000000000000000000000000",
        ThreeOneThirdAdapter: "0x0c4dc97e6c0d94327f3ca1873ae5868f5d0a6f05",
        TransferAssetsAdapter: "0x0000000000000000000000000000000000000000",
        UintListRegistry: "0xe296ea33a38108580dcae364239fb0c50c53591b",
        UniswapV2ExchangeAdapter: "0x0000000000000000000000000000000000000000",
        UniswapV2LiquidityAdapter: "0x0000000000000000000000000000000000000000",
        UniswapV2PoolPriceFeed: "0x0000000000000000000000000000000000000000",
        UniswapV3Adapter: "0x502631cfca0261f57243ef07a03aed6815ddb88d",
        UniswapV3LiquidityPositionLib: "0x64a498aeda1fe6447082e58eb54cdb784e075c8b",
        UniswapV3LiquidityPositionParser: "0x70cdbb90cc3babd05d02ce649d18d8902d9a28d5",
        UnpermissionedActionsWrapper: "0xb9a1a15357ba60cc1a0ab4c6d4b46f4f40e9d4bc",
        UsdEthSimulatedAggregator: "0x51e75b5e0eef2d40b4d70c5daa2666e1ea30f0bd",
        ValueInterpreter: "0x0777062308749e88113bbfb1317f434f40dbb2d8",
        VaultLib: "0xd785cf317dad803ef4fbda3a95b41f965770dba6",
        WstethPriceFeed: "0x0000000000000000000000000000000000000000",
        YearnVaultV2Adapter: "0x0000000000000000000000000000000000000000",
        YearnVaultV2PriceFeed: "0x0000000000000000000000000000000000000000",
        ZeroExV2Adapter: "0x0000000000000000000000000000000000000000",
        ZeroExV4Adapter: "0x72595b87975b57b518891b9090d97583678011a4",
        ZeroExV4AdapterPmm2Kyc: "0x0000000000000000000000000000000000000000",
        ZeroLendLRTBTCAaveV3Adapter: "0x0000000000000000000000000000000000000000",
        ZeroLendLRTBTCAaveV3ATokenListOwner: "0x0000000000000000000000000000000000000000",
        ZeroLendLRTBTCAaveV3DebtPositionLib: "0x0000000000000000000000000000000000000000",
        ZeroLendLRTBTCAaveV3DebtPositionParser: "0x0000000000000000000000000000000000000000",
        ZeroLendRWAStablecoinsAaveV3Adapter: "0x0000000000000000000000000000000000000000",
        ZeroLendRWAStablecoinsAaveV3ATokenListOwner: "0x0000000000000000000000000000000000000000",
        ZeroLendRWAStablecoinsAaveV3DebtPositionLib: "0x0000000000000000000000000000000000000000",
        ZeroLendRWAStablecoinsAaveV3DebtPositionParser: "0x0000000000000000000000000000000000000000",
      },
      inception: 25731946,
      network: Network.POLYGON,
      slug: `${Deployment.TESTNET}.${Version.SULU}`,
      status: Status.LIVE,
      version: Version.SULU,
    },
  },
  slug: Deployment.TESTNET,
  subgraphs: {
    assets: {
      slug: "asset-universe-testnet",
      id: "H7KYtV4eVas2Py83UE1596DPkQNRRNGiPqSbN1AbKMaX",
    },
    balances: {
      slug: "vault-balances-testnet",
      id: "86aJM6X5DB5vrCVapuFWufVKPBtVYmxygzxsLctRhc3r",
    },
    core: {
      slug: "enzyme-core-testnet",
      id: "98iFcdDw1g5akWxbTFqcs2TsUaJhVDNxPTgH8P2WBUao",
      devVersion: "version/latest",
    },
    shares: {
      slug: "vault-shares-testnet",
      id: "EPZTMtyWpwckXczAry12HddRpssBjKjtrhWB1ZGK9bLt",
    },
    vaults: {
      slug: "vault-lineage-testnet",
      id: "BPhRz8C6rUcb3PXWpWFYCH2zjudLg76HjAeDtcNEWCNV",
    },
  },
});
