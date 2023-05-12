import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getTrackedAssets(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  const trackedAssets = await readContract(client, {
    abi: IVault,
    functionName: "getTrackedAssets",
    address: vault,
  });

  return trackedAssets;
}
