import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getFeeManager(
  client: PublicClient,
  {
    comptrollerProxy,
  }: {
    comptrollerProxy: Address;
  },
) {
  const result = await readContract(client, {
    abi: IComptroller,
    functionName: "getFeeManager",
    address: comptrollerProxy,
  });

  return result;
}
