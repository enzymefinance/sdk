import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// WRAP
//--------------------------------------------------------------------------------------------

export const wrap = IntegrationManager.makeUse(IntegrationManager.Selector.Wrap, wrapEncode);

const wrapEncoding = [
  {
    name: "vaultProxy",
    type: "address",
  },
  {
    name: "callData",
    type: "bytes",
  },
] as const;

const callDataEncoding = [
  {
    name: "outgoingAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type WrapArgs = {
  vaultProxy: Address;
  outgoingAmount: bigint;
  minIncomingAmount: bigint;
};

export function wrapEncode(args: WrapArgs): Hex {
  const callData = encodeAbiParameters(callDataEncoding, [args.outgoingAmount, args.minIncomingAmount]);

  return encodeAbiParameters(wrapEncoding, [args.vaultProxy, callData]);
}

export function wrapDecode(encoded: Hex): WrapArgs {
  const [vaultProxy, callData] = decodeAbiParameters(wrapEncoding, encoded);

  const [outgoingAmount, minIncomingAmount] = decodeAbiParameters(callDataEncoding, callData);

  return {
    vaultProxy,
    outgoingAmount,
    minIncomingAmount,
  };
}
