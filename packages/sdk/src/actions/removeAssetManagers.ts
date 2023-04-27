import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

/**
 * The parameters for the `removeAssetManagers` function call.
 */
export type RemoveAssetManagersParams = {
  /**
   * The addresses of the asset managers to be removed.
   */
  managers: readonly Address[];
};

/**
 * Prepares the parameters for the `removeAssetManagers` function call.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareRemoveAssetManagersParams({ managers }: RemoveAssetManagersParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "removeAssetManagers" }),
    args: [managers],
  });
}

/**
 * Decodes the parameters for the `removeAssetManagers` function call.
 *
 * @returns The decoded parameters.
 */
export function decodeRemoveAssetManagersParams(params: Hex): RemoveAssetManagersParams {
  const abi = getAbiItem({ abi: IVault, name: "removeAssetManagers" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [managers] = decoded.args;

  return {
    managers,
  };
}
