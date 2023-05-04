import { type Address } from "viem";
import { ExternalPosition, ExternalPositionManagerActionId } from "../enums.js";
import { prepareCallOnExtensionParams } from "./callOnExtension.js";
import { encodeCallArgsForKilnStake, type KilnStakeTrade } from "../externalPositions/kiln.js";

export type PrepareTradeParams = KilnStakeTrade;

export type PrepareExternalPositionTradeParams = {
  /**
   * The address of the `externalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The trade to prepare.
   */
  trade: PrepareTradeParams;
};

export function prepareExternalPositionTrade({ trade, externalPositionManager }: PrepareExternalPositionTradeParams) {
  return prepareCallOnExtensionParams({
    extension: externalPositionManager,
    actionId: ExternalPositionManagerActionId.CallOnExternalPosition,
    callArgs: encodeExternalPositionTrade(trade),
  });
}

export function encodeExternalPositionTrade(trade: PrepareTradeParams) {
  switch (trade.type) {
    case ExternalPosition.KilnStake:
      return encodeCallArgsForKilnStake(trade.callArgs);
  }
}
