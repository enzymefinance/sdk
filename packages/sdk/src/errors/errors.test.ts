import { expect, test } from "vitest";
import { createMockedError } from "../../tests/error.js";
import { catchError, EnzymeError } from "./catchError.js";
import {
  ADAPTER_SELECTOR_INVALID,
  ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET,
  CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID,
  DUPLICATE_INCOMING_ASSET,
  DUPLICATE_SPEND_ASSET,
  ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS,
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
  REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION,
  REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION,
  RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED,
  RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED,
  RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE,
  RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID,
  RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID,
  RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED,
  SETTLE_FEE_INVALID_SETTLEMENT_TYPE,
  SPEND_ASSETS_ARRAYS_ARE_UNEQUAL,
  UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST,
  UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS,
} from "./errorCodes.js";

test("should parse properly catched error: receiveCallFromComptroller: Fund is not valid", () => {
  expect(catchError(createMockedError("receiveCallFromComptroller: Fund is not valid"))).toEqual(
    new EnzymeError(RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_VALID),
  );
});

test("should parse properly catched error: receiveCallFromComptroller: Unauthorized", () => {
  expect(catchError(createMockedError("receiveCallFromComptroller: Unauthorized"))).toEqual(
    new EnzymeError(RECEIVE_CALL_FROM_COMPTROLLER_UNAUTHORIZED),
  );
});

test("should parse properly catched error: __addTrackedAssetsToVault: Unsupported asset", () => {
  expect(catchError(createMockedError("__addTrackedAssetsToVault: Unsupported asset"))).toEqual(
    new EnzymeError(ADD_TRACKED_ASSETS_TO_VAULT_UNSUPPORTED_ASSET),
  );
});

test("should parse properly catched error: receiveCallFromComptroller: Fund is not active", () => {
  expect(catchError(createMockedError("receiveCallFromComptroller: Fund is not active"))).toEqual(
    new EnzymeError(RECEIVE_CALL_FROM_COMPTROLLER_FUND_IS_NOT_ACTIVE),
  );
});

test("should parse properly catched error: __preProcessCoI: Spend assets arrays unequal", () => {
  expect(catchError(createMockedError("__preProcessCoI: Spend assets arrays unequal"))).toEqual(
    new EnzymeError(SPEND_ASSETS_ARRAYS_ARE_UNEQUAL),
  );
});

test("should parse properly catched error: __preProcessCoI: Incoming assets arrays unequal", () => {
  expect(catchError(createMockedError("__preProcessCoI: Incoming assets arrays unequal"))).toEqual(
    new EnzymeError(INCOMING_ASSETS_ARRAYS_ARE_UNEQUAL),
  );
});

test("should parse properly catched error: __preProcessCoI: Duplicate spend asset", () => {
  expect(catchError(createMockedError("__preProcessCoI: Duplicate spend asset"))).toEqual(
    new EnzymeError(DUPLICATE_SPEND_ASSET),
  );
});

test("should parse properly catched error: __preProcessCoI: Duplicate incoming asset", () => {
  expect(catchError(createMockedError("__preProcessCoI: Duplicate incoming asset"))).toEqual(
    new EnzymeError(DUPLICATE_INCOMING_ASSET),
  );
});

test("should parse properly catched error: __preProcessCoI: Non-receivable incoming asset", () => {
  expect(catchError(createMockedError("__preProcessCoI: Non-receivable incoming asset"))).toEqual(
    new EnzymeError(NON_RECEIVABLE_INCOMING_ASSET),
  );
});

test("should parse properly catched error: __postProcessCoI: Received incoming asset less than expected", () => {
  expect(catchError(createMockedError("__postProcessCoI: Received incoming asset less than expected"))).toEqual(
    new EnzymeError(RECEIVED_INCOMING_ASSET_IS_LESS_THAN_EXPECTED),
  );
});

test("should parse properly catched error: __postProcessCoI: Spent amount greater than expected", () => {
  expect(catchError(createMockedError("__postProcessCoI: Spent amount greater than expected"))).toEqual(
    new EnzymeError(RECEIVED_INCOMING_ASSET_IS_GREATER_THAN_EXPECTED),
  );
});

test("should parse properly catched error: Only the IntegrationManager can call this function", () => {
  expect(catchError(createMockedError("Only the IntegrationManager can call this function"))).toEqual(
    new EnzymeError(ONLY_THE_INTEGRATION_MANAGER_CAN_CALL_THIS_FUNCTION),
  );
});

test("should parse properly catched error: parseAssetsForAction: _selector invalid", () => {
  expect(catchError(createMockedError("parseAssetsForAction: _selector invalid"))).toEqual(
    new EnzymeError(ADAPTER_SELECTOR_INVALID),
  );
});

test("should parse properly catched error: setConfigForFund: fees and settingsData array lengths unequal", () => {
  expect(catchError(createMockedError("setConfigForFund: fees and settingsData array lengths unequal"))).toEqual(
    new EnzymeError(FEES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL),
  );
});

