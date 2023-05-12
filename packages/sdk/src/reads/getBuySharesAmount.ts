import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { simulateContract } from "viem/contract";

export async function getBuySharesAmount(
  client: PublicClient,
  {
    comptroller,
    amount,
    account,
  }: {
    comptroller: Address;
    amount: bigint;
    account: Address;
  },
) {
  const { result } = await simulateContract(client, {
    abi: IComptroller,
    functionName: "buyShares",
    address: comptroller,
    args: [amount, 1n],
    account,
  });

  return result;
}
