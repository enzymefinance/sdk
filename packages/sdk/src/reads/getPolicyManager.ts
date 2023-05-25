import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getPolicyManager(
  client: PublicClient,
  {
    comptrollerProxy,
  }: {
    comptrollerProxy: Address;
  },
) {
  const result = await readContract(client, {
    abi: IComptroller,
    functionName: "getPolicyManager",
    address: comptrollerProxy,
  });

  return result;
}