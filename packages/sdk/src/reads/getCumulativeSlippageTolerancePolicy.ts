import { ICumulativeSlippageTolerancePolicy } from "@enzymefinance/abis/ICumulativeSlippageTolerancePolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getCumulativeSlippageTolerancePolicy(
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
    abi: ICumulativeSlippageTolerancePolicy,
    functionName: "getPolicyInfoForFund",
    args: [comptrollerProxy],
    address,
  });
}
