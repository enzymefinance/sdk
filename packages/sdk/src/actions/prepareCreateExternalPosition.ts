import { type Address } from "viem";
import { ExternalPositionManagerActionId } from "../enums.js";
import { prepareCallOnExtensionParams } from "./callOnExtension.js";
import { encodeCallArgsForCreateExternalPosition } from "../externalPositions/createExternalPosition.js";
import { encodeExternalPositionTrade, type PrepareTradeParams } from "./prepareExternalPositionTrade.js";
import { ZERO_ADDRESS } from "../constants/misc.js";

interface Trade extends Omit<PrepareTradeParams, "callArgs"> {
  callArgs: Omit<PrepareTradeParams["callArgs"], "externalPositionProxy">;
}

export type PrepareCreateExternalPositionTradeParams = {
  /**
   * The address of the `externalPositionManager` contract.
   */
  externalPositionManager: Address;

  typeId: bigint;

  trade?: Trade;
};

/**
 * Prepare a trade to be executed via an external position manager.
 *
 * @returns The prepared arguments to pass to the `callOnExtension` action.
 */
export function prepareCreateExternalPosition({
  trade,
  typeId,
  externalPositionManager,
}: PrepareCreateExternalPositionTradeParams) {
  return prepareCallOnExtensionParams({
    extension: externalPositionManager,
    actionId: ExternalPositionManagerActionId.CreateExternalPosition,
    callArgs: encodeCallArgsForCreateExternalPosition({
      typeId,
      callOnExternalPositionCallArgs:
        trade === undefined
          ? "0x"
          : encodeExternalPositionTrade({
              type: trade.type,
              callArgs: { ...trade.callArgs, externalPositionProxy: ZERO_ADDRESS },
            }),
    }),
  });
}
