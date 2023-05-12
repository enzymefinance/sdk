import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getVaultName(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  const name = await readContract(client, {
    abi: IVault,
    functionName: "name",
    address: vault,
  });

  return name;
}
