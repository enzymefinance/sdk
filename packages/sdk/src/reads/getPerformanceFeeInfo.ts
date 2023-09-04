import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IPerformanceFee } from "@enzymefinance/abis/IPerformanceFee";
import type { Address, PublicClient } from "viem";

export async function getPerformanceFeeInfo(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    performanceFee: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IPerformanceFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.performanceFee,
  });
}
