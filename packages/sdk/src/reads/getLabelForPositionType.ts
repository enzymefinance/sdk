import { IExternalPositionFactory } from "@enzymefinance/abis/IExternalPositionFactory";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getLabelForExternalPositionType(
  client: PublicClient,
  {
    externalPositionFactory,
    typeId,
  }: {
    externalPositionFactory: Address;
    typeId: bigint;
  },
) {
  const externalPositionManager = await readContract(client, {
    abi: IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: externalPositionFactory,
    args: [typeId],
  });

  return externalPositionManager;
}
