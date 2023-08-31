import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPositionFactory } from "@enzymefinance/abis/IExternalPositionFactory";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getLabelForExternalPositionType(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPositionFactory: Address;
    typeId: bigint;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IExternalPositionFactory,
    functionName: "getLabelForPositionType",
    address: args.externalPositionFactory,
    args: [args.typeId],
  });
}
