import type { Prettify } from "../../utils/types.js";
import { ExternalPositionManagerActionId, prepareCallOnExtensionParams } from "../callOnExtension.js";
import { ExternalPosition, type ExternalPositionArgs } from "./externalPositionTypes.js";
import { encodeKilnStakeArgs } from "./instances/kiln.js";
import type { Address } from "viem";

export type TypedExternalPositionCallArgs = {
  [TKey in keyof ExternalPositionArgs]: Prettify<{ type: TKey } & ExternalPositionArgs[TKey]>;
}[keyof ExternalPositionArgs];

export type PrepareUseExternalPositionParams = {
  /**
   * The address of the `externalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The trade to prepare.
   */
  callArgs: TypedExternalPositionCallArgs;
};

export function prepareUseExternalPosition({ callArgs, externalPositionManager }: PrepareUseExternalPositionParams) {
  return prepareCallOnExtensionParams({
    extension: externalPositionManager,
    actionId: ExternalPositionManagerActionId.CallOnExternalPosition,
    callArgs: encodeExternalPositionCallArgs(callArgs),
  });
}

export function encodeExternalPositionCallArgs(callArgs: TypedExternalPositionCallArgs) {
  switch (callArgs.type) {
    case ExternalPosition.KilnStake:
      return encodeKilnStakeArgs(callArgs);
  }
}
