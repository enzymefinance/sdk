// We use expressive identifiers to make usage of the error codes easier. This gives us the best of both worlds, because identifiers
// safely be mangled & minified by the application bundler.
export const SAFE_ERC20_LOW_LEVEL_CALL_FAILED = "ENZF00001"; // SafeERC20: low-level call failed
export const POLICY_VIOLATION_MIN_MAX_INVESTMENT = "ENZF10001"; // Rule evaluated to false: MIN_MAX_INVESTMENT
export const POLICY_VIOLATION_ALLOWED_ADAPTER_INCOMING_ASSETS = "ENZF10002"; // Rule evaluated to false: ALLOWED_ADAPTER_INCOMING_ASSETS
export const POLICY_VIOLATION_ALLOWED_ADAPTERS_PER_MANAGER = "ENZF10003"; // Rule evaluated to false: ALLOWED_ADAPTERS_PER_MANAGER
export const POLICY_VIOLATION_ALLOWED_ADAPTERS = "ENZF10004"; // Rule evaluated to false: ALLOWED_ADAPTERS
export const POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER = "ENZF10005"; // Rule evaluated to false: ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER
export const POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES = "ENZF10006"; // Rule evaluated to false: ALLOWED_EXTERNAL_POSITION_TYPES
export const POLICY_VIOLATION_CUMULATIVE_SLIPPAGE_TOLERANCE = "ENZF10007"; // Rule evaluated to false: CUMULATIVE_SLIPPAGE_TOLERANCE
export const POLICY_VIOLATION_ONLY_REMOVE_DUST_EXTERNAL_POSITION = "ENZF10008"; // Rule evaluated to false: ONLY_REMOVE_DUST_EXTERNAL_POSITION
export const POLICY_VIOLATION_ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS = "ENZF10009"; // Rule evaluated to false: ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS
export const POLICY_VIOLATION_ALLOWED_ASSETS_FOR_REDEMPTION = "ENZF100010"; // Rule evaluated to false: ALLOWED_ASSETS_FOR_REDEMPTION
export const POLICY_VIOLATION_MIN_ASSET_BALANCES_POST_REDEMPTION = "ENZF100011"; // Rule evaluated to false: MIN_ASSET_BALANCES_POST_REDEMPTION
export const POLICY_VIOLATION_ALLOWED_DEPOSIT_RECIPIENTS = "ENZF100012"; // Rule evaluated to false: ALLOWED_DEPOSIT_RECIPIENTS
export const POLICY_VIOLATION_ALLOWED_SHARES_TRANSFER_RECIPIENTS = "ENZF100013"; // Rule evaluated to false: ALLOWED_SHARES_TRANSFER_RECIPIENTS
export const BUY_SHARES_MIN_SHARES_QUANTITY_TOO_LOW = "ENZF200001"; // __buyShares: _minSharesQuantity must be >0
export const BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION = "ENZF200002"; // __buyShares: Pending migration or reconfiguration
export const BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT = "ENZF200003"; // __buyShares: Shares received < _minSharesQuantity
export const ASSET_MANAGER_ALREADY_REGISTERED = "ENZF200010"; // addAssetManagers: Manager already registered
export const ASSET_MANAGER_NOT_REGISTERED = "ENZF200011"; // removeAssetManagers: Manager not registered
export const SHARES_REDEMPTION_UNEQUAL_ARRAYS = "ENZF200020"; // redeemSharesForSpecificAssets: Unequal arrays
export const SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT = "ENZF200021"; // __payoutSpecifiedAssetPercentages: Percents must total 100%
export const SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET = "ENZF200022"; // redeemSharesForSpecificAssets: Duplicate payout asset
export const SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET = "ENZF200023"; // __payoutSpecifiedAssetPercentages: Zero amount for asset
export const SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS = "ENZF200024"; // redeemSharesInKind: _additionalAssets contains duplicates
export const SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP = "ENZF200025"; // redeemSharesInKind: _assetsToSkip contains duplicates
export const CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER = "ENZF200030"; // claimOwnership: Only the nominatedOwner can call this function
export const SET_NOMINATED_OWNER_CANNOT_BE_EMPTY = "ENZF200032"; // setNominatedOwner: _nextNominatedOwner cannot be empty
export const SET_NOMINATED_OWNER_ALREADY_NOMINATED = "ENZF200033"; // setNominatedOwner: _nextNominatedOwner is already nominated
export const SET_NOMINATED_OWNER_ALREADY_OWNER = "ENZF200034"; // setNominatedOwner: _nextNominatedOwner is already the owner"
export const REMOVE_NOMINATED_OWNER_NO_OWNER = "ENZF20031"; // removeNominatedOwner: There is no nominated owner
export const RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID = "ENZF20032"; // receiveCallFromComptroller: Fund is not valid
export const RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED = "ENZF20033"; // receiveCallFromComptroller: Unauthorized
export const ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET = "ENZF20034"; // __addTrackedAssetsToVault: Unsupported asset
export const RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE = "ENZF20035"; // receiveCallFromComptroller: Fund is not active
export const SPEND_ASSETS_ARRAYS_ARE_UNEQUAL = "ENZF20036"; // __preProcessCoI: Spend assets arrays unequal
export const INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL = "ENZF20037"; // __preProcessCoI: Incoming assets arrays unequal
export const DUPLICATE_SPEND_ASSET = "ENZF20038"; // __preProcessCoI: Duplicate spend asset
export const DUPLICATE_INCOMING_ASSET = "ENZF20039"; // __preProcessCoI: Duplicate incoming asset
export const NON_RECEIVABLE_INCOMING_ASSET = "ENZF20040"; // __preProcessCoI: Non-receivable incoming asset
export const RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED = "ENZF20041"; // __postProcessCoI: Received incoming asset less than expected
export const RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED = "ENZF20042"; // __postProcessCoI: Spent amount greater than expected
export const ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION = "ENZF20043"; // Only the IntegrationManager can call this function
export const ADAPTER_SELECTOR_INVALID = "ENZF20044"; // parseAssetsForAction: _selector invalid
export const FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL = "ENZF20045"; // setConfigForFund: fees and settingsData array lengths unequal
export const FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES = "ENZF20046"; // setConfigForFund: fees cannot include duplicates
export const FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE = "ENZF20047"; // __invokeHook: Fund is not active
export const RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID = "ENZF20048"; // receiveCallFromComptroller: Invalid _actionId
export const SETTLE_FEE_INVALID_SETTLEMENT_TYPE = "ENZF20049"; // __settleFee: Invalid SettlementType
export const CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID = "ENZF20050"; // __createExternalPosition: Invalid typeId
export const REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION = "ENZF20051"; // __reactivateExternalPosition: Account provided is not a valid external position
export const REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION = "ENZF20052"; // __reactivateExternalPosition: External position belongs to a different vault
export const UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS = "ENZF20053"; // updateExternalPositionTypesInfo: Unequal arrays
export const UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST = "ENZF20054"; // updateExternalPositionTypesInfo: Type does not exist
export const ONLY_FUND_OWNER_CAN_CALL = "ENZF20055"; // Only the fund owner can call this function
export const POLICY_CANNOT_BE_DISABLED = "ENZF20056"; // disablePolicyForFund: _policy cannot be disabled
export const ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS = "ENZF20057"; // enablePolicyForFund: _policy restricts actions of current investors
export const POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL = "ENZF20058"; // setConfigForFund: policies and settingsData array lengths unequal
export const POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL = "ENZF20059"; // validatePolicies: Caller not allowed
export const POLICY_ALREADY_ENABLED = "ENZF20060"; // __enablePolicyForFund: Policy is already enabled

