import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IManagementFee } from "@enzymefinance/abis/IManagementFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getManagementFeeInfo(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    managementFee: Address;
  }>,
) {
  const getFeeInfoForFund = readContract(client, {
    ...readContractParameters(args),
    abi: IManagementFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.managementFee,
  });

  return getFeeInfoForFund;
}
