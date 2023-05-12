import { IPerformanceFee } from "@enzymefinance/abis/IPerformanceFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getPerformanceFee(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  const getFeeInfoForFund = readContract(client, {
    abi: IPerformanceFee,
    functionName: "getFeeInfoForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IPerformanceFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });

  const [feeInfoForFund, recipientForFund] = await Promise.all([getFeeInfoForFund, getRecipientForFund]);

  return {
    feeInfoForFund,
    recipientForFund,
  };
}
