import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import type { Address, PublicClient } from "viem";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";

export function getVaultNominatedOwner(
  client: PublicClient,
  args: ReadContractParameters<{
    vault: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IVaultLib,
    functionName: "getNominatedOwner",
    address: args.vault,
  });
}
