import { type Address, parseAbiParameters } from "abitype";
import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type CallArgsForCallOnExternalPosition = {
  externalPositionProxy: Address;
  actionId: bigint;
  actionArgs: Hex;
};

const callArgsForCallOnExternalPositionAbiParamaters = parseAbiParameters(
  "address externalPositionProxy, uint actionId, bytes actionArgs",
);

export function encodeCallArgsForCallOnExternalPosition({
  externalPositionProxy,
  actionId,
  actionArgs,
}: CallArgsForCallOnExternalPosition): Hex {
  return encodeAbiParameters(callArgsForCallOnExternalPositionAbiParamaters, [
    externalPositionProxy,
    actionId,
    actionArgs,
  ]);
}

export function decodeCallArgsForCallOnExternalPosition(params: Hex): CallArgsForCallOnExternalPosition {
  const decoded = decodeAbiParameters(callArgsForCallOnExternalPositionAbiParamaters, params);

  const [externalPositionProxy, actionId, actionArgs] = decoded;

  return {
    externalPositionProxy,
    actionId,
    actionArgs,
  };
}
