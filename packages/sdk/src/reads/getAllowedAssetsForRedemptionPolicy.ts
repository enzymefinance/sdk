import { IAllowedAssetsForRedemptionPolicy } from "@enzymefinance/abis/IAllowedAssetsForRedemptionPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getAllowedAssetsForRedemptionPolicy(
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
    abi: IAllowedAssetsForRedemptionPolicy,
    functionName: "getListIdsForFund",
    args: [comptrollerProxy],
    address,
  });
}
