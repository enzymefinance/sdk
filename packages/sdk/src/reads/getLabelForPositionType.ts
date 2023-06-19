import { IExternalPositionFactory } from "@enzymefinance/abis/IExternalPositionFactory";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getLabelForExternalPositionType(
  client: PublicClient,
  {
    externalPositionFactory,
    typeId,
  }: {
    externalPositionFactory: Address;
    typeId: bigint;
  },
) {
  return readContract(client, {
    abi: IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: externalPositionFactory,
    args: [typeId],
  });
}
