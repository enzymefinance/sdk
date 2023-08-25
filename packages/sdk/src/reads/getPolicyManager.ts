import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
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
    abi: IComptrollerLib,
    functionName: "getPolicyManager",
    address: comptrollerProxy,
  });
}
