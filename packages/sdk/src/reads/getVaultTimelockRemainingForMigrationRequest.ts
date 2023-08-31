import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultTimelockRemainingForMigrationRequest(
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
    functionName: "getTimelockRemainingForMigrationRequest",
    address: dispatcher,
    args: [vault],
  });
}
