import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultComptroller(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  return readContract(client, {
    abi: IVault,
    functionName: "getAccessor",
    address: vault,
  });
}
