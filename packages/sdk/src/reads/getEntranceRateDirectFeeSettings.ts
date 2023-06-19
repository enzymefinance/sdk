import { IEntranceRateDirectFee } from "@enzymefinance/abis/IEntranceRateDirectFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getEntranceRateDirectFeeSettings(
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
    abi: IEntranceRateDirectFee,
    functionName: "getRateForFund",
    args: [comptrollerProxy],
    address,
  });
}