test("should parse properly catched error: setConfigForFund: fees cannot include duplicates", () => {
  expect(catchError(createMockedError("setConfigForFund: fees cannot include duplicates"))).toEqual(
    new EnzymeError(FEES_AND_SETTINGS_DATA_ARRAY_INCLUDE_DUPLICATES),
  );
});

test("should parse properly catched error: __invokeHook: Fund is not active", () => {
  expect(catchError(createMockedError("__invokeHook: Fund is not active"))).toEqual(
    new EnzymeError(FEE_INVOKE_HOOK_FUND_IS_NOT_ACTIVE),
  );
});

test("should parse properly catched error: receiveCallFromComptroller: Invalid _actionId", () => {
  expect(catchError(createMockedError("receiveCallFromComptroller: Invalid _actionId"))).toEqual(
    new EnzymeError(RECEIVE_CALL_FROM_COMPTROLLER_INVALID_ACTION_ID),
  );
});

test("should parse properly catched error: __settleFee: Invalid SettlementType", () => {
  expect(catchError(createMockedError("__settleFee: Invalid SettlementType"))).toEqual(
    new EnzymeError(SETTLE_FEE_INVALID_SETTLEMENT_TYPE),
  );
});

test("should parse properly catched error: __createExternalPosition: Invalid typeId", () => {
  expect(catchError(createMockedError("__createExternalPosition: Invalid typeId"))).toEqual(
    new EnzymeError(CREATE_EXTERNAL_POSITION_INVALID_TYPE_ID),
  );
});

test("should parse properly catched error: __reactivateExternalPosition: Account provided is not a valid external position", () => {
  expect(
    catchError(createMockedError("__reactivateExternalPosition: Account provided is not a valid external position")),
  ).toEqual(new EnzymeError(REACTIVATE_EXTERNAL_POSITION_INVALID_EXTERNAL_POSITION));
});

test("should parse properly catched error: __reactivateExternalPosition: External position belongs to a different vault", () => {
  expect(
    catchError(createMockedError("__reactivateExternalPosition: External position belongs to a different vault")),
  ).toEqual(new EnzymeError(REACTIVATE_EXTERNAL_POSITION_VAULT_NOT_OWNER_OF_EXTERNAL_POSITION));
});

test("should parse properly catched error: updateExternalPositionTypesInfo: Unequal arrays", () => {
  expect(catchError(createMockedError("updateExternalPositionTypesInfo: Unequal arrays"))).toEqual(
    new EnzymeError(UPDATE_EXTERNAL_POSITION_TYPES_INFO_UNEQUAL_ARRAYS),
  );
});

test("should parse properly catched error: updateExternalPositionTypesInfo: Type does not exist", () => {
  expect(catchError(createMockedError("updateExternalPositionTypesInfo: Type does not exist"))).toEqual(
    new EnzymeError(UPDATE_EXTERNAL_POSITION_TYPES_INFO_TYPE_NOT_EXIST),
  );
});

test("should parse properly catched error: Only the fund owner can call this function", () => {
  expect(catchError(createMockedError("Only the fund owner can call this function"))).toEqual(
    new EnzymeError(ONLY_FUND_OWNER_CAN_CALL),
  );
});

test("should parse properly catched error: disablePolicyForFund: _policy cannot be disabled", () => {
  expect(catchError(createMockedError("disablePolicyForFund: _policy cannot be disabled"))).toEqual(
    new EnzymeError(POLICY_CANNOT_BE_DISABLED),
  );
});

test("should parse properly catched error: enablePolicyForFund: _policy restricts actions of current investors", () => {
  expect(catchError(createMockedError("enablePolicyForFund: _policy restricts actions of current investors"))).toEqual(
    new EnzymeError(ENABLING_POLICY_RESTRICTS_ACTIONS_OF_CURRENT_INVESTORS),
  );
});

test("should parse properly catched error: setConfigForFund: policies and settingsData array lengths unequal", () => {
  expect(catchError(createMockedError("setConfigForFund: policies and settingsData array lengths unequal"))).toEqual(
    new EnzymeError(POLICIES_AND_SETTINGS_DATA_ARRAY_ARE_UNEQUAL),
  );
});

test("should parse properly catched error: validatePolicies: Caller not allowed", () => {
  expect(catchError(createMockedError("validatePolicies: Caller not allowed"))).toEqual(
    new EnzymeError(POLICY_RULE_INAVLID_CALLER_NOT_ALLOWED_TO_PERFORM_CALL),
  );
});

test("should parse properly catched error: __enablePolicyForFund: Policy is already enabled", () => {
  expect(catchError(createMockedError("__enablePolicyForFund: Policy is already enabled"))).toEqual(
    new EnzymeError(POLICY_ALREADY_ENABLED),
  );
});
