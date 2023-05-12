import { IMinSharesSupplyFee } from "@enzymefinance/abis/IMinSharesSupplyFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getMinSharesSupplyFee(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  const recipientForFund = await readContract(client, {
    abi: IMinSharesSupplyFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });

  return {
    recipientForFund,
  };
}
