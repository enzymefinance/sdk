import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

export type CallOnExtensionParams = {
  /**
   * The address of the extension to call.
   */
  extension: Address;
  /**
   * The action ID of the extension to call.
   */
  actionId: bigint;
  /**
   * The encoded arguments to pass to the extension.
   */
  callArgs: Hex;
};

/**
 * Prepare the parameters for the `callOnExtension` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareCallOnExtensionParams({ extension, actionId, callArgs }: CallOnExtensionParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "callOnExtension" }),
    args: [extension, actionId, callArgs],
  });
}

/**
 * Decodes the parameters for the `callOnExtension` function.
 *
 * @param params The encoded parameters.
 * @returns The decoded parameters.
 */
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
