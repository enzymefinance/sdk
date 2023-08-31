import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function isActiveExternalPosition(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    externalPosition: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IVaultLib,
    address: args.vaultProxy,
    functionName: "isActiveExternalPosition",
    args: [args.externalPosition],
  });
}
