import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultOwner(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  return readContract(client, {
    abi: IVault,
    functionName: "getOwner",
    address: vault,
  });
}
