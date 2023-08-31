import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IFeeManager } from "@enzymefinance/abis/IFeeManager";
import type { Address, PublicClient } from "viem";

export function getEnabledFees(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    feeManager: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IFeeManager,
    functionName: "getEnabledFeesForFund",
    args: [args.comptrollerProxy],
    address: args.feeManager,
  });
}
