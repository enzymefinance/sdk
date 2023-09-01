import { IComptrollerLib } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getLastSharesBoughtTimestampForAccountRequest(
  client: PublicClient,
  {
    account,
    dispatcher,
  }: {
    account: Address;
    dispatcher: Address;
  },
) {
  return readContract(client, {
    abi: IComptrollerLib,
    functionName: "getLastSharesBoughtTimestampForAccount",
    address: dispatcher,
    args: [account],
  });
}
