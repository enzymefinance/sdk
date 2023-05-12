import { IFeeManager } from "@enzymefinance/abis/IFeeManager";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getEnabledFeesForFund(
  client: PublicClient,
  {
    comptrollerProxy,
    feeManager,
  }: {
    comptrollerProxy: Address;
    feeManager: Address;
  },
) {
  const result = await readContract(client, {
    abi: IFeeManager,
    functionName: "getEnabledFeesForFund",
    args: [comptrollerProxy],
    address: feeManager,
  });

  return result;
}