export const errorCodes = [
  SAFE_ERC20_LOW_LEVEL_CALL_FAILED,
  POLICY_VIOLATION_MIN_MAX_INVESTMENT,
  POLICY_VIOLATION_ALLOWED_ADAPTER_INCOMING_ASSETS,
  POLICY_VIOLATION_ALLOWED_ADAPTERS_PER_MANAGER,
  POLICY_VIOLATION_ALLOWED_ADAPTERS,
  POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER,
  POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES,
  POLICY_VIOLATION_CUMULATIVE_SLIPPAGE_TOLERANCE,
  POLICY_VIOLATION_ONLY_REMOVE_DUST_EXTERNAL_POSITION,
  POLICY_VIOLATION_ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS,
  POLICY_VIOLATION_ALLOWED_ASSETS_FOR_REDEMPTION,
  POLICY_VIOLATION_MIN_ASSET_BALANCES_POST_REDEMPTION,
  POLICY_VIOLATION_ALLOWED_DEPOSIT_RECIPIENTS,
  POLICY_VIOLATION_ALLOWED_SHARES_TRANSFER_RECIPIENTS,
  BUY_SHARES_MIN_SHARES_QUANTITY_TOO_LOW,
  BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION,
  BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT,
  ASSET_MANAGER_ALREADY_REGISTERED,
  ASSET_MANAGER_NOT_REGISTERED,
  SHARES_REDEMPTION_UNEQUAL_ARRAYS,
  SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT,
  SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET,
  SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET,
  SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS,
  SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP,
  CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER,
  SET_NOMINATED_OWNER_CANNOT_BE_EMPTY,
  SET_NOMINATED_OWNER_ALREADY_NOMINATED,
  SET_NOMINATED_OWNER_ALREADY_OWNER,
  REMOVE_NOMINATED_OWNER_NO_OWNER,
  RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID,
  RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED,
  ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET,
  RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE,
  SPEND_ASSETS_ARRAYS_ARE_UNEQUAL,
  INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL,
  DUPLICATE_SPEND_ASSET,
  DUPLICATE_INCOMING_ASSET,
  NON_RECEIVABLE_INCOMING_ASSET,
  RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED,
  RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED,
  ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION,
  ADAPTER_SELECTOR_INVALID,
  FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL,
  FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES,
  FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE,
  RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID,
  SETTLE_FEE_INVALID_SETTLEMENT_TYPE,
  CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID,
  REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION,
  REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION,
  UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS,
  UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST,
  ONLY_FUND_OWNER_CAN_CALL,
  POLICY_CANNOT_BE_DISABLED,
  ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS,
  POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL,
  POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL,
  POLICY_ALREADY_ENABLED,
] as const;

