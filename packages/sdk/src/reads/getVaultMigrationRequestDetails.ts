import { IDispatcher } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultMigrationRequestDetails(
  client: PublicClient,
  {
    vault,
    dispatcher,
  }: {
    vault: Address;
    dispatcher: Address;
  },
) {
  return readContract(client, {
    abi: IDispatcher,
    functionName: "getMigrationRequestDetailsForVaultProxy",
    address: dispatcher,
    args: [vault],
  });
}
