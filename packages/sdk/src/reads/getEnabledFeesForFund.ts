import { IFeeManager } from "@enzymefinance/abis/IFeeManager";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getEnabledFeesForFund(
  client: PublicClient,
  {
    comptrollerProxy,
    feeManager,
  }: {
    comptrollerProxy: Address;
    feeManager: Address;
  },
) {
  return readContract(client, {
    abi: IFeeManager,
    functionName: "getEnabledFeesForFund",
    args: [comptrollerProxy],
    address: feeManager,
  });
}
