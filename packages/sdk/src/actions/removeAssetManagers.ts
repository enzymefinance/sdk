import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

export interface RemoveAssetManagersParams {
  managers: readonly Address[];
}

export function prepareRemoveAssetManagersParams({ managers }: RemoveAssetManagersParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "removeAssetManagers" }),
    args: [managers],
  });
}

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
