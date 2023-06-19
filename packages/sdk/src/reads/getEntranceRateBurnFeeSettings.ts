import { IEntranceRateBurnFee } from "@enzymefinance/abis/IEntranceRateBurnFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getEntranceRateBurnFeeSettings(
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
    abi: IEntranceRateBurnFee,
    functionName: "getRateForFund",
    args: [comptrollerProxy],
    address,
  });
}
