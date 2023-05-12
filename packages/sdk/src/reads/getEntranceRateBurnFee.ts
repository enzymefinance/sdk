import { IEntranceRateBurnFee } from "@enzymefinance/abis/IEntranceRateBurnFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getEntranceRateBurnFee(
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
    abi: IEntranceRateBurnFee,
    functionName: "getRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const rateForFund = await getRateForFund;

  return {
    rateForFund,
  };
}
