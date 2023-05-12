import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getVaultActiveExternalPositions(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  const activeExternalPositions = await readContract(client, {
    abi: IVault,
    functionName: "getActiveExternalPositions",
    address: vault,
  });

  return activeExternalPositions;
}
