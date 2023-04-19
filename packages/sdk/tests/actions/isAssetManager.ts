import { getAbiItem, type Address } from "viem";
import { publicClient } from "../globals.js";
import { IVault } from "../../../abis/src/abis/IVault.js";

export interface IsAssetManagerParams {
  who: Address;
  vaultProxy: Address;
}

export function isAssetManager({ who, vaultProxy }: IsAssetManagerParams) {
  return publicClient.readContract({
    address: vaultProxy,
    abi: [getAbiItem({ abi: IVault, name: "isAssetManager" })],
    functionName: "isAssetManager",
    args: [who],
  });
}

export function isAssetManagers({ addresses, vaultProxy }: { addresses: Address[]; vaultProxy: Address }) {
  return Promise.all(addresses.map((who: Address) => isAssetManager({ who, vaultProxy })));
}
