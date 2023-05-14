import { ExternalPosition, ExternalPositionManagerActionId } from "../enums.js";
import { type KilnStakeTrade, encodeCallArgsForKilnStake } from "../externalPositions/kiln.js";
import { prepareCallOnExtensionParams } from "./callOnExtension.js";
import type { Address } from "viem";

export type PrepareExternalPositionPrepareTradeOptionParams = KilnStakeTrade;

export type PrepareExternalPositionTradeParams = {
  /**
   * The address of the `externalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The trade to prepare.
   */
  trade: PrepareExternalPositionPrepareTradeOptionParams;
};

export function prepareExternalPositionTrade({ trade, externalPositionManager }: PrepareExternalPositionTradeParams) {
  return prepareCallOnExtensionParams({
    extension: externalPositionManager,
    actionId: ExternalPositionManagerActionId.CallOnExternalPosition,
    callArgs: encodeExternalPositionTrade(trade),
  });
}

export function encodeExternalPositionTrade(trade: PrepareExternalPositionPrepareTradeOptionParams) {
  switch (trade.type) {
    case ExternalPosition.KilnStake:
      return encodeCallArgsForKilnStake(trade.callArgs);
  }
}
