import { type Address } from "viem";
import {
  prepareCallOnAaveV2LendParams,
  prepareCallOnAaveV2RedeemParams,
  type AaveV2LendTrade,
  type AaveV2RedeemTrade,
} from "../integrations/aaveV2.js";
import { Integration } from "../enums.js";

export type PrepareTradeParams = AaveV2LendTrade | AaveV2RedeemTrade;

export type PrepareAdapterTradeParams = {
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The trade to prepare.
   */
  trade: PrepareTradeParams;
};

/**
 * Prepare a trade to be executed via an integration adapter.
 *
 * @returns The prepared arguments to pass to the `callOnExtension` action.
 */
export function prepareAdapterTrade({ trade, integrationManager }: PrepareAdapterTradeParams) {
  switch (trade.type) {
    case Integration.AaveV2Lend:
      return prepareCallOnAaveV2LendParams({ integrationManager, callArgs: trade.callArgs });
    case Integration.AaveV2Redeem:
      return prepareCallOnAaveV2RedeemParams({ integrationManager, callArgs: trade.callArgs });
  }
}
