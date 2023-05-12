import { IExitRateBurnFee } from "@enzymefinance/abis/IExitRateBurnFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getExitRateBurnFee(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  const getInKindRateForFund = readContract(client, {
    abi: IExitRateBurnFee,
    functionName: "getInKindRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const getSpecificAssetsRateForFund = readContract(client, {
    abi: IExitRateBurnFee,
    functionName: "getSpecificAssetsRateForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IExitRateBurnFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });

  const [inKindRateForFund, specificAssetsRateForFund, recipientForFund] = await Promise.all([
    getInKindRateForFund,
    getSpecificAssetsRateForFund,
    getRecipientForFund,
  ]);

  return {
    inKindRateForFund,
    specificAssetsRateForFund,
    recipientForFund,
  };
}
