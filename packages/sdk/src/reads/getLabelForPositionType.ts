import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPositionFactory } from "@enzymefinance/abis/IExternalPositionFactory";
import type { Address, PublicClient } from "viem";

export function getLabelForExternalPositionType(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPositionFactory: Address;
    typeId: bigint;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: args.externalPositionFactory,
    args: [args.typeId],
  });
}
