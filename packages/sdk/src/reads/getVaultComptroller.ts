import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getVaultComptroller(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  const accessor = await readContract(client, {
    abi: IVault,
    functionName: "getAccessor",
    address: vault,
  });

  return accessor;
}
