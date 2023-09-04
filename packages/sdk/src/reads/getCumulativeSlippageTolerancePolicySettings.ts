import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { ICumulativeSlippageTolerancePolicy } from "@enzymefinance/abis/ICumulativeSlippageTolerancePolicy";
import type { Address, PublicClient } from "viem";

export function getCumulativeSlippageTolerancePolicySettings(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    cumulativeSlippageTolerancePolicy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: ICumulativeSlippageTolerancePolicy,
    functionName: "getPolicyInfoForFund",
    args: [args.comptrollerProxy],
    address: args.cumulativeSlippageTolerancePolicy,
  });
}
