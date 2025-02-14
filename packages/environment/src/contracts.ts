import type { Address } from "./types.js";

export enum Version {
  PHOENIX = "phoenix",
  ENCORE = "encore",
  SULU = "sulu",
}

export function isVersion(version: any): version is Version {
  return typeof version === "string" && Object.values<any>(Version).includes(version);
}

export type VersionContracts<TVersion extends Version> = TVersion extends Version.SULU
  ? SuluContracts
  : TVersion extends Version.ENCORE
    ? EncoreContracts
    : TVersion extends Version.PHOENIX
      ? PhoenixContracts
      : never;

export type Contracts = EncoreContracts | PhoenixContracts | SuluContracts;

export interface CommonContracts {
  readonly ComptrollerLib: Address;
  readonly Dispatcher: Address;
  readonly FeeManager: Address;
  readonly FundDataProviderRouter: Address;
  readonly FundDeployer: Address;
  readonly FundValueCalculatorRouter: Address;
  readonly IntegrationManager: Address;
  readonly PolicyManager: Address;
  readonly VaultLib: Address;
}

export interface SuluContracts extends CommonContracts {
  readonly AaveDebtPositionLib: Address;
  readonly AaveDebtPositionParser: Address;
  readonly AaveV3DebtPositionLib: Address;
  readonly AaveV3DebtPositionParser: Address;
  readonly AaveV3FlashLoanAssetManagerFactory: Address; // Contract name on-chain: DispatcherOwnedBeaconFactory
  readonly AaveV3FlashLoanAssetManagerLib: Address;
  readonly AavePriceFeed: Address;
  readonly AaveV2Adapter: Address;
  readonly AaveV2ATokenListOwner: Address;
  readonly AaveV3Adapter: Address;
  readonly AaveV3ATokenListOwner: Address;
  readonly AddressListRegistry: Address;
  readonly AlicePositionLib: Address;
  readonly AlicePositionParser: Address;
  readonly AllowedAdapterIncomingAssetsPolicy: Address;
  readonly AllowedAdaptersPerManagerPolicy: Address;
  readonly AllowedAdaptersPolicy: Address;
  readonly AllowedAssetsForRedemptionPolicy: Address;
  readonly AllowedDepositRecipientsPolicy: Address;
  readonly AllowedExternalPositionTypesPerManagerPolicy: Address;
  readonly AllowedExternalPositionTypesPolicy: Address;
  readonly AllowedRedeemersForSpecificAssetsPolicy: Address;
  readonly AllowedSharesTransferRecipientsPolicy: Address;
  readonly ArbitraryLoanPositionLib: Address;
  readonly ArbitraryLoanPositionParser: Address;
  readonly ArbitraryLoanTotalNominalDeltaOracleModule: Address;
  readonly ArrakisV2Adapter: Address;
  readonly ArrakisV2PriceFeed: Address;
  readonly AssetValueCalculator: Address;
  readonly BalancerV2GaugeTokenPriceFeed: Address;
  readonly BalancerV2LiquidityAdapter: Address;
  readonly BalancerV2StablePoolPriceFeed: Address;
  readonly BalancerV2WeightedPoolPriceFeed: Address;
  readonly ChainlinkLikeWstethPriceFeed: Address;
  readonly ChainlinkLikeYnEthPriceFeed: Address;
  readonly CompoundAdapter: Address;
  readonly CompoundDebtPositionLib: Address;
  readonly CompoundDebtPositionParser: Address;
  readonly CompoundPriceFeed: Address;
  readonly CompoundV3TokenListOwner: Address;
  readonly CompoundV3Adapter: Address;
  readonly ConvertedQuoteAggregatorFactory: Address;
  readonly ConvexVotingPositionLib: Address;
  readonly ConvexVotingPositionParser: Address;
  readonly CumulativeSlippageTolerancePolicy: Address;
  readonly CurveExchangeAdapter: Address;
  readonly CurveLiquidityAaveAdapter: Address;
  readonly CurveLiquidityAdapter: Address;
  readonly CurveLiquiditySethAdapter: Address;
  readonly CurveLiquidityStethAdapter: Address;
  readonly CurvePriceFeed: Address;
  readonly DepositWrapper: Address;
  readonly DisallowedAdapterIncomingAssetsPolicy: Address;
  readonly EntranceRateBurnFee: Address;
  readonly EntranceRateDirectFee: Address;
  readonly ERC4626Adapter: Address;
  readonly ERC4626PriceFeed: Address;
  readonly EtherFiEthPriceFeed: Address;
  readonly ExitRateBurnFee: Address;
  readonly ExitRateDirectFee: Address;
  readonly ExternalPositionFactory: Address;
  readonly ExternalPositionManager: Address;
  readonly FiduPriceFeed: Address;
  readonly FundValueCalculator: Address;
  readonly GasRelayPaymasterFactory: Address;
  readonly GasRelayPaymasterLib: Address;
  readonly GatedRedemptionQueueSharesWrapperFactory: Address;
  readonly GatedRedemptionQueueSharesWrapperLib: Address;
  readonly GenericAdapter: Address;
  readonly GlobalConfigLib: Address;
  readonly GlobalConfigProxy: Address;
  readonly GMXV2LeverageTradingPositionLib: Address;
  readonly GMXV2LeverageTradingPositionParser: Address;
  readonly KilnStakingPositionLib: Address;
  readonly KilnStakingPositionParser: Address;
  readonly LidoWithdrawalsPositionLib: Address;
  readonly LidoWithdrawalsPositionParser: Address;
  readonly LiquityDebtPositionLib: Address;
  readonly LiquityDebtPositionParser: Address;
  readonly ManagementFee: Address;
  readonly ManualValueOracleFactory: Address;
  readonly MapleLiquidityPositionLib: Address;
  readonly MapleLiquidityPositionParser: Address;
  readonly MinAssetBalancesPostRedemptionPolicy: Address;
  readonly MinMaxInvestmentPolicy: Address;
  readonly MinSharesSupplyFee: Address;
  readonly MorphoBluePositionLib: Address;
  readonly MorphoBluePositionParser: Address;
  readonly NoDepegOnRedeemSharesForSpecificAssetsPolicy: Address;
  readonly NotionalV2PositionLib: Address;
  readonly NotionalV2PositionParser: Address;
  readonly OneInchV5Adapter: Address;
  readonly OnlyRemoveDustExternalPositionPolicy: Address;
  readonly OnlyUntrackDustOrPricelessAssetsPolicy: Address;
  readonly ParaSwapV5Adapter: Address;
  readonly PeggedDerivativesPriceFeed: Address;
  readonly PendleV2Adapter: Address;
  readonly PendleV2PositionLib: Address;
  readonly PendleV2PositionParser: Address;
  readonly PendleMarketsRegistry: Address;
  readonly PerformanceFee: Address;
  readonly PoolTogetherV4Adapter: Address;
  readonly PoolTogetherV4PriceFeed: Address;
  readonly ProtocolFeeReserveLib: Address;
  readonly ProtocolFeeReserveProxy: Address;
  readonly ProtocolFeeTracker: Address;
  readonly SharePriceThrottledAssetManagerLib: Address;
  readonly SharePriceThrottledAssetManagerFactory: Address;
  readonly SharesSplitterFactory: Address;
  readonly SingleAssetRedemptionQueueLib: Address;
  readonly SingleAssetRedemptionQueueFactory: Address;
  readonly SingleAssetDepositQueueLib: Address;
  readonly SingleAssetDepositQueueFactory: Address;
  readonly SolvV2BondBuyerPositionLib: Address;
  readonly SolvV2BondBuyerPositionParser: Address;
  readonly SolvV2BondIssuerPositionLib: Address;
  readonly SolvV2BondIssuerPositionParser: Address;
  readonly StaderSDPriceFeed: Address;
  readonly StaderStakingAdapter: Address;
  readonly StaderWithdrawalsPositionLib: Address;
  readonly StaderWithdrawalsPositionParser: Address;
  readonly StakeWiseV3StakingPositionLib: Address;
  readonly StakeWiseV3StakingPositionParser: Address;
  readonly SwellStakingAdapter: Address;
  readonly SynthetixAdapter: Address;
  readonly TermFinanceV1LendingPositionLib: Address;
  readonly TermFinanceV1LendingPositionParser: Address;
  readonly TheGraphDelegationPositionLib: Address;
  readonly TheGraphDelegationPositionParser: Address;
  readonly ThreeOneThirdAdapter: Address;
  readonly TransferAssetsAdapter: Address;
  readonly UintListRegistry: Address;
  readonly UniswapV2ExchangeAdapter: Address;
  readonly UniswapV2LiquidityAdapter: Address;
  readonly UniswapV2PoolPriceFeed: Address;
  readonly UniswapV3Adapter: Address;
  readonly UniswapV3LiquidityPositionLib: Address;
  readonly UniswapV3LiquidityPositionParser: Address;
  readonly UnpermissionedActionsWrapper: Address;
  readonly UsdEthSimulatedAggregator: Address;
  readonly ValueInterpreter: Address;
  readonly WstethPriceFeed: Address;
  readonly YearnVaultV2Adapter: Address;
  readonly YearnVaultV2PriceFeed: Address;
  readonly ZeroExV2Adapter: Address;
  readonly ZeroExV4Adapter: Address;
  readonly ZeroExV4AdapterPmm2Kyc: Address;
  readonly ZeroLendLRTBTCAaveV3Adapter: Address;
  readonly ZeroLendLRTBTCAaveV3ATokenListOwner: Address;
  readonly ZeroLendLRTBTCAaveV3DebtPositionLib: Address;
  readonly ZeroLendLRTBTCAaveV3DebtPositionParser: Address;
  readonly ZeroLendRWAStablecoinsAaveV3Adapter: Address;
  readonly ZeroLendRWAStablecoinsAaveV3ATokenListOwner: Address;
  readonly ZeroLendRWAStablecoinsAaveV3DebtPositionLib: Address;
  readonly ZeroLendRWAStablecoinsAaveV3DebtPositionParser: Address;
}

