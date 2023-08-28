import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
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
    abi: IVaultLib,
    functionName: "name",
    address: vault,
  });
}
