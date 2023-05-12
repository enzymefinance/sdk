import { IExternalPositionProxy } from "@enzymefinance/abis/IExternalPositionProxy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getExternalPositionType(
  client: PublicClient,
  {
    address,
  }: {
    address: Address;
  },
) {
  const externalPositionType = await readContract(client, {
    abi: IExternalPositionProxy,
    functionName: "getExternalPositionType",
    address,
  });

  return externalPositionType;
}