export interface EncoreContracts extends CommonContracts {
  readonly AaveAdapter: Address;
  readonly AavePriceFeed: Address;
  readonly AdapterBlacklist: Address;
  readonly AdapterWhitelist: Address;
  readonly AggregatedDerivativePriceFeed: Address;
  readonly AlphaHomoraV1Adapter: Address;
  readonly AlphaHomoraV1PriceFeed: Address;
  readonly AssetBlacklist: Address;
  readonly AssetValueCalculator: Address;
  readonly AssetWhitelist: Address;
  readonly BuySharesCallerWhitelist: Address;
  readonly ChainlinkPriceFeed: Address;
  readonly CompoundAdapter: Address;
  readonly CompoundPriceFeed: Address;
  readonly CurveExchangeAdapter: Address;
  readonly CurveLiquidityAaveAdapter: Address;
  readonly CurveLiquidityEursAdapter: Address;
  readonly CurveLiquiditySethAdapter: Address;
  readonly CurveLiquidityStethAdapter: Address;
  readonly CurvePriceFeed: Address;
  readonly EntranceRateBurnFee: Address;
  readonly EntranceRateDirectFee: Address;
  readonly FundActionsWrapper: Address;
  readonly FundValueCalculator: Address;
  readonly GuaranteedRedemption: Address;
  readonly IdleAdapter: Address;
  readonly IdlePriceFeed: Address;
  readonly InvestorWhitelist: Address;
  readonly KyberAdapter: Address;
  readonly LidoStethPriceFeed: Address;
  readonly ManagementFee: Address;
  readonly MaxConcentration: Address;
  readonly MinMaxInvestment: Address;
  readonly ParaSwapV4Adapter: Address;
  readonly PerformanceFee: Address;
  readonly StakehoundEthPriceFeed: Address;
  readonly SynthetixAdapter: Address;
  readonly SynthetixPriceFeed: Address;
  readonly TrackedAssetsAdapter: Address;
  readonly UniswapV2Adapter: Address;
  readonly UniswapV2PoolPriceFeed: Address;
  readonly ValueInterpreter: Address;
  readonly WdgldPriceFeed: Address;
  readonly YearnVaultV2Adapter: Address;
  readonly YearnVaultV2PriceFeed: Address;
  readonly ZeroExV2Adapter: Address;
}

