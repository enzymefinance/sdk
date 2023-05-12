import { IManagementFee } from "@enzymefinance/abis/IManagementFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getManagementFee(
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
    abi: IManagementFee,
    functionName: "getFeeInfoForFund",
    args: [comptrollerProxy],
    address,
  });

  const getRecipientForFund = readContract(client, {
    abi: IManagementFee,
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
