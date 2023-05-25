import { LEND_SELECTOR, REDEEM_SELECTOR } from "../../constants/selectors.js";
import type { Prettify } from "../../utils/types.js";
import { IntegrationManagerActionId, prepareCallOnExtensionParams } from "../callOnExtension.js";
import { encodeCallOnIntegrationArgs } from "./callOnIntegration.js";
import { encodeAaveV2LendArgs, encodeAaveV2RedeemArgs } from "./instances/aaveV2.js";
import { Integration, type IntegrationArgs } from "./integrationTypes.js";
import type { Address, Hex } from "viem";

export type TypedIntegrationCallArgs = {
  [TKey in keyof IntegrationArgs]: Prettify<{ type: TKey } & IntegrationArgs[TKey]>;
}[keyof IntegrationArgs];

export type PrepareUseIntegrationParams = {
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The address of the integration adapter contract.
   */
  integrationAdapter: Address;
  /**
   * The trade to prepare.
   */
  callArgs: TypedIntegrationCallArgs;
};

/**
 * Prepare a trade to be executed via an integration adapter.
 *
 * @returns The prepared arguments to pass to the `callOnExtension` action.
 */

export function prepareUseIntegration({
  callArgs,
  integrationAdapter,
  integrationManager,
}: PrepareUseIntegrationParams) {
  const [selector, data] = encodeIntegrationCallArgs(callArgs);

  return prepareCallOnExtensionParams({
    extension: integrationManager,
    actionId: IntegrationManagerActionId.CallOnIntegration,
    callArgs: encodeCallOnIntegrationArgs({
      integrationData: data,
      adapter: integrationAdapter,
      selector,
    }),
  });
}

export function encodeIntegrationCallArgs(callArgs: TypedIntegrationCallArgs): [selector: Hex, data: Hex] {
  switch (callArgs.type) {
    case Integration.AaveV2Lend:
      return [LEND_SELECTOR, encodeAaveV2LendArgs(callArgs)];
    case Integration.AaveV2Redeem:
      return [REDEEM_SELECTOR, encodeAaveV2RedeemArgs(callArgs)];
  }
}