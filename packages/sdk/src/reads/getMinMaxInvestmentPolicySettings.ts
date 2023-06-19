import { IMinMaxInvestmentPolicy } from "@enzymefinance/abis/IMinMaxInvestmentPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getMinMaxInvestmentPolicySettings(
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
    abi: IMinMaxInvestmentPolicy,
    functionName: "getFundSettings",
    args: [comptrollerProxy],
    address,
  });
}
