import { type Address } from "viem";
import { publicClient } from "../globals.js";
import { IVault } from "../../../abis/src/abis/IVault.js";

export interface IsAssetManagerParams {
  who: Address;
  vaultProxy: Address;
}

export function isAssetManager({ who, vaultProxy }: IsAssetManagerParams) {
  return publicClient.readContract({
    address: vaultProxy,
    abi: IVault,
    functionName: "isAssetManager",
    args: [who],
  });
}
interface ManagersResponse {
  error?: Error | undefined;
  result?: unknown;
  status: "error" | "success";
}

export async function isAssetManagers({ addresses, vaultProxy }: { addresses: Address[]; vaultProxy: Address }) {
  const contracts = addresses.map((who: Address) => ({
    address: vaultProxy,
    abi: IVault,
    functionName: "isAssetManager",
    args: [who],
  }));

  const managers: ManagersResponse[] = await publicClient.multicall({ contracts });

  return managers.map(({ result }) => result);
}
