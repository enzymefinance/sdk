import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { ICumulativeSlippageTolerancePolicy } from "@enzymefinance/abis/ICumulativeSlippageTolerancePolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getCumulativeSlippageTolerancePolicySettings(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    cumulativeSlippageTolerancePolicy: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: ICumulativeSlippageTolerancePolicy,
    functionName: "getPolicyInfoForFund",
    args: [args.comptrollerProxy],
    address: args.cumulativeSlippageTolerancePolicy,
  });
}
