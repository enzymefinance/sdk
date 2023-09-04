import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address, PublicClient } from "viem";

export function getTrackedAssets(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IVaultLib,
    functionName: "getTrackedAssets",
    address: args.vaultProxy,
  });
}
