import { IVault } from "@enzymefinance/abis/IVault";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultName(
  client: PublicClient,
  {
    vault,
  }: {
    vault: Address;
  },
) {
  return readContract(client, {
    abi: IVault,
    functionName: "name",
    address: vault,
  });
}
