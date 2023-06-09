import { createTestRevert } from "../../tests/error.js";
import { EnzymeError, catchError } from "./catchError.js";
import {
  ADAPTER_SELECTOR_INVALID,
  ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET,
  ASSET_MANAGER_ALREADY_REGISTERED,
  ASSET_MANAGER_NOT_REGISTERED,
  CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER,
  CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID,
  DUPLICATE_INCOMING_ASSET,
  DUPLICATE_SPEND_ASSET,
  ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS,
  type ErrorCode,
  FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL,
  FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES,
  FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE,
  INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL,
  NON_RECEIVABLE_INCOMING_ASSET,
  ONLY_FUND_OWNER_CAN_CALL,
  ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION,
  POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL,
  POLICY_ALREADY_ENABLED,
  POLICY_CANNOT_BE_DISABLED,
  POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL,
  POLICY_VIOLATION_MIN_MAX_INVESTMENT,
  REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION,
  REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION,
  RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED,
  RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED,
  RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE,
  RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID,
  RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID,
  RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED,
  REMOVE_NOMINATED_OWNER_NO_OWNER,
  SETTLE_FEE_INVALID_SETTLEMENT_TYPE,
  SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS,
  SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP,
  SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET,
  SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT,
  SHARES_REDEMPTION_UNEQUAL_ARRAYS,
  SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET,
  SPEND_ASSETS_ARRAYS_ARE_UNEQUAL,
  UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST,
  UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS,
} from "./errorCodes.js";
import { expect, test } from "vitest";

test.each<[string, ErrorCode]>([
  ["receiveCallFromComptroller: Fund is not valid", RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID],
  ["receiveCallFromComptroller: Unauthorized", RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED],
  ["__addTrackedAssetsToVault: Unsupported asset", ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET],
  ["receiveCallFromComptroller: Fund is not active", RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE],
  ["__preProcessCoI: Spend assets arrays unequal", SPEND_ASSETS_ARRAYS_ARE_UNEQUAL],
  ["__preProcessCoI: Incoming assets arrays unequal", INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL],
  ["__preProcessCoI: Duplicate spend asset", DUPLICATE_SPEND_ASSET],
  ["__preProcessCoI: Duplicate incoming asset", DUPLICATE_INCOMING_ASSET],
  ["__preProcessCoI: Non-receivable incoming asset", NON_RECEIVABLE_INCOMING_ASSET],
  ["__postProcessCoI: Received incoming asset less than expected", RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED],
  ["__postProcessCoI: Spent amount greater than expected", RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED],
  ["Only the IntegrationManager can call this function", ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION],
  ["parseAssetsForAction: _selector invalid", ADAPTER_SELECTOR_INVALID],
  ["setConfigForFund: fees and settingsData array lengths unequal", FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL],
  ["setConfigForFund: fees cannot include duplicates", FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES],
  ["__invokeHook: Fund is not active", FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE],
  ["receiveCallFromComptroller: Invalid _actionId", RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID],
  ["__settleFee: Invalid SettlementType", SETTLE_FEE_INVALID_SETTLEMENT_TYPE],
  ["__createExternalPosition: Invalid typeId", CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID],
  [
    "__reactivateExternalPosition: Account provided is not a valid external position",
    REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION,
  ],
  [
    "__reactivateExternalPosition: External position belongs to a different vault",
    REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION,
  ],
  ["updateExternalPositionTypesInfo: Unequal arrays", UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS],
  ["updateExternalPositionTypesInfo: Type does not exist", UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST],
  ["Only the fund owner can call this function", ONLY_FUND_OWNER_CAN_CALL],
  ["disablePolicyForFund: _policy cannot be disabled", POLICY_CANNOT_BE_DISABLED],
  [
    "enablePolicyForFund: _policy restricts actions of current investors",
    ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS,
  ],
  ["setConfigForFund: policies and settingsData array lengths unequal", POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL],
  ["validatePolicies: Caller not allowed", POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL],
  ["__enablePolicyForFund: Policy is already enabled", POLICY_ALREADY_ENABLED],
  ["addAssetManagers: Manager already registered", ASSET_MANAGER_ALREADY_REGISTERED],
  ["Rule evaluated to false: MIN_MAX_INVESTMENT", POLICY_VIOLATION_MIN_MAX_INVESTMENT],
  ["claimOwnership: Only the nominatedOwner can call this function", CLAIM_OWNERSHIP_ONLY_BY_NOMINATED_OWNER],
  ["redeemSharesForSpecificAssets: Unequal arrays", SHARES_REDEMPTION_UNEQUAL_ARRAYS],
  ["__payoutSpecifiedAssetPercentages: Percents must total 100%", SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT],
  ["redeemSharesForSpecificAssets: Duplicate payout asset", SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET],
  ["__payoutSpecifiedAssetPercentages: Zero amount for asset", SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET],
  ["redeemSharesInKind: _additionalAssets contains duplicates", SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS],
  ["redeemSharesInKind: _assetsToSkip contains duplicates", SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP],
  ["removeAssetManagers: Manager not registered", ASSET_MANAGER_NOT_REGISTERED],
  ["removeNominatedOwner: There is no nominated owner", REMOVE_NOMINATED_OWNER_NO_OWNER],
  ["__payoutSpecifiedAssetPercentages: Zero amount for asset", SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET],
])("should parse properly catched error: %s", (message, code) => {
  expect(catchError(createTestRevert(message))).toEqual(new EnzymeError(code));
});
