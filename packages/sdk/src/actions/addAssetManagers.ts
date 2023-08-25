import { prepareFunctionParams } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import { type Address, decodeFunctionData, getAbiItem } from "viem";
import type { Hex } from "viem";

export type AddAssetManagersParams = {
  /**
   * The addresses of the asset managers to add.
   */
  managers: readonly Address[];
};

/**
 * Prepares the parameters for the `addAssetManagers` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareAddAssetManagersParams({ managers }: AddAssetManagersParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVaultLib, name: "addAssetManagers" }),
    args: [managers],
  });
}

/**
 * Decodes the parameters for the `addAssetManagers` function.
 *
 * @param params The encoded parameters.
 * @returns The decoded parameters.
 */
export function decodeAddAssetManagersParams(params: Hex): AddAssetManagersParams {
  const abi = getAbiItem({ abi: IVaultLib, name: "addAssetManagers" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [managers] = decoded.args;

  return {
    managers,
  };
}
