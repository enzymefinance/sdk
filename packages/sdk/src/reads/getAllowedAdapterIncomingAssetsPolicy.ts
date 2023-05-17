import { IAllowedAdapterIncomingAssetsPolicy } from "@enzymefinance/abis/IAllowedAdapterIncomingAssetsPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getAllowedAdapterIncomingAssetsPolicy(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  return readContract(client, {
    abi: IAllowedAdapterIncomingAssetsPolicy,
    functionName: "getListIdsForFund",
    args: [comptrollerProxy],
    address,
  });
}
