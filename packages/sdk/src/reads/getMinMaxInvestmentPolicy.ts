import { IMinMaxInvestmentPolicy } from "@enzymefinance/abis/IMinMaxInvestmentPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getMinMaxInvestmentPolicy(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  const fundSettings = await readContract(client, {
    abi: IMinMaxInvestmentPolicy,
    functionName: "getFundSettings",
    args: [comptrollerProxy],
    address,
  });

  return {
    fundSettings,
  };
}
