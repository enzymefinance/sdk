import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
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
    abi: IComptrollerLib,
    functionName: "getDenominationAsset",
    address: comptroller,
  });
}
