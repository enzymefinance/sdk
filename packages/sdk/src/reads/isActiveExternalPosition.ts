import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address, PublicClient } from "viem";

export function isActiveExternalPosition(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    externalPosition: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IVaultLib,
    address: args.vaultProxy,
    functionName: "isActiveExternalPosition",
    args: [args.externalPosition],
  });
}
