import { IAllowedAdaptersPolicy } from "@enzymefinance/abis/IAllowedAdaptersPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getAllowedAdaptersPolicySettings(
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
    abi: IAllowedAdaptersPolicy,
    functionName: "getListIdsForFund",
    args: [comptrollerProxy],
    address,
  });
}
