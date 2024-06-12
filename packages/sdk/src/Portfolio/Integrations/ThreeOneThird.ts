import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// takeOrder
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

const tradesEncoding = {
  components: [
    { name: "exchangeName", type: "string" },
    { name: "from", type: "address" },
    { name: "fromAmount", type: "uint256" },
    { name: "to", type: "address" },
    { name: "minToReceiveBeforeFees", type: "uint256" },
    { name: "data", type: "bytes" },
    { name: "signature", type: "bytes" },
  ],
  name: "trades",
  type: "tuple[]",
} as const;

const takeOrderEncoding = [
  tradesEncoding,
  {
    name: "checkFeelessWallets",
    type: "bool",
  },
] as const;

export type Trade = {
  exchangeName: string;
  from: Address;
  fromAmount: bigint;
  to: Address;
  minToReceiveBeforeFees: bigint;
  data: Hex;
  signature: Hex;
};

export type takeOrderArgs = {
  trades: Readonly<Array<Trade>>;
  checkFeelessWallets: boolean;
};

export function takeOrderEncode(args: takeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [args.trades, args.checkFeelessWallets]);
}

export function takeOrderDecode(encoded: Hex): takeOrderArgs {
  const [trades, checkFeelessWallets] = decodeAbiParameters(takeOrderEncoding, encoded);

  return {
    trades,
    checkFeelessWallets,
  };
}

//--------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
//--------------------------------------------------------------------------------------------

const batchTradeEncoding = [
  tradesEncoding,
  {
    components: [
      { name: "checkFeelessWallets", type: "bool" },
      { name: "revertOnError", type: "bool" },
    ],
    name: "config",
    type: "tuple",
  },
] as const;

export function decodeBatchTrade(encoded: Hex): {
  trades: Readonly<Array<Trade>>;
  config: { checkFeelessWallets: boolean; revertOnError: boolean };
} {
  const [trades, config] = decodeAbiParameters(batchTradeEncoding, encoded);

  return {
    trades,
    config,
  };
}
