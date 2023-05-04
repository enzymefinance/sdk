import { encodeAbiParameters, parseAbiParameters, decodeAbiParameters } from "viem";
import type { Hex } from "viem";

const callArgsForCreateExternalPositionAbiParamaters = parseAbiParameters(
  "uint typeId, bytes initializationData, bytes callOnExternalPositionCallArgs",
);

export type CallArgsForCreateExternalPosition = {
  typeId: bigint;
  initializationData?: Hex;
  callOnExternalPositionCallArgs?: Hex;
};

export function encodeCallArgsForCreateExternalPosition({
  typeId,
  initializationData = "0x",
  callOnExternalPositionCallArgs = "0x",
}: CallArgsForCreateExternalPosition): Hex {
  return encodeAbiParameters(callArgsForCreateExternalPositionAbiParamaters, [
    typeId,
    initializationData,
    callOnExternalPositionCallArgs,
  ]);
}

export function decodeCallArgsForCreateExternalPosition(callArgs: Hex): CallArgsForCreateExternalPosition {
  const [typeId, initializationData, callOnExternalPositionCallArgs] = decodeAbiParameters(
    callArgsForCreateExternalPositionAbiParamaters,
    callArgs,
  );

  return {
    typeId,
    initializationData,
    callOnExternalPositionCallArgs,
  };
}
