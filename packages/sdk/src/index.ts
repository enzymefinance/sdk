export {
  ListUpdateType,
  MigrationOutHook,
  RateAsset,
  VaultAction,
} from "./enums.js";

// Constants
export {
  ETH_ADDRESS,
  LIB_INIT_GENERIC_DUMMY_ADDRESS,
  MAX_UINT_128,
  MAX_UINT_256,
  SHARES_UNIT,
  SPECIFIC_ASSET_REDEMPTION_DUMMY_FORFEIT_ADDRESS,
  ZERO_ADDRESS,
  ZERO_ADDRESS_ALT,
} from "./constants/misc.js";

export {
  AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR,
  CURVE_MINTER_MINT_MANY_SELECTOR,
  CURVE_MINTER_MINT_SELECTOR,
  CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR,
  PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR,
  REGISTRY_ADD_TO_LIST_SELECTOR,
  REGISTRY_REMOVE_FROM_LIST_SELECTOR,
  REGISTRY_ATTEST_LISTS_SELECTOR,
  REGISTRY_CREATE_LIST_SELECTOR,
  REGISTRY_SET_LIST_OWNER_SELECTOR,
  REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR,
  SETTLE_CONTINUOUS_FEES_SELECTOR,
  SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR,
  VAULT_CALL_ANY_DATA_HASH,
} from "./constants/selectors.js";

// Utils
export {
  toBps,
  toSeconds,
  toWei,
  applySlippage,
} from "./utils/conversion.js";

export {
  calculateAmountDueForScaledPerSecondRate,
  convertRateToScaledPerSecondRate,
  convertScaledPerSecondRateToRate,
} from "./utils/rates.js";

export {
  type PrepareFunctionParamsArgs,
  prepareFunctionParams,
} from "./utils/viem.js";

// Policies
export { PolicyHook } from "./policies/enums.js";

export {
  type PolicySettingsTuple,
  policySettingsAbi,
  encodePolicySettings,
  decodePolicySettings,
} from "./policies/settings.js";

export { encodeAllowedExternalPositionTypesPolicySettings } from "./policies/policies/allowedExternalPositionTypesPolicy.js";

export { encodeCumulativeSlippageTolerancePolicySettings } from "./policies/policies/cumulativeSlippageTolerancePolicy.js";

export { encodeMinAssetBalancesPostRedemptionPolicySettings } from "./policies/policies/minAssetBalancesPostRedemptionPolicy.js";

export { encodeMinMaxInvestmentPolicySettings } from "./policies/policies/minMaxInvestmentPolicy.js";

// Fees
export { FeeHook, FeeManagerAction, FeeSettlementType } from "./fees/enums.js";

export {
  type FeeSettingsTuple,
  feeSettingsAbi,
  encodeFeeSettings,
  decodeFeeSettings,
} from "./fees/settings.js";

export {
  type CalculateEntranceRateFeeSharesDueArgs,
  calculateEntranceRateFeeSharesDue,
  type EntranceRateBurnFeeSettings,
  encodeEntranceRateBurnFeeSettings,
  decodeEntranceRateBurnFeeSettings,
  entranceRateBurnFeeSettingsEncoding,
  type EntranceRateDirectFeeSettings,
  type EncodeEntranceRateDirectFeeSettingsArgs,
  encodeEntranceRateDirectFeeSettings,
  decodeEntranceRateDirectFeeSettings,
  entranceRateDirectFeeSettingsEncoding,
} from "./fees/fees/entranceFee.js";

export {
  type CalculateExitRateFeeSharesDueArgs,
  calculateExitRateFeeSharesDue,
  type ExitRateBurnFeeSettings,
  type EncodeExitRateBurnFeeSettingsArgs,
  encodeExitRateBurnFeeSettings,
  decodeExitRateBurnFeeSettings,
  exitRateBurnFeeSettingsEncoding,
  type ExitRateDirectFeeSettings,
  type EncodeExitRateDirectFeeSettingsArgs,
  encodeExitRateDirectFeeSettings,
  decodeExitRateDirectFeeSettings,
  exitRateDirectFeeSettingsEncoding,
} from "./fees/fees/exitFee.js";

export {
  type CalculateManagementFeeSharesDueArgs,
  calculateManagementFeeSharesDue,
  type ManagementFeeSettings,
  type EncodeManagementFeeSettingsArgs,
  encodeManagementFeeSettings,
  decodeManagementFeeSettings,
  managementFeeSettingsEncoding,
} from "./fees/fees/managementFee.js";

export {
  type PerformanceFeeSettings,
  type EncodePerformanceFeeSettingsArgs,
  encodePerformanceFeeSettings,
  decodePerformanceFeeSettings,
  performanceFeeSettingsEncoding,
} from "./fees/fees/performanceFee.js";

// Actions
export {
  type PrepareSetupVaultParamsArgs,
  decodeSetupVaultParams,
  prepareSetupVaultParams,
} from "./actions/setupVault.js";

export {
  type BuySharesParams,
  decodeBuySharesParams,
  prepareBuySharesParams,
  type SimulateBuySharesArgs,
  simulateBuyShares,
} from "./actions/buyShares.js";