export interface PhoenixContracts extends CommonContracts {
  readonly AaveAdapter: Address;
  readonly AavePriceFeed: Address;
  readonly AdapterBlacklist: Address;
  readonly AdapterWhitelist: Address;
  readonly AggregatedDerivativePriceFeed: Address;
  readonly AlphaHomoraV1Adapter: Address;
  readonly AlphaHomoraV1PriceFeed: Address;
  readonly AssetBlacklist: Address;
  readonly AssetValueCalculator: Address;
  readonly AssetWhitelist: Address;
  readonly BuySharesCallerWhitelist: Address;
  readonly ChaiAdapter: Address;
  readonly ChainlinkPriceFeed: Address;
  readonly ChaiPriceFeed: Address;
  readonly CompoundAdapter: Address;
  readonly CompoundPriceFeed: Address;
  readonly CurveExchangeAdapter: Address;
  readonly CurveLiquidityAaveAdapter: Address;
  readonly CurveLiquiditySethAdapter: Address;
  readonly CurveLiquidityStethAdapter: Address;
  readonly CurvePriceFeed: Address;
  readonly EntranceRateBurnFee: Address;
  readonly EntranceRateDirectFee: Address;
  readonly FundActionsWrapper: Address;
  readonly FundValueCalculator: Address;
  readonly GuaranteedRedemption: Address;
  readonly IdleAdapter: Address;
  readonly IdlePriceFeed: Address;
  readonly InvestorWhitelist: Address;
  readonly KyberAdapter: Address;
  readonly LidoStethPriceFeed: Address;
  readonly ManagementFee: Address;
  readonly MaxConcentration: Address;
  readonly MinMaxInvestment: Address;
  readonly ParaSwapV4Adapter: Address;
  readonly PerformanceFee: Address;
  readonly StakehoundEthPriceFeed: Address;
  readonly SynthetixAdapter: Address;
  readonly SynthetixPriceFeed: Address;
  readonly TrackedAssetsAdapter: Address;
  readonly UniswapV2Adapter: Address;
  readonly UniswapV2PoolPriceFeed: Address;
  readonly ValueInterpreter: Address;
  readonly WdgldPriceFeed: Address;
  readonly ZeroExV2Adapter: Address;
}
