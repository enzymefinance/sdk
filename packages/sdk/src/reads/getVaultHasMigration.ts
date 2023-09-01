import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultHasMigrationRequest(
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
    functionName: "hasMigrationRequest",
    address: dispatcher,
    args: [vault],
  });
}
