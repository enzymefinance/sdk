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
  SET_NOMINATED_OWNER_ALREADY_NOMINATED,
  SET_NOMINATED_OWNER_ALREADY_OWNER,
  SET_NOMINATED_OWNER_CANNOT_BE_EMPTY,
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
} from "./errorCodes.js";

/**
 * Returns the protocol specific revert code for a given error or undefined if no match was found.
 *
 * @param error The contract function revert error to get the code for.
 * @returns The protocol specific code for the given error or undefined if no match was found.
 */
export function getErrorCode(error: ContractFunctionRevertedError): ErrorCode | undefined {
  if (error.reason === undefined) {
    return undefined;
  }

  const [prefix, suffix] = error.reason.split(":", 2).map((value) => value.trim()) as [string, string | undefined];

  // TODO: This case would be for errors that do not follow the "prefix: reason" format.
  if (suffix === undefined) {
    switch (prefix) {
      case "Only the IntegrationManager can call this function":
        return ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION;
      case "Only the fund owner can call this function":
        return ONLY_FUND_OWNER_CAN_CALL;
    }
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

    case "setNominatedOwner": {
      switch (suffix) {
        case "_nextNominatedOwner cannot be empty":
          return SET_NOMINATED_OWNER_CANNOT_BE_EMPTY;
        case "_nextNominatedOwner is already the owner":
          return SET_NOMINATED_OWNER_ALREADY_OWNER;
        case "_nextNominatedOwner is already nominated":
          return SET_NOMINATED_OWNER_ALREADY_NOMINATED;
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

    case "receiveCallFromComptroller": {
      switch (suffix) {
        case "Fund is not valid":
          return RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID;
        case "Unauthorized":
          return RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED;
        case "Fund is not active":
          return RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE;
        case "Invalid _actionId":
          return RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID;
      }

      return undefined;
    }

    case "__addTrackedAssetsToVault": {
      switch (suffix) {
        case "Unsupported asset":
          return ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET;
      }

      return undefined;
    }

    case "__preProcessCoI": {
      switch (suffix) {
        case "Spend assets arrays unequal":
          return SPEND_ASSETS_ARRAYS_ARE_UNEQUAL;
        case "Incoming assets arrays unequal":
          return INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL;
        case "Duplicate spend asset":
          return DUPLICATE_SPEND_ASSET;
        case "Duplicate incoming asset":
          return DUPLICATE_INCOMING_ASSET;
        case "Non-receivable incoming asset":
          return NON_RECEIVABLE_INCOMING_ASSET;
      }

      return undefined;
    }

    case "__postProcessCoI": {
      switch (suffix) {
        case "Received incoming asset less than expected":
          return RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED;
        case "Spent amount greater than expected":
          return RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED;
      }

      return undefined;
    }

    case "parseAssetsForAction": {
      switch (suffix) {
        case "_selector invalid":
          return ADAPTER_SELECTOR_INVALID;
      }

      return undefined;
    }

    case "setConfigForFund": {
      switch (suffix) {
        case "fees and settingsData array lengths unequal":
          return FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL;
        case "fees cannot include duplicates":
          return FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES;
        case "policies and settingsData array lengths unequal":
          return POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL;
      }

      return undefined;
    }

    case "__invokeHook": {
      switch (suffix) {
        case "Fund is not active":
          return FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE;
      }

      return undefined;
    }

    case "__settleFee": {
      switch (suffix) {
        case "Invalid SettlementType":
          return SETTLE_FEE_INVALID_SETTLEMENT_TYPE;
      }

      return undefined;
    }

    case "__createExternalPosition": {
      switch (suffix) {
        case "Invalid typeId":
          return CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID;
      }

      return undefined;
    }

    case "__reactivateExternalPosition": {
      switch (suffix) {
        case "Account provided is not a valid external position":
          return REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION;
        case "External position belongs to a different vault":
          return REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION;
      }

      return undefined;
    }

    case "updateExternalPositionTypesInfo": {
      switch (suffix) {
        case "Unequal arrays":
          return UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS;
        case "Type does not exist":
          return UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST;
      }

      return undefined;
    }

    case "disablePolicyForFund": {
      switch (suffix) {
        case "_policy cannot be disabled":
          return POLICY_CANNOT_BE_DISABLED;
      }

      return undefined;
    }

    case "enablePolicyForFund": {
      switch (suffix) {
        case "_policy restricts actions of current investors":
          return ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS;
      }

      return undefined;
    }

    case "validatePolicies": {
      switch (suffix) {
        case "Caller not allowed":
          return POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL;
      }

      return undefined;
    }

    case "__enablePolicyForFund": {
      switch (suffix) {
        case "Policy is already enabled":
          return POLICY_ALREADY_ENABLED;
      }

      return undefined;
    }
  }

  return undefined;
}
