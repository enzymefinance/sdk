import type { Tuple } from "../../src/utils/types.js";
import { publicClient } from "../globals.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { type Address } from "viem";

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

export async function isAssetManagers<TAddresses extends Readonly<Address[]>>({
  addresses,
  vaultProxy,
}: { addresses: TAddresses; vaultProxy: Address }) {
  const contracts = addresses.map((who: Address) => {
    return {
      address: vaultProxy,
      abi: IVault,
      functionName: "isAssetManager",
      args: [who],
    } as const;
  });

  const managers = await publicClient.multicall({
    allowFailure: false,
    contracts,
  });

  return managers as Tuple<boolean, TAddresses["length"]>;
}
