import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IMinMaxInvestmentPolicy } from "@enzymefinance/abis/IMinMaxInvestmentPolicy";
import type { Address, PublicClient } from "viem";

export function getMinMaxInvestmentPolicySettings(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    minMaxInvestmentPolicy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IMinMaxInvestmentPolicy,
    functionName: "getFundSettings",
    args: [args.comptrollerProxy],
    address: args.minMaxInvestmentPolicy,
  });
}
