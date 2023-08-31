import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IExternalPositionProxy } from "@enzymefinance/abis/IExternalPositionProxy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getExternalPositionType(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPosition: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IExternalPositionProxy,
    functionName: "getExternalPositionType",
    address: args.externalPosition,
  });
}
