import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getVaultOwner(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  const owner = await readContract(client, {
    abi: IVault,
    functionName: "getOwner",
    address: vault,
  });

  return owner;
}
