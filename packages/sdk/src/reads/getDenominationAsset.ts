import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getDenominationAsset(
  client: PublicClient,
  {
    comptroller,
  }: {
    comptroller: Address;
  },
) {
  const denominationAsset = await readContract(client, {
    abi: IComptroller,
    functionName: "getDenominationAsset",
    address: comptroller,
  });

  return denominationAsset;
}
