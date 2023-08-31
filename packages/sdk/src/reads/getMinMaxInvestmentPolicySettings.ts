import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IMinMaxInvestmentPolicy } from "@enzymefinance/abis/IMinMaxInvestmentPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getMinMaxInvestmentPolicySettings(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    minMaxInvestmentPolicy: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IMinMaxInvestmentPolicy,
    functionName: "getFundSettings",
    args: [args.comptrollerProxy],
    address: args.minMaxInvestmentPolicy,
  });
}
