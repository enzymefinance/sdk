import type { Tuple } from "../../src/utils/types.js";
import { publicClient } from "../globals.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address } from "viem";

export interface IsAssetManagerParams {
  who: Address;
  vaultProxy: Address;
}

export function isAssetManager({ who, vaultProxy }: IsAssetManagerParams) {
  return publicClient.readContract({
    address: vaultProxy,
    abi: IVaultLib,
    functionName: "isAssetManager",
    args: [who],
  });
}

export async function isAssetManagers<const TAddresses extends Readonly<Address[]>>({
  addresses,
  vaultProxy,
}: { addresses: TAddresses; vaultProxy: Address }) {
  const contracts = addresses.map((who: Address) => {
    return {
      address: vaultProxy,
      abi: IVaultLib,
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
