import { ZERO_ADDRESS } from "../../constants/misc.js";
import type { Prettify } from "../../utils/types.js";
import { ExternalPositionManagerActionId, prepareCallOnExtensionParams } from "../callOnExtension.js";
import { encodeCreateExternalPositionArgs } from "./createExternalPosition.js";
import type { ExternalPositionArgs } from "./externalPositionTypes.js";
import { encodeExternalPositionCallArgs } from "./prepareUseExternalPosition.js";
import type { Address, Hex } from "viem";

export type TypedExternalPositionCallArgsOnCreation = {
  [TKey in keyof ExternalPositionArgs]: Prettify<
    { type: TKey } & Omit<ExternalPositionArgs[TKey], "externalPositionProxy">
  >;
}[keyof ExternalPositionArgs];

export type PrepareCreateExternalPositionParams = {
  /**
   * The address of the `externalPositionManager` contract.
   */
  externalPositionManager: Address;
  typeId: bigint;
  callArgs?: TypedExternalPositionCallArgsOnCreation | undefined;
};

/**
 * Prepare a trade to be executed via an external position manager.
 *
 * @returns The prepared arguments to pass to the `callOnExtension` action.
 */
export function prepareCreateExternalPosition({
  callArgs,
  typeId,
  externalPositionManager,
}: PrepareCreateExternalPositionParams) {
  let callOnExternalPositionCallArgs: Hex = "0x";

  if (callArgs !== undefined) {
    callOnExternalPositionCallArgs = encodeExternalPositionCallArgs({
      ...callArgs,
      externalPositionProxy: ZERO_ADDRESS,
    });
  }

  return prepareCallOnExtensionParams({
    extension: externalPositionManager,
    actionId: ExternalPositionManagerActionId.CreateExternalPosition,
    callArgs: encodeCreateExternalPositionArgs({
      typeId,
      callOnExternalPositionCallArgs,
    }),
  });
}
