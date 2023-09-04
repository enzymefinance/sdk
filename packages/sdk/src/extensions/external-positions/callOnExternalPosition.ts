import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const callOnExternalPositionArgsEncoding = [
  {
    type: "address",
    name: "externalPositionProxy",
  },
  {
    name: "actionId",
    type: "uint256",
  },
  {
    type: "bytes",
    name: "actionArgs",
  },
] as const;

export type CallOnExternalPositionArgs = {
  externalPositionProxy: Address;
  actionId: bigint;
  actionArgs: Hex;
};

export function encodeCallOnExternalPositionArgs({
  externalPositionProxy,
  actionId,
  actionArgs,
}: CallOnExternalPositionArgs): Hex {
  return encodeAbiParameters(callOnExternalPositionArgsEncoding, [externalPositionProxy, actionId, actionArgs]);
}

export function decodeCallOnExternalPositionArgs(params: Hex): CallOnExternalPositionArgs {
  const [externalPositionProxy, actionId, actionArgs] = decodeAbiParameters(callOnExternalPositionArgsEncoding, params);

  return {
    externalPositionProxy,
    actionId,
    actionArgs,
  };
}
