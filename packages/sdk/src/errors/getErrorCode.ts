import type { ContractFunctionRevertedError } from "viem";
import {
  POLICY_VIOLATION_MIN_MAX_INVESTMENT,
  type ErrorCode,
  BUY_SHARES_MIN_SHARES_QUANTITY_TOO_LOW,
  BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION,
  BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT,
  POLICY_VIOLATION_ALLOWED_ADAPTERS,
  POLICY_VIOLATION_ALLOWED_ADAPTERS_PER_MANAGER,
  POLICY_VIOLATION_ALLOWED_ADAPTER_INCOMING_ASSETS,
  POLICY_VIOLATION_ALLOWED_ASSETS_FOR_REDEMPTION,
  POLICY_VIOLATION_ALLOWED_DEPOSIT_RECIPIENTS,
  POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES,
  POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER,
  POLICY_VIOLATION_ALLOWED_SHARES_TRANSFER_RECIPIENTS,
  POLICY_VIOLATION_CUMULATIVE_SLIPPAGE_TOLERANCE,
  POLICY_VIOLATION_MIN_ASSET_BALANCES_POST_REDEMPTION,
  POLICY_VIOLATION_ONLY_REMOVE_DUST_EXTERNAL_POSITION,
  POLICY_VIOLATION_ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS,
  SAFE_ERC20_LOW_LEVEL_CALL_FAILED,
  ASSET_MANAGER_ALREADY_REGISTERED,
  ASSET_MANAGER_NOT_REGISTERED,
  CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER,
  SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS,
  SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP,
  SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET,
  SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT,
  SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET,
  SHARES_REDEMPTION_UNEQUAL_ARRAYS,
  REMOVE_NOMINATED_OWNER_NO_OWNER,
} from "./errorCodes.js";

export function getErrorCode(error: ContractFunctionRevertedError): ErrorCode | undefined {
  if (error.reason === undefined) {
    return undefined;
  }

  const [prefix, suffix] = error.reason.split(":", 2).map((value) => value.trim()) as [string, string | undefined];

  // TODO: This case would be for errors that do not follow the "prefix: reason" format.
  if (suffix === undefined) {
    return undefined;
  }

  switch (prefix) {
    case "SafeERC20": {
      switch (suffix) {
        case "low-level call failed":
          return SAFE_ERC20_LOW_LEVEL_CALL_FAILED;
      }

      return undefined;
    }

    case "Rule evaluated to false": {
      switch (suffix) {
        case "MIN_MAX_INVESTMENT":
          return POLICY_VIOLATION_MIN_MAX_INVESTMENT;
        case "ALLOWED_ADAPTER_INCOMING_ASSETS":
          return POLICY_VIOLATION_ALLOWED_ADAPTER_INCOMING_ASSETS;
        case "ALLOWED_ADAPTERS_PER_MANAGER":
          return POLICY_VIOLATION_ALLOWED_ADAPTERS_PER_MANAGER;
        case "ALLOWED_ADAPTERS":
          return POLICY_VIOLATION_ALLOWED_ADAPTERS;
        case "ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER":
          return POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES_PER_MANAGER;
        case "ALLOWED_EXTERNAL_POSITION_TYPES":
          return POLICY_VIOLATION_ALLOWED_EXTERNAL_POSITION_TYPES;
        case "CUMULATIVE_SLIPPAGE_TOLERANCE":
          return POLICY_VIOLATION_CUMULATIVE_SLIPPAGE_TOLERANCE;
        case "ONLY_REMOVE_DUST_EXTERNAL_POSITION":
          return POLICY_VIOLATION_ONLY_REMOVE_DUST_EXTERNAL_POSITION;
        case "ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS":
          return POLICY_VIOLATION_ONLY_UNTRACK_DUST_OR_PRICELESS_ASSETS;
        case "ALLOWED_ASSETS_FOR_REDEMPTION":
          return POLICY_VIOLATION_ALLOWED_ASSETS_FOR_REDEMPTION;
        case "MIN_ASSET_BALANCES_POST_REDEMPTION":
          return POLICY_VIOLATION_MIN_ASSET_BALANCES_POST_REDEMPTION;
        case "ALLOWED_DEPOSIT_RECIPIENTS":
          return POLICY_VIOLATION_ALLOWED_DEPOSIT_RECIPIENTS;
        case "ALLOWED_SHARES_TRANSFER_RECIPIENTS":
          return POLICY_VIOLATION_ALLOWED_SHARES_TRANSFER_RECIPIENTS;
      }

      return undefined;
    }

    case "__buyShares": {
      switch (suffix) {
        case "_minSharesQuantity must be >0":
          return BUY_SHARES_MIN_SHARES_QUANTITY_TOO_LOW;
        case "Pending migration or reconfiguration":
          return BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION;
        case "Shares received < _minSharesQuantity":
          return BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT;
      }

      return undefined;
    }

    case "addAssetManagers": {
      switch (suffix) {
        case "Manager already registered":
          return ASSET_MANAGER_ALREADY_REGISTERED;
      }

      return undefined;
    }

    case "removeAssetManagers": {
      switch (suffix) {
        case "Manager not registered":
          return ASSET_MANAGER_NOT_REGISTERED;
      }

      return undefined;
    }

    case "claimOwnership": {
      switch (suffix) {
        case "Only the nominatedOwner can call this function":
          return CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER;
      }

      return undefined;
    }

    case "removeNominatedOwner": {
      switch (suffix) {
        case "There is no nominated owner":
          return REMOVE_NOMINATED_OWNER_NO_OWNER;
      }

      return undefined;
    }

    case "redeemSharesInKind": {
      switch (suffix) {
        case "_additionalAssets contains duplicates":
          return SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS;
        case "_assetsToSkip contains duplicates":
          return SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP;
      }

      return undefined;
    }

    case "__payoutSpecifiedAssetPercentages": {
      switch (suffix) {
        case "Zero amount for asset":
          return SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET;
        case "Percents must total 100%":
          return SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT;
      }

      return undefined;
    }

    case "redeemSharesForSpecificAssets": {
      switch (suffix) {
        case "Duplicate payout asset":
          return SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET;
        case "Unequal arrays":
          return SHARES_REDEMPTION_UNEQUAL_ARRAYS;
      }

      return undefined;
    }
  }

  return undefined;
}
