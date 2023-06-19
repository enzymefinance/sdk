import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getPolicyManager(
  client: PublicClient,
  {
    comptrollerProxy,
  }: {
    comptrollerProxy: Address;
  },
) {
  return readContract(client, {
    abi: IComptroller,
    functionName: "getPolicyManager",
    address: comptrollerProxy,
  });
}
