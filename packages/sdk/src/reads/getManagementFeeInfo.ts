import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IManagementFee } from "@enzymefinance/abis/IManagementFee";
import type { Address, PublicClient } from "viem";

export async function getManagementFeeInfo(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    managementFee: Address;
  }>,
) {
  const getFeeInfoForFund = client.readContract({
    ...readContractParameters(args),
    abi: IManagementFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.managementFee,
  });

  return getFeeInfoForFund;
}
