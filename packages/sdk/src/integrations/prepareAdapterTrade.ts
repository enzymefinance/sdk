import { type Address } from "viem";
import {
  prepareCallOnAaveV2LendParams,
  prepareCallOnAaveV2RedeemParams,
  type AaveV2LendTrade,
  type AaveV2RedeemTrade,
} from "./aaveV2.js";
import { Integration } from "../enums.js";

export type PrepareTradeParams = AaveV2LendTrade | AaveV2RedeemTrade;

export function prepareAdapterTrade({
  trade,
  integrationManager,
}: { trade: PrepareTradeParams; integrationManager: Address }) {
  switch (trade.type) {
    case Integration.AaveV2Lend:
      return prepareCallOnAaveV2LendParams({ integrationManager, callArgs: trade.callArgs });
    case Integration.AaveV2Redeem:
      return prepareCallOnAaveV2RedeemParams({ integrationManager, callArgs: trade.callArgs });
  }
}
