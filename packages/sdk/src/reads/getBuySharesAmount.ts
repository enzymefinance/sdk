import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
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
    abi: IComptrollerLib,
    functionName: "buyShares",
    address: comptroller,
    args: [amount, 1n],
    account,
  });

  return result;
}
