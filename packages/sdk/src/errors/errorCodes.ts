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
    description: "The asset manager is already registered",
  },
};
