import assets from "../assets/ethereum.js";
import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, Kind, Status, defineDeployment } from "../releases.js";

export default defineDeployment<Deployment.ETHEREUM>({
  address: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
  assets,
  externalContracts: {
    aaveUIIncentiveDataProvider: "0x5a40cde2b76da2bed545efb3ae15708ee56aaf9c",
    aaveV2IncentivesController: "0xd784927ff2f95ba542bfc824c8a8a98f3495f6b5",
    aaveV2LendingPoolProvider: "0xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
    aaveV3LendingPoolProvider: "0x2f39d218133afab8f2b819b1066c7e434ad94e9e",
    aaveV3ProtocolDataProvider: "0x41393e5e337606dc3821075af65aee84d7688cbd",
    aaveV3RewardsController: "0x8164cc65827dcfe994ab23944cbc90e0aa80bfcb",
    aliceOrderManager: "0x841473a19279e54a850e9083a3a57de9e6244d2e",
    arrakisV2Helper: "0x89e4be1f999e3a58d16096fbe405fc2a1d7f07d6",
    arrakisV2Resolver: "0x535c5fdf31477f799366df6e4899a12a801cc7b8",
    balancerGaugeController: "0xc128468b7ce63ea702c1f104d55a2566b13d3abd",
    balancerHelpers: "0x5addcca35b7a0d07c74063c48700c8590e87864e",
    balancerMinter: "0x239e55f427d44c3cc793f49bfb507ebe76638a2b",
    balancerProtocolFeesCollector: "0xce88686553686da562ce7cea497ce749da109f9f",
    balancerVault: "0xba12222222228d8ba445958a75a0704d566bf2c8",
    chainlinkFeedsRegistry: "0x47fb2585d2c56fe188d0e6ec628a38b74fceeedf",
    compoundComptroller: "0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b",
    compoundV3Rewards: "0x1b0e765f6224c21223aea2af16c1c46e38885a40",
    curveChildLiquidityGaugeFactory: "0x0000000000000000000000000000000000000000",
    curveMinter: "0xd061d61a4d941c39e5453435b6345dc261c2fce0",
    curveRegistry: "0x0000000022d53366457f9d5e68ec105046fc4383",
    cvxCrvStaking: "0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e",
    gmxV2ChainlinkPriceFeed: "0x0000000000000000000000000000000000000000",
    gmxV2DataStore: "0x0000000000000000000000000000000000000000",
    gmxV2ExchangeRouter: "0x0000000000000000000000000000000000000000",
    gmxV2Reader: "0x0000000000000000000000000000000000000000",
    gmxV2ReferralStorage: "0x0000000000000000000000000000000000000000",
    kilnStaking: "0x0816df553a89c4bff7ebfd778a9706a989dd3ce3",
    lidoWithdrawalsQueue: "0x889edc2edab5f40e902b864ad4d7ade8e412f9b1",
    lmaxMarketMaker: "0x732e4f0cc80b61175f88c6f567088b2224bd7a24",
    makerMCDPotAddress: "0x197e90f9fad81970ba7976f33cbd77088e5d7cf7",
    merklDistributor: "0x3ef3d8ba38ebe18db133cec108f4d14ce00dd9ae",
    morphoBlue: "0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb",
    mysoV3Router: "0xe442b5a7746c0dfb3e57de62ccb5f2bc4f7caa72",
    multicall: "0xca11bde05977b3631167028862be2a173976ca11",
    paraswapV5AugustusSwapper: "0xdef171fe48cf0115b1d80b88dc8eab59176fee57",
    paraswapV5TokenTransferProxy: "0x216b4b4ba9f3e719726886d34a177484278bfcae",
    paraswapV6AugustusSwapper: "0x6a000f20005980200259b80c5102003040001068",
    pendlePtLpOracle: "0x66a1096c6366b2529274df4f5d8247827fe4cea8",
    staderStakingPoolManager: "0xcf5ea1b38380f6af39068375516daf40ed70d299",
    staderUserWithdrawManager: "0x9f0491b32dbce587c50c4c43ab303b06478193a7",
    stakeWiseV3KeeperRewards: "0x6b5815467da09daa7dc83db21c9239d98bb487b5",
    theGraphDelegationStakingProxy: "0xf55041e37e12cd407ad00ce2910b8269b01263b9",
    theGraphEpochManagerProxy: "0x64f990bf16552a693dcb043bb7bf3866c5e05ddb",
    uniswapV3NonFungiblePositionManager: "0xc36442b4a4522e871399cd717abdd847ab11fe88",
    voteLockedConvexToken: "0x72a19342e8f1838460ebfccef09f6585e32db86e",
    votiumVoteProxy: "0xde1e6a7ed0ad3f61d531a8a78e83ccddbd6e0c49",
    zeroExExchangeProxy: "0x95e6f48254609a6ee006f7d493c8e5fb97094cef",
    zeroExV4Exchange: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    zeroLendAaveV3UIIncentiveDataProvider: "0x0a1198ddb5247a283f76077bb1e45e5858ee100b",
    zeroLendLRTBTCAaveV3LendingPoolProvider: "0x17878afdd5772f4ec93c265ac7ad8e2b29abb857",
    zeroLendLRTBTCAaveV3ProtocolDataProvider: "0x31063f7ca8ef4089db0dedf8d6e35690b468a611",
    zeroLendLRTBTCAaveV3RewardsController: "0x938e23c10c501ce5d42bc516ecfdf5abd9c51d2b",
    zeroLendRWAStablecoinsAaveV3LendingPoolProvider: "0xe3c3c5ead58fc2bed4e577e38985b8f7f1ddff00",
    zeroLendRWAStablecoinsAaveV3ProtocolDataProvider: "0x298ecdcb0369aef75cbbda3e46a224cfe622e287",
    zeroLendRWAStablecoinsAaveV3RewardsController: "0xbc2fdc58e3e06d265b46e32771442b7f5098725b",
  },
  inception: 11636493,
  kind: Kind.LIVE,
  knownAddressLists: {
    noSlippageAdapters: 1n,
    adapters: 2n,
    fees: 3n,
    policies: 4n,
    kilnStakingContracts: 400n,
    nonStandardPriceFeedAssets: 650n,
    aTokens: 463n,
    zeroLendRWAStablecoinsATokens: 737n,
    zeroLendLRTBTCATokens: 738n,
    depositWrapperAllowedExchanges: 553n,
    gsnTrustedForwarders: 598n,
  },
  knownUintLists: {
    allowedMorphoBlueVaults: 3n,
  },
  label: "Ethereum",
  namedTokens: {
    aave: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    bal: "0xba100000625a3754423978a60c9317c58a424e3d",
    ceth: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
    comp: "0xc00e94cb662c3520282e6f5717214004a7f26888",
    crv: "0xd533a949740bb3306d119cc777fa900ba034cd52",
    cvx: "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
    dai: "0x6b175474e89094c44da98b954eedeac495271d0f",
    diva: "0xbfabde619ed5c4311811cf422562709710db587d",
    ethx: "0xa35b1b31ce002fbf2058d22f30f95d405200a15b",
    grt: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
    idle: "0x875773784af8135ea0ef43b5a374aad105c5d39e",
    lusd: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
    mln: "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
    mpl: "0x33349b282065b0284d756f0577fb39c158f935e6",
    paxg: "0x45804880de22913dafe09f4980848ece6ecbaf78",
    ptkn_mln: "0x4c0d9e35ad2c952bcd58a6d255c9dc2784ac6f08",
    sthoundeth: "0xdfe66b14d37c77f4e9b180ceb433d1b164f0281d",
    stkaave: "0x4da27a545c0c5b758a6ba100e3a049001de870f5",
    steth: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    stusd: "0x0022228a2cc5e7ef0274a7baa600d44da5ab5776",
    sweth: "0xf951e335afb289353dc249e82926178eac7ded78",
    uni: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    usda: "0x0000206329b97db379d5e1bf586bbdb969c63274",
    usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    usdt: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  network: Network.ETHEREUM,
  releases: {
    [Version.SULU]: {
      address: "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360",
      contracts: {
        AaveDebtPositionLib: "0xb3402eb0d45c63594699df3e5cac9116ccfc5ef3",
        AaveDebtPositionParser: "0xf6d47bdee7760067557b047ce4adcba819d7d5a8",
        AavePriceFeed: "0xe9cfe0f99b8a01fd80f110da4d8f08f6bf3dd6a6",
        AaveV2Adapter: "0xece6b376af7c9273cebaf6528565c47ea2cb8a4c",
        AaveV2ATokenListOwner: "0x26cd328f2bdfe13a99b7e2fc19bbdcb4d8b54d69",
        AaveV3Adapter: "0x9cfb64d91ce4eb821ff8edc1c2fda2e89e256707",
        AaveV3ATokenListOwner: "0xcfe249a7ae4619980eea1a2d83a26a5e7281ebb0",
        AaveV3DebtPositionLib: "0x16494e554e275b5d3248ee7f994cf52ed969beea",
        AaveV3DebtPositionParser: "0x40108b712f0d8051ac5af7f155e63de73f5fdd27",
        AaveV3FlashLoanAssetManagerFactory: "0xd6e8b30214ef909421eb1d20e5b281777810004a",
        AaveV3FlashLoanAssetManagerLib: "0x8aa6f11fef40eb24c2f77de538f40ac8a9ec9f0d",
        AddressListRegistry: "0x4eb4c7babfb5d54ab4857265b482fb6512d22dff",
        AlicePositionLib: "0xe57c868f97e8c1deaf24dc72b89d886ebfa24d9f",
        AlicePositionParser: "0xff60eb4b559d63beba1738281b63704266c6dac0",
        AllowedAdapterIncomingAssetsPolicy: "0x2f0e55830a173d845a886fd574f01a039a07fc37",
        AllowedAdaptersPerManagerPolicy: "0xa4507d51c5270ff91229b76300ff90774384d144",
        AllowedAdaptersPolicy: "0x720ef97bf835699fcf07591952cd2b132d63a6c0",
        AllowedAssetsForRedemptionPolicy: "0x823ca839da344da59d517b84ce3bab9ffc9f54ee",
        AllowedDepositRecipientsPolicy: "0xa66baaa0ccb6468c5a2cb61f5d672c7ba0440ee1",
        AllowedExternalPositionTypesPerManagerPolicy: "0x47fb78995d945d501f6f9bad343d7ce7d3db54ab",
        AllowedExternalPositionTypesPolicy: "0x9e076e7d35a3b881ab9e3da958431630fdfa756f",
        AllowedRedeemersForSpecificAssetsPolicy: "0xed4aa74490843e7ad64b445ef18cece8a0562433",
        AllowedSharesTransferRecipientsPolicy: "0xebe37e43bc6b3aacfe318d6906fc80c4a2a7505a",
        ArbitraryLoanPositionLib: "0x73cb96137cb5455e77275a6ab3411d0d52d545a9",
        ArbitraryLoanPositionParser: "0xe959c0eef487f7ee098ad10998d9dfcf4fa1d1af",
        ArbitraryLoanTotalNominalDeltaOracleModule: "0x7f2a48122bbd3ffba33ed9d1f5cfabede7caab34",
        ArrakisV2Adapter: "0xc6e54fb0f526d3516224a5e09bd435323800ad94",
        ArrakisV2PriceFeed: "0xfff8d5c955d9d71f3a09e166521e12e28d3042c7",
        AssetValueCalculator: "0xfa3d84d841c55bb9175b0a6f215e2300c40cc5ab",
        BalancerV2GaugeTokenPriceFeed: "0x312ce4bde393ff246b27c890b97ade37fedaa348",
        BalancerV2LiquidityAdapter: "0xab5da4aa08b56c7e5a9d5d8a5ff19cf09a88c305",
        BalancerV2StablePoolPriceFeed: "0x438254d66e2bc576819a76a0ecb11fe41195d39f",
        BalancerV2WeightedPoolPriceFeed: "0x083b8f465bba2bb274e48387e3f9c56323341286",
        ChainlinkLikeWstethPriceFeed: "0x92829c41115311ca43d5c9f722f0e9e7b9fcd30a",
        ChainlinkLikeYnEthPriceFeed: "0xa8f6033ce40fab29c228f32ef44d38cb3043c5bc",
        CompoundAdapter: "0x6ce8095a692aff6698c3aa8593be3976b6b8743d",
        CompoundDebtPositionLib: "0xc8e0c169dae4cdfd2f51e7494d2b5459f9314ee9",
        CompoundDebtPositionParser: "0x8bfbd013020c4d26d043183eff600ea3b36b4afb",
        CompoundPriceFeed: "0x6254e0538abbb668eac89d5e5bee27a9d0e62bbe",
        CompoundV3TokenListOwner: "0xa9e085b1ca8ecd1dd5bf4c1b5fed3be84c341fd4",
        CompoundV3Adapter: "0xfaa9b9cc98503f51a54f6038dfdd0e43aa0ac98e",
        ComptrollerLib: "0x03f7f3b8da875881206655d8099b9dacf721f1ef",
        ConvertedQuoteAggregatorFactory: "0x8f1e6f61323bf64a47ffbfca99e9e2bd4f982c07",
        ConvexVotingPositionLib: "0x12fa6805a1ff2d21318dcbcf677712bde8a033e1",
        ConvexVotingPositionParser: "0x4619b0394f09ef964407dedce4ca19ad012bca20",
        CumulativeSlippageTolerancePolicy: "0x3a49d5aec385ac1bde99f305316b945c5ee71312",
        CurveExchangeAdapter: "0xc9c14a99ccf467ea1ff2e19584a5faba3671b8de",
        CurveLiquidityAaveAdapter: "0x83e249d603459d2a926ee85d8ba8d0aeabe101f2",
        CurveLiquidityAdapter: "0xea0a896dde31cfcb53a96ac767119b69d7b4f633",
        CurveLiquiditySethAdapter: "0x87db8e815f9bde3b5b686e3e892faf0e86481c44",
        CurveLiquidityStethAdapter: "0x1453e5a5c029cdd91f584c603818baf2ab4ce663",
        CurvePriceFeed: "0x7e6130e497035a34a08e0f18b7a9b0fa06ed013e",
        DepositWrapper: "0x65bbad6545b7ac9c30fb0f07e64e25106bf05eec",
        DisallowedAdapterIncomingAssetsPolicy: "0x5e216f370e3555feb9a0575a57ada732a9e50386",
        Dispatcher: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
        EntranceRateBurnFee: "0xcdec5bbecc6d2c004d5378a63a3c484c2643ed9d",
        EntranceRateDirectFee: "0xfb8df7d5e320020cd8047226b81cf6d68f3e3c19",
        EnzymeV4VaultAdapter: "0x2b4fdcba08e5961c6a129b9fe13ecd10cdc249ce",
        EnzymeVaultPriceFeed: "0x2a07500d96f324d615bd545b921faefdd97c5ad3",
        ERC4626Adapter: "0x64fa106dd89f21d6e687eebe9384637f7d54f707",
        ERC4626PriceFeed: "0x66aa5b2fdfb453f8a27f9bd1d9124947ef3886bb",
        ERC4626RateAggregatorFactory: "0x00f64bd22a69f429632e1469c9c812e9f70e4f11",
        EtherFiEthPriceFeed: "0x31103db5639ad1d5351b83409fdf7e575e26774b",
        ExitRateBurnFee: "0x06b13918e988d1314da1a9da4c0cde5fe994364a",
        ExitRateDirectFee: "0x3a09d11c20aa1ad38c77b4f426901d3427f73fbe",
        ExternalPositionFactory: "0x0aacb782205dde9eff4862ace9849dce1ca3409f",
        ExternalPositionManager: "0x1e3da40f999cf47091f869ebac477d84b0827cf4",
        FeeManager: "0xaf0dffac1ce85c3fce4c2bf50073251f615eefc4",
        FiduPriceFeed: "0x478335491e1fb798c64a9e95ca43d3d967f42486",
        FundDataProviderRouter: "0xbfa57f99e059301d8bd3bbf0ae39ee87d9919734",
        FundDeployer: "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360",
        FundValueCalculator: "0x490e64e0690b4aa481fb02255aed3d052bad7bf1",
        FundValueCalculatorRouter: "0x7c728cd0cfa92401e01a4849a01b57ee53f5b2b9",
        GasRelayPaymasterFactory: "0x846bbe1925047023651de7ec289f329c24ded3a8",
        GasRelayPaymasterLib: "0x131c220c18874e32abbe945eb8aa998b84f63625",
        GatedRedemptionQueueSharesWrapperFactory: "0x73b9c40530311b49b526f230d01bdf5725b3290d",
        GatedRedemptionQueueSharesWrapperLib: "0xe971375e3e8af54232f9b7c88cce143edf95c272",
        GenericAdapter: "0x0000000000000000000000000000000000000000",
        GlobalConfigLib: "0x6682e70860d48a039f52daccda917250349a3fb3",
        GlobalConfigProxy: "0x5611df74a77efd198de5fc7f83a482dcfe0c7a7a",
        GMXV2LeverageTradingPositionLib: "0x0000000000000000000000000000000000000000",
        GMXV2LeverageTradingPositionParser: "0x0000000000000000000000000000000000000000",
        IntegrationManager: "0x31329024f1a3e4a4b3336e0b1dfa74cc3fec633e",
        KilnStakingPositionLib: "0x266c98ef7c16c791a27dc60e8877e8e3954090a2",
        KilnStakingPositionParser: "0xfa9a7f8f30c9bc741be5959af8cd48636a6aecc2",
        LidoWithdrawalsPositionLib: "0xa511ecea62f360e983829e408fc753adcadcdeae",
        LidoWithdrawalsPositionParser: "0x501083be98ebb2d75be75459accc5c5922c07f28",
        ManagementFee: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
        ManualValueOracleFactory: "0x0edbb060a8f00f5967eecfc87c8559fa65501a3d",
        MapleLiquidityPositionLib: "0xb35623a479383b87da32fdde8dbe83fac5f6bf3d",
        MapleLiquidityPositionParser: "0x31915278772a2bc68cbfb7effe1209677b0aad10",
        MinAssetBalancesPostRedemptionPolicy: "0x58c0a2a546b3903fa68a53e34ee0c8a02aabfad0",
        MinMaxInvestmentPolicy: "0xebdadfc929c357d12281118828aea556db5be30c",
        MinSharesSupplyFee: "0xbc9da8edde80ffb1294852d23ee1b385ea2d4929",
        MorphoBluePositionLib: "0xd84123f688601133d478949277be8065f48ff810",
        MorphoBluePositionParser: "0xfdf34798b21774523be370490b8730807d4f9167",
        MysoV3OptionWritingPositionLib: "0x0000000000000000000000000000000000000000",
        MysoV3OptionWritingPositionParser: "0x0000000000000000000000000000000000000000",
        NoDepegOnRedeemSharesForSpecificAssetsPolicy: "0x96ef0f7c10505460fa39c57a037a5ec2520b8b25",
        NotionalV2PositionLib: "0x73436d870da10281aa3872b1ec48451e077900de",
        NotionalV2PositionParser: "0x59053fc5ee387321ea4ab415d1160e49e4f5b166",
        OneInchV5Adapter: "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677",
        OnlyRemoveDustExternalPositionPolicy: "0x966ec191ed9e026cb6f7e22bb2a284bad6a2838d",
        OnlyUntrackDustOrPricelessAssetsPolicy: "0x747beaee139fba4a89fa71bebb5f21231530292b",
        ParaSwapV5Adapter: "0x871a7f0ef4917a1534e651d1fde3763a52a23ece",
        ParaSwapV6Adapter: "0xb3ec98d4a608577289e442474832b7f69540e169",
        PeggedDerivativesPriceFeed: "0x86533352bdd201c89f184f7ebbfebea3e31c8bb3",
        PerformanceFee: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
        PeggedRateDeviationAggregatorFactory: "0xd71894348d0b068af066a6f7b093809a8ad10d98",
        PendleV2Adapter: "0xe77ba2e88aae1543839ec6ee0a0f847391205610",
        PendleV2PositionLib: "0x85c474a1dbf7fdc22c592382ad554bb42cebce0b",
        PendleV2PositionParser: "0x559af4e5765d60003e4895d23080c501cbb9ed3c",
        PendleMarketsRegistry: "0x31391adf6402fdd4eb4b57801a612b0987a0b0f2",
        PolicyManager: "0xadf5a8db090627b153ef0c5726ccfdc1c7aed7bd",
        PoolTogetherV4Adapter: "0x0000000000000000000000000000000000000000",
        PoolTogetherV4PriceFeed: "0x0000000000000000000000000000000000000000",
        ProtocolFeeReserveLib: "0xa0ed89af63367ddc8e1dd6b992f20d1214ccb51c",
        ProtocolFeeReserveProxy: "0xb7460593bd222e24a2bf4393aa6416bd373995e0",
        ProtocolFeeTracker: "0xe97980f1d43c4cd4f1eef0277a2dea7ddbc2cd13",
        SharePriceThrottledAssetManagerFactory: "0x0883ba10f44217b97bde11900e197738a7df911b",
        SharePriceThrottledAssetManagerLib: "0xfde8c198bef60d026332a671f64c34d65c60c935",
        SharesSplitterFactory: "0xfc8ed755c52782fa1a4ba9193b566e775701e511",
        SingleAssetDepositQueueFactory: "0xc90d0a2d50bb6e3282d4e54dbd49a6c6034b084e",
        SingleAssetDepositQueueLib: "0x9267feef36484d3cb3a8e7c9cf57da360d85e0ad",
        SingleAssetRedemptionQueueFactory: "0xfe84d5209054254389c9d6a754b821f3a297d56a",
        SingleAssetRedemptionQueueLib: "0x0012b7c26b8c081a29a61cd52526cf6305367968",
        SmarDexUsdnNativeRateUsdAggregator: "0xd5004c5d3017862839e83981b110f27ee7b36eaa",
        SolvBtcYieldTokenRateUsdAggregatorFactory: "0x877f7a1c58ae061cbe6a207fd0379571c45f555a",
        SolvV2BondBuyerPositionLib: "0x0e7d828f9f9a3ce152d39f21f2e2d0ff89448b6b",
        SolvV2BondBuyerPositionParser: "0xa2ed786215d6f4da95338ee7abb84f28134dc19c",
        SolvV2BondIssuerPositionLib: "0x31c30bacb054f5db7f5bc96850b488440abb8991",
        SolvV2BondIssuerPositionParser: "0xc4b599043a5479398eb8af387b1e36d9a924f8c2",
        StaderSDPriceFeed: "0x9938b14a25a4910531d5cbdf3c41510b19aaf016",
        StaderStakingAdapter: "0x7f1b68d5ed183cda6788a66520506eaf3544001c",
        StaderWithdrawalsPositionLib: "0x5cf43f5f8c1648db23948e3814d0099c408201a4",
        StaderWithdrawalsPositionParser: "0xaefe3260dcbcfaa2a4b927a6494057837e6dd902",
        StakeWiseV3StakingPositionLib: "0xef268eb475a096adb95712b05b095acc1fc2d3ae",
        StakeWiseV3StakingPositionParser: "0x642348ee0c28c2943082f950f3a35db07bd4bbdf",
        SwellStakingAdapter: "0x50bae03333dd8495263c9049091a8925063b068e",
        SynthetixAdapter: "0x4baf8282571febdfd8768b475551ec14e144edb3",
        TermFinanceV1LendingPositionLib: "0x2817ab33b56ec310621592bfdbe1fad6470d19a0",
        TermFinanceV1LendingPositionParser: "0xa95c7bab91692df52255b8ad50c5ed2bcc9064ad",
        TheGraphDelegationPositionLib: "0x6fff66d55698a601e91989c44349da8a2a9a7848",
        TheGraphDelegationPositionParser: "0x2226d7687109d6b6a0882f8eef2b4a4c90dc677e",
        ThreeOneThirdAdapter: "0x5a1c0e89133c4cd844a8b345370565f1368a79a8",
        TransferAssetsAdapter: "0xe0309fa2412b811a0bd40a73297093707259217f",
        UintListRegistry: "0x6ffd6fc068e7b365af18da4fdc39d3289159407b",
        UniswapV2ExchangeAdapter: "0x8c36435a653041bfd65515cc82502663c1ce6f0e",
        UniswapV2LiquidityAdapter: "0xf78130afeda6d9df3394b34d36239aec7fae48d9",
        UniswapV2PoolPriceFeed: "0xdbc1162ea1ab770f0ba5fb494e0010e68351e3b0",
        UniswapV3Adapter: "0xed6a08e05cb4260388dc7cc60bc5fefccfab2793",
        UniswapV3LiquidityPositionLib: "0x20a2d4765be139475c34db7b7d856dcf25092c26",
        UniswapV3LiquidityPositionParser: "0x23805fed4b73a7b77c28f2823733736951c49d6c",
        UnpermissionedActionsWrapper: "0xcfab4fcbfe059d5c1840d9dc285a9bfa0f96a118",
        UsdEthSimulatedAggregator: "0x9579f735d0c93b5eef064fe312ca3509bd695206",
        ValueInterpreter: "0xd7b0610db501b15bfb9b7ddad8b3869de262a327",
        VaultLib: "0x891dee0483ebaa922e274ddd2ebbaa2d33468a38",
        WstethPriceFeed: "0x50da4957032c8fc5f94ec8d5ec8bfce84f9c9311",
        YearnVaultV2Adapter: "0x7ea777f9f6ecbf4d03dc5323d3f057b0730fc34a",
        YearnVaultV2PriceFeed: "0x3982e1cc26b99310747df54f445063745c54a324",
        ZeroExV2Adapter: "0xace8e944cda48439e8eeda4027115cfb6d942854",
        ZeroExV4Adapter: "0xe073406c5306043eda44f09c67654a7729277a47",
        ZeroExV4AdapterPmm2Kyc: "0x1376a75316b6ec7bffaa0660f34d852a2c0e307b",
        ZeroLendLRTBTCAaveV3Adapter: "0xbc91fe394d7d372fbae757dbffd32b44a29b3f6e",
        ZeroLendLRTBTCAaveV3ATokenListOwner: "0x7affc39d73cb7d22a7fd099a16441d9eb96ef31b",
        ZeroLendLRTBTCAaveV3DebtPositionLib: "0x1b317a25d2c994a7c51a8999644c3e5c2c43740b",
        ZeroLendLRTBTCAaveV3DebtPositionParser: "0x688f9fc4ce8f76ed53b220e0bb25c672f45d069f",
        ZeroLendRWAStablecoinsAaveV3Adapter: "0x8525b3b6179690b74d7f067f131f780a3ef1562c",
        ZeroLendRWAStablecoinsAaveV3ATokenListOwner: "0x55c3498ee0d5c79b034554f301d8a799bae7d278",
        ZeroLendRWAStablecoinsAaveV3DebtPositionLib: "0x8ab9bf5e39d6a687ee9d92e34980725b9b497178",
        ZeroLendRWAStablecoinsAaveV3DebtPositionParser: "0x00e719e96fc722ba76a3a22e0d2bb924ad1ce800",
      },
      inception: 14132862,
      network: Network.ETHEREUM,
      slug: `${Deployment.ETHEREUM}.${Version.SULU}`,
      status: Status.LIVE,
      version: Version.SULU,
    },
    [Version.ENCORE]: {
      address: "0x7e6d3b1161df9c9c7527f68d651b297d2fdb820b",
      contracts: {
        AaveAdapter: "0x32d0cb26c2964749bd5d10ba93695e52b4b57ea3",
        AavePriceFeed: "0x4e49a272dc42e26c8772de366aaa93d1ac816794",
        AdapterBlacklist: "0xa2a031b137452986b0e8fa32c9430d29b9b0494f",
        AdapterWhitelist: "0x306f571110c5441a8481d3cd7e8b16a7e2e967e3",
        AggregatedDerivativePriceFeed: "0x2e45f9b3fd5871ccaf4eb415dfccbdd126f57c4f",
        AlphaHomoraV1Adapter: "0x63765ae5df9bb8af9d8bc976e595b79907cf341c",
        AlphaHomoraV1PriceFeed: "0x1a8b4f6d469ee775d5982c4d4aab46677c2c92d4",
        AssetBlacklist: "0xdc1e40174ad831e505e8191881a66e90c3681e33",
        AssetValueCalculator: "0xa85cba5b7a1139848c5b8c6dffc3e4107bf8f018",
        AssetWhitelist: "0xa3b7b872407452e38dffaca8da2db3ed6d756ad1",
        BuySharesCallerWhitelist: "0xbc91dcc90ccdd0b51e3c623528cb886358c60105",
        ChainlinkPriceFeed: "0x1fad8faf11e027f8630f394599830dbeb97004ee",
        CompoundAdapter: "0xb7bfd3582582a82ef2a2f0df0adf705f35a07d4b",
        CompoundPriceFeed: "0x6d7f71cc3109d4132ad6124d84e72e353b979880",
        ComptrollerLib: "0x1a7cbedf13e25818dc377d2b1277e03e5d496300",
        CurveExchangeAdapter: "0x1990d8bc382d38fa21ee3b570e9d1e6272152165",
        CurveLiquidityAaveAdapter: "0x78ba80c8517a4f3146fd76a3642fa57b77f331eb",
        CurveLiquidityEursAdapter: "0x893b4fa60efbabfc35a54795e2ea9eb97344f64d",
        CurveLiquiditySethAdapter: "0xee91e3bb4752f358ddaac6ab825536698b239546",
        CurveLiquidityStethAdapter: "0x6367bb496390ddf0ef508db2992f53dbf376b1f4",
        CurvePriceFeed: "0xc106f1b01017c854a9cd2d88db733408236dd809",
        Dispatcher: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
        EntranceRateBurnFee: "0x27f74b89b29508091014487253d8d9b88aa0264a",
        EntranceRateDirectFee: "0x30a398eb63b62bf2865f90e37752c8300ef22f05",
        FeeManager: "0x5d0a363e9a17fb839e2843ffa93c808cdafccb67",
        FundActionsWrapper: "0xbc9a63cad5a825bd5854abca4f3d42d6acf9bffa",
        FundDataProviderRouter: "0x781ec8517a75172ea007d7458ea1811fc9f99c30",
        FundDeployer: "0x7e6d3b1161df9c9c7527f68d651b297d2fdb820b",
        FundValueCalculator: "0x21560c8c72bebe1a240d442813f2c35b05cac5ec",
        FundValueCalculatorRouter: "0x7c728cd0cfa92401e01a4849a01b57ee53f5b2b9",
        GuaranteedRedemption: "0x08d4225f0995d770c4c8ea85380602b3499164a9",
        IdleAdapter: "0x649b6cc835c8fe3d3b94b6a9c155f791bf500dfe",
        IdlePriceFeed: "0x13c2263e534bd27149d96b8cb9961ea1beb560ef",
        IntegrationManager: "0x965ca477106476b4600562a2ebe13536581883a6",
        InvestorWhitelist: "0x775f8d5d016c4d8a1427982148ec2170282c7784",
        KyberAdapter: "0x4ff16eff3b6d2175a513ef4c5b95f5f4d2f05179",
        LidoStethPriceFeed: "0x11d8d414724281bd702838ba16c8f15f7c473e9a",
        ManagementFee: "0x45f1b268cc6412b454dae20f8971fc4a36af0d29",
        MaxConcentration: "0xdee63b253432a443a09bf8461f20256d184319de",
        MinMaxInvestment: "0x016a7287f0fdbdce5f903334f574b2238be3fa25",
        ParaSwapV4Adapter: "0x8ea6ca02274e1b05b70c11058213adc667258c3d",
        PerformanceFee: "0x3c3f9143a15042b69eb314cac211688a4e71a087",
        PolicyManager: "0x0bd9f0465d21d4c300c7b8d781a013bdc87a31e8",
        StakehoundEthPriceFeed: "0xd3c515ead7bcc7451cd920e066c4a1849b827dfd",
        SynthetixAdapter: "0x07698c3fa26a62ec6320872bf2950ba160a2dd7c",
        SynthetixPriceFeed: "0x4158f02ac2ff0f0e7959a768d06619b685abf0c8",
        TrackedAssetsAdapter: "0xea05f4a383adce7f1e9cc1b6029b51d7260e53aa",
        UniswapV2Adapter: "0x8481150a0f36c98ee859e6c7b46d61fdd836768f",
        UniswapV2PoolPriceFeed: "0x37ffb1842ef012d83a6ffdc92a6353044ae0e3e8",
        ValueInterpreter: "0x10a5624840ac07287f756777df1dec34d2c2d654",
        VaultLib: "0x1b3694907ed7459c7b0116e7c6a4b7788288577f",
        WdgldPriceFeed: "0x76b548553d4e729c81e8ae8ab826795bd88ba9e7",
        YearnVaultV2Adapter: "0xda27d95bd940cac017f9484175e5512d3e4b0662",
        YearnVaultV2PriceFeed: "0x7b768dd670b6f0d4afc270cb413a8f7ca1889bd7",
        ZeroExV2Adapter: "0x9b6cd2195d3c275875cb469a59dd437995712550",
      },
      inception: 12387778,
      network: Network.ETHEREUM,
      slug: `${Deployment.ETHEREUM}.${Version.ENCORE}`,
      status: Status.DEPRECATED,
      version: Version.ENCORE,
    },
    [Version.PHOENIX]: {
      address: "0x9134c9975244b46692ad9a7da36dba8734ec6da3",
      contracts: {
        AaveAdapter: "0x14c6b99affc61e9b0753146f3437a223d0c58279",
        AavePriceFeed: "0x3996d53013f562fd6d5b777ab0ee681802698e0d",
        AdapterBlacklist: "0x9f471f573414d9cacfe3a0127ad12f195504de7b",
        AdapterWhitelist: "0xb4df8b4f3ec62619e8d2aed5df360aa393bb8745",
        AggregatedDerivativePriceFeed: "0xcfb6f4c08856986d13839b1907b5c645ee95388f",
        AlphaHomoraV1Adapter: "0xed6bdfa2725da6687bc89bcb0bdb1e5deae15838",
        AlphaHomoraV1PriceFeed: "0x5f2e2e7ffbcaee69d570d531a00228322632231e",
        AssetBlacklist: "0x2a7cd39427831045e7050723006697fd0801b184",
        AssetValueCalculator: "0x929186c01e51d00209cf520bac0651dca4b6fad1",
        AssetWhitelist: "0x664f6c88ca8d5888b11b97450a5623003b8981b9",
        BuySharesCallerWhitelist: "0x21fc97450c65dafe14255a06cf9c5c88483ba309",
        ChaiAdapter: "0xb3646e9b6df463a2dc36de67ffd28cbab3f8a5cc",
        ChaiPriceFeed: "0x8ba6f2d9c81db32665df6a926227dd00caca7d9b",
        ChainlinkPriceFeed: "0xfb3a9655f5fea18cac92021e83550f829ae6f7f7",
        CompoundAdapter: "0xd050dc9e75f24ae653d282d0cfb772871729e710",
        CompoundPriceFeed: "0xc80bd25cd46e49277ccb56e751704a6316af30ad",
        ComptrollerLib: "0x94f262802806be3646612d0705802710dd5b58df",
        CurveExchangeAdapter: "0x402a81ad2972a017b4564453e69afae2b006a7e2",
        CurveLiquidityAaveAdapter: "0xf6f7cc9464cb15e0a5b116d738dca88434bba00a",
        CurveLiquiditySethAdapter: "0xbd81a0ef03f4ed89f73a30eb33137787bf92e177",
        CurveLiquidityStethAdapter: "0x3bb38e67033e24e604e53964a99d914f8b216521",
        CurvePriceFeed: "0x884d909ea86ec61128a4cfe1b455d5b440cde9c8",
        Dispatcher: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
        EntranceRateBurnFee: "0xa831a43f99af957bc27d03963958fd710dc1f50e",
        EntranceRateDirectFee: "0x42bc95f119fb08b9fc72262d255016fa5546caa4",
        FeeManager: "0xecdbcdb8dbf0ac54f47e41d3dd0c7dae07828aaa",
        FundActionsWrapper: "0x38c9f2870003d47f704e317c10f93ca1ddae67c1",
        FundDataProviderRouter: "0x781ec8517a75172ea007d7458ea1811fc9f99c30",
        FundDeployer: "0x9134c9975244b46692ad9a7da36dba8734ec6da3",
        FundValueCalculator: "0xc60642c271cd1102e922027af81e4ed4736d48c7",
        FundValueCalculatorRouter: "0x7c728cd0cfa92401e01a4849a01b57ee53f5b2b9",
        GuaranteedRedemption: "0xda9d4ee6c846e0b504979ea3d607c2e98574a09c",
        IdleAdapter: "0x2f7918d9a98c199173fb8ca989b408b4fb1ea441",
        IdlePriceFeed: "0x08ecd9e1378dc0262df826c07d3d64c728a46829",
        IntegrationManager: "0xfc3f356217120318bd46c879b3a55c3135473752",
        InvestorWhitelist: "0x3c8a4dace64b238c8307e3af563fcf76cf870d57",
        KyberAdapter: "0x963e9c15a26d74085abfc8b48280b650426f998e",
        LidoStethPriceFeed: "0x4f3da46bf999c6b3005c1465672009fbf99e7b9f",
        ManagementFee: "0x889f2fcb6c12d836cb8f7567a1bdfa512fe9f647",
        MaxConcentration: "0x6b9a7604fab14721b51a89cd1ccef639da8664ee",
        MinMaxInvestment: "0xdccae078656f20b0851dd35683315be56aeee8f3",
        ParaSwapV4Adapter: "0x1c1b94812faf3de496a2634b36c1fbc6e5c222e7",
        PerformanceFee: "0x70478df01108cb2fcb23463814e648363ce17720",
        PolicyManager: "0x4c2c07b15b0b32bad989d9defaec775e2aa8a7ad",
        StakehoundEthPriceFeed: "0xe2b19fa2d662f4eea51d394b71ce7281214840c5",
        SynthetixAdapter: "0xbf3411973f09c32e8c4e67d1345dddc5f9c7535a",
        SynthetixPriceFeed: "0x2180341339010c237ff8e3dd1ff24063fb18c4d0",
        TrackedAssetsAdapter: "0xde4a42052db0fb0e8935c9f3015b8cd56a3ddf43",
        UniswapV2Adapter: "0x972318a0f4935c3153a2aa4c81274dff621b360b",
        UniswapV2PoolPriceFeed: "0x9177a3354ee50bffbcc42c4c6bac27ed63979097",
        ValueInterpreter: "0x6618bf56e1c7b6c8310bfe4096013bed8f191628",
        VaultLib: "0xac3fe07f51c51153e181be892e4e37326eea13da",
        WdgldPriceFeed: "0x45919dcdecca3c7a0d29f959e6b78a605a17a3a2",
        ZeroExV2Adapter: "0x4205073e7ad2f9896f827dbce496dd2306db602e",
      },
      inception: 11636497,
      network: Network.ETHEREUM,
      slug: `${Deployment.ETHEREUM}.${Version.PHOENIX}`,
      status: Status.DEPRECATED,
      version: Version.PHOENIX,
    },
  },
  slug: Deployment.ETHEREUM,
  subgraphs: {
    assets: { slug: "asset-universe", id: "4ZW3mDNgpDVy68RipQLJxvRw1FReJTfvA7nbB52J4Gjg" },
    balances: { slug: "vault-balances", id: "HwR7jTExHWNvQetTxRYEMQ5hywHyUkierAYvnGS7pBUS" },
    core: {
      slug: "enzyme-core",
      id: "9DLBBLep5UyU16kUQRvxBCMqko4q9XzuE4XsMMpARhKK",
      devVersion: "version/latest",
    },
    shares: { slug: "vault-shares", id: "6p2L2gQ4Hw4Dh2kxZFDJbcqtbv44vrJbrBEh3EjS7qVo" },
    vaults: { slug: "vault-lineage", id: "5FdivFcUPmVSqCFkv3jqJh3QYjHjh1ztzd7GHiCAMP1h" },
  },
});
