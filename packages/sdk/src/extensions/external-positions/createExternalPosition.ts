import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const createExternalPositionArgsEncoding = [
  {
    name: "typeId",
    type: "uint256",
  },
  {
    type: "bytes",
    name: "initializationData",
  },
  {
    type: "bytes",
    name: "callOnExternalPositionCallArgs",
  },
] as const;

export type CreateExternalPositionArgs = {
  typeId: bigint;
  initializationData?: Hex | undefined;
  callOnExternalPositionCallArgs?: Hex | undefined;
};

export function encodeCreateExternalPositionArgs({
  typeId,
  initializationData = "0x",
  callOnExternalPositionCallArgs = "0x",
}: CreateExternalPositionArgs): Hex {
  return encodeAbiParameters(createExternalPositionArgsEncoding, [
    typeId,
    initializationData,
    callOnExternalPositionCallArgs,
  ]);
}

export function decodeCreateExternalPositionArgs(callArgs: Hex): CreateExternalPositionArgs {
  const [typeId, initializationData, callOnExternalPositionCallArgs] = decodeAbiParameters(
    createExternalPositionArgsEncoding,
    callArgs,
  );

  return {
    typeId,
    initializationData,
    callOnExternalPositionCallArgs,
  };
}
