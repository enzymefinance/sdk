import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export type HasExecutableMigrationRequest = {
  dispatcher: Address;
  vaultProxy: Address;
};

export function hasExecutableMigrationRequest(
  client: PublicClient,
  { dispatcher, vaultProxy }: HasExecutableMigrationRequest,
) {
  return readContract(client, {
    abi: IDispatcher,
    address: dispatcher,
    functionName: "hasExecutableMigrationRequest",
    args: [vaultProxy],
  });
}
