import { IEntranceRateDirectFee } from "@enzymefinance/abis/IEntranceRateDirectFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getEntranceRateDirectFeeSettings(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  const getRateForFund = readContract(client, {
    abi: IEntranceRateDirectFee,
    functionName: "getRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const rateForFund = await getRateForFund;

  return {
    rateForFund,
  };
}
