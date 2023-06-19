import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getDenominationAsset(
  client: PublicClient,
  {
    comptroller,
  }: {
    comptroller: Address;
  },
) {
  return readContract(client, {
    abi: IComptroller,
    functionName: "getDenominationAsset",
    address: comptroller,
  });
}
