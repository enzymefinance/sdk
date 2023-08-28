import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export type IsActiveExternalPositionParams = {
  vaultProxy: Address;
  externalPosition: Address;
};

export function isActiveExternalPosition(
  client: PublicClient,
  { vaultProxy, externalPosition }: IsActiveExternalPositionParams,
) {
  return readContract(client, {
    abi: IVaultLib,
    address: vaultProxy,
    functionName: "isActiveExternalPosition",
    args: [externalPosition],
  });
}
