import { IExternalPositionProxy } from "@enzymefinance/abis/IExternalPositionProxy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getExternalPositionType(
  client: PublicClient,
  {
    address,
  }: {
    address: Address;
  },
) {
  return readContract(client, {
    abi: IExternalPositionProxy,
    functionName: "getExternalPositionType",
    address,
  });
}
