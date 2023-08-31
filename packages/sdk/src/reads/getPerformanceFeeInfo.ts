import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IPerformanceFee } from "@enzymefinance/abis/IPerformanceFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getPerformanceFeeInfo(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    performanceFee: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IPerformanceFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.performanceFee,
  });
}
