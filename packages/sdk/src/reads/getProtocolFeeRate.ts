import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IProtocolFeeTracker } from "@enzymefinance/abis/IProtocolFeeTracker";
import type { Address, PublicClient } from "viem";

export function getProtocolFeeRate(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IProtocolFeeTracker,
    functionName: "getFeeBpsForVault",
    address: args.protocolFeeTracker,
    args: [args.vaultProxy],
  });
}
