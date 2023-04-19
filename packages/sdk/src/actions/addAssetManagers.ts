import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
import type { Hex } from "viem";

export interface AddAssetManagersParams {
  managers: readonly Address[];
}

export function prepareAddAssetManagersParams({ managers }: AddAssetManagersParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "addAssetManagers" }),
    args: [managers],
  });
}

export function decodeAddAssetManagersParams(params: Hex): AddAssetManagersParams {
  const abi = getAbiItem({ abi: IVault, name: "addAssetManagers" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [managers] = decoded.args;

  return {
    managers,
  };
}

export interface SimulateAddAssetManagersParams {
  publicClient: PublicClient;
  managers: Address[];
  vaultProxy: Address;
  account: Address;
}

export async function simulateAddAssetManagers({
  publicClient,
  managers,
  vaultProxy,
  account,
}: SimulateAddAssetManagersParams) {
  const { request } = await publicClient.simulateContract({
    ...prepareAddAssetManagersParams({
      managers,
    }),
    address: vaultProxy,
    account,
  });

  return {
    request,
  };
}

export interface IsAssetManagerParams {
  who: Address;
}