export type ErrorCode = typeof errorCodes[number];

export interface ErrorDescription<TErrorCode extends ErrorCode = ErrorCode> {
  code: TErrorCode;
  label: string;
  description: string;
}

export const errorDictionary: {
  [TKey in ErrorCode]: ErrorDescription<TKey>;
} = {
  [SAFE_ERC20_LOW_LEVEL_CALL_FAILED]: {
    code: SAFE_ERC20_LOW_LEVEL_CALL_FAILED,
    label: "Token operation failed",
    description: "A low level token operation (approve, transfer, etc.) failed.",
  },
  [POLICY_VIOLATION_MIN_MAX_INVESTMENT]: {
    code: POLICY_VIOLATION_MIN_MAX_INVESTMENT,
    label: "Policy violation: Minimum or maximum investment",
    description: "The investment amount is below the minimum investment amount or above the maximum investment amount.",
  },
  [POLICY_VIOLATION_ALLOWED_ADAPTER_INCOMING_ASSETS]: {
    code: POLICY_VIOLATION_ALLOWED_ADAPTER_INCOMING_ASSETS,
    label: "Policy violation: Allowed adapter incoming assets",
    description: "The adapter does not support the incoming asset.",
  },
  [POLICY_VIOLATION_ALLOWED_ADAPTERS_PER_MANAGER]: {
    code: POLICY_VIOLATION_ALLOWED_ADAPTERS_PER_MANAGER,
    label: "Policy violation: Allowed adapters per manager",
    description: "The adapter is not allowed for this manager.",
  },
  [POLICY_VIOLATION_ALLOWED_ADAPTERS]: {
    code: POLICY_VIOLATION_ALLOWED_ADAPTERS,
    label: "Policy violation: Allowed adapters",
    description: "The adapter is not allowed for this vault.",
  },
  [POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER]: {
    code: POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER,
    label: "Policy violation: Allowed external position types per manager",
    description: "The external position type is not allowed for this manager.",
  },
  [POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES]: {
    code: POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES,
    label: "Policy violation: Allowed external position types",
    description: "The external position type is not allowed for this vault.",
  },
  [POLICY_VIOLATION_CUMULATIVE_SLIPPAGE_TOLERANCE]: {
    code: POLICY_VIOLATION_CUMULATIVE_SLIPPAGE_TOLERANCE,
    label: "Policy violation: Cumulative slippage tolerance",
    description: "The cumulative slippage tolerance is above the maximum allowed.",
  },
  [POLICY_VIOLATION_ONLY_REMOVE_DUST_EXTERNAL_POSITION]: {
    code: POLICY_VIOLATION_ONLY_REMOVE_DUST_EXTERNAL_POSITION,
    label: "Policy violation: Only remove dust external position",
    description: "The external position is not dust.",
  },
  [POLICY_VIOLATION_ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS]: {
    code: POLICY_VIOLATION_ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS,
    label: "Policy violation: Only untrack dust or priceless assets",
    description: "The asset is not dust or priceless.",
  },
  [POLICY_VIOLATION_ALLOWED_ASSETS_FOR_REDEMPTION]: {
    code: POLICY_VIOLATION_ALLOWED_ASSETS_FOR_REDEMPTION,
    label: "Policy violation: Allowed assets for redemption",
    description: "The asset is not allowed for redemption.",
  },
  [POLICY_VIOLATION_MIN_ASSET_BALANCES_POST_REDEMPTION]: {
    code: POLICY_VIOLATION_MIN_ASSET_BALANCES_POST_REDEMPTION,
    label: "Policy violation: Minimum asset balances post redemption",
    description: "The asset balance is below the minimum asset balance post redemption.",
  },
  [POLICY_VIOLATION_ALLOWED_DEPOSIT_RECIPIENTS]: {
    code: POLICY_VIOLATION_ALLOWED_DEPOSIT_RECIPIENTS,
    label: "Policy violation: Allowed deposit recipients",
    description: "The deposit recipient is not allowed for this vault.",
  },
  [POLICY_VIOLATION_ALLOWED_SHARES_TRANSFER_RECIPIENTS]: {
    code: POLICY_VIOLATION_ALLOWED_SHARES_TRANSFER_RECIPIENTS,
    label: "Policy violation: Allowed shares transfer recipients",
    description: "The shares transfer recipient is not allowed for this vault.",
  },
  [BUY_SHARES_MIN_SHARES_QUANTITY_TOO_LOW]: {
    code: BUY_SHARES_MIN_SHARES_QUANTITY_TOO_LOW,
    label: "Minimum shares quantity too low",
    description: "The minimum shares quantity is too low.",
  },
  [BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION]: {
    code: BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION,
    label: "Pending migration or reconfiguration",
    description: "The vault is pending migration or reconfiguration.",
  },
  [BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT]: {
    code: BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT,
    label: "Shares received insufficient",
    description: "The shares received is insufficient.",
  },
  [ASSET_MANAGER_ALREADY_REGISTERED]: {
    code: ASSET_MANAGER_ALREADY_REGISTERED,
    label: "Manager already registered",
    description: "The asset manager is already registered.",
  },
  [ASSET_MANAGER_NOT_REGISTERED]: {
    code: ASSET_MANAGER_NOT_REGISTERED,
    label: "Manager not registered",
    description: "The asset manager is not registered.",
  },
  [SHARES_REDEMPTION_UNEQUAL_ARRAYS]: {
    code: SHARES_REDEMPTION_UNEQUAL_ARRAYS,
    label: "Unequal arrays",
    description: "The payout amount and payout percentage arrays are unequal.",
  },
  [SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT]: {
    code: SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT,
    label: "Percents must total 100%",
    description: "Payout percentages must total 100%.",
  },
  [SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET]: {
    code: SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET,
    label: "Duplicate payout asset",
    description: "Duplicate payout asset.",
  },
  [SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET]: {
    code: SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET,
    label: "Zero amount for asset",
    description: "Zero amount for asset.",
  },
  [SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS]: {
    code: SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS,
    label: "Additional assets contains duplicates",
    description: "Additional assets contains duplicates",
  },
  [SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP]: {
    code: SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP,
    label: "Assets to skip contains duplicates",
    description: "Assets to skip contains duplicates",
  },
  [CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER]: {
    code: CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER,
    label: "Only the nominatedOwner can call this function",
    description: "Only the nominated owner can claim ownership of the vault",
  },
  [SET_NOMINATED_OWNER_CANNOT_BE_EMPTY]: {
    code: SET_NOMINATED_OWNER_CANNOT_BE_EMPTY,
    label: "Nominated Owner cannot be empty",
    description: "The nominated owner cannot be empty.",
  },
  [SET_NOMINATED_OWNER_ALREADY_OWNER]: {
    code: SET_NOMINATED_OWNER_ALREADY_OWNER,
    label: "Nominated Owner already owner",
    description: "The nominated owner is already the owner.",
  },
  [SET_NOMINATED_OWNER_ALREADY_NOMINATED]: {
    code: SET_NOMINATED_OWNER_ALREADY_NOMINATED,
    label: "Nominated Owner already nominated",
    description: "The nominated owner is alread nominated.",
  },
  [REMOVE_NOMINATED_OWNER_NO_OWNER]: {
    code: REMOVE_NOMINATED_OWNER_NO_OWNER,
    label: "There is no nominated owner",
    description: "There is no nominated owner.",
  },
  [RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID]: {
    code: RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID,
    label: "Fund is not valid",
    description: "Fund is not valid.",
  },
  [RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED]: {
    code: RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED,
    label: "Unauthorized",
    description: "Unauthorized.",
  },
  [ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET]: {
    code: ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET,
    label: "Unsupported asset",
    description: "Cannot add unsupported asset to tracked assets.",
  },
  [RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE]: {
    code: RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE,
    label: "Fund is not active",
    description: "Fund is not active",
  },
  [SPEND_ASSETS_ARRAYS_ARE_UNEQUAL]: {
    code: SPEND_ASSETS_ARRAYS_ARE_UNEQUAL,
    label: "Spend assets arrays unequal",
    description: "Spend assets arrays unequal",
  },
  [INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL]: {
    code: INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL,
    label: "Incoming assets arrays unequal",
    description: "Incoming assets arrays unequal",
  },
  [DUPLICATE_SPEND_ASSET]: {
    code: DUPLICATE_SPEND_ASSET,
    label: "Duplicate spend asset",
    description: "Duplicate spend asset",
  },
  [DUPLICATE_INCOMING_ASSET]: {
    code: DUPLICATE_INCOMING_ASSET,
    label: "Duplicate incoming asset",
    description: "Duplicate incoming asset",
  },
  [NON_RECEIVABLE_INCOMING_ASSET]: {
    code: NON_RECEIVABLE_INCOMING_ASSET,
    label: "Non-receivable incoming asset",
    description: "Non-receivable incoming asset",
  },
  [RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED]: {
    code: RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED,
    label: "Received incoming asset less than expected",
    description: "Received incoming asset less than expected",
  },
  [RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED]: {
    code: RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED,
    label: "Spent amount greater than expected",
    description: "Spent amount greater than expected",
  },
  [ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION]: {
    code: ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION,
    label: "Only the IntegrationManager can call this function",
    description: "Only the IntegrationManager can call this function",
  },
  [ADAPTER_SELECTOR_INVALID]: {
    code: ADAPTER_SELECTOR_INVALID,
    label: "Adapter selector invalid",
    description: "Adapter selector invalid",
  },
  [FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL]: {
    code: FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL,
    label: "Fees and settingsData array lengths unequal",
    description: "Fees and settingsData array lengths unequal",
  },
  [FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES]: {
    code: FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES,
    label: "Fees cannot include duplicates",
    description: "Fees cannot include duplicates",
  },
  [FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE]: {
    code: FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE,
    label: "Fee invoke hook fund is not active",
    description: "Fund is not active",
  },
  [RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID]: {
    code: RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID,
    label: "Invalid actionId",
    description: "Invalid actionId",
  },
  [SETTLE_FEE_INVALID_SETTLEMENT_TYPE]: {
    code: SETTLE_FEE_INVALID_SETTLEMENT_TYPE,
    label: "Invalid settlement type",
    description: "Invalid settlement type",
  },
  [CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID]: {
    code: CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID,
    label: "Invalid typeId",
    description: "Invalid typeId",
  },
  [REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION]: {
    code: REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION,
    label: "Account provided is not a valid external position",
    description: "Account provided is not a valid external position",
  },
  [REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION]: {
    code: REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION,
    label: "External position belongs to a different vault",
    description: "External position belongs to a different vault",
  },
  [UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS]: {
    code: UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS,
    label: "Unequal arrays",
    description: "Unequal arrays",
  },
  [UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST]: {
    code: UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST,
    label: "Type does not exist",
    description: "Type does not exist",
  },
  [ONLY_FUND_OWNER_CAN_CALL]: {
    code: ONLY_FUND_OWNER_CAN_CALL,
    label: "Only the fund owner can call this function",
    description: "Only the fund owner can call this function",
  },
  [POLICY_CANNOT_BE_DISABLED]: {
    code: POLICY_CANNOT_BE_DISABLED,
    label: "Policy cannot be disabled",
    description: "Policy cannot be disabled",
  },
  [ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS]: {
    code: ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS,
    label: "Policy restricts actions of current investors",
    description: "Policy restricts actions of current investors",
  },
  [POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL]: {
    code: POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL,
    label: "Policies and settingsData array lengths unequal",
    description: "Policies and settingsData array lengths unequal",
  },
  [POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL]: {
    code: POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL,
    label: "Caller not allowed",
    description: "Caller not allowed",
  },
  [POLICY_ALREADY_ENABLED]: {
    code: POLICY_ALREADY_ENABLED,
    label: "Policy is already enabled",
    description: "Policy is already enabled",
  },
};
