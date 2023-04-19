import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

export interface CallOnExtensionParams {
  extension: Address;
  actionId: bigint;
  callArgs: Hex;
}

export function prepareCallOnExtensionParams({ extension, actionId, callArgs }: CallOnExtensionParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "callOnExtension" }),
    args: [extension, actionId, callArgs],
  });
}

export function decodeCallOnExtensionParams(params: Hex): CallOnExtensionParams {
  const abi = getAbiItem({ abi: IComptroller, name: "callOnExtension" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [extension, actionId, callArgs] = decoded.args;

  return {
    extension,
    actionId,
    callArgs,
  };
}
