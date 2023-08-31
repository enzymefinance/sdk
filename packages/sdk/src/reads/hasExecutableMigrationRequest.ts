import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";

export function hasExecutableMigrationRequest(
  client: PublicClient,
  args: ReadContractParameters<{
    dispatcher: Address;
    vaultProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IDispatcher,
    address: args.dispatcher,
    functionName: "hasExecutableMigrationRequest",
    args: [args.vaultProxy],
  });
}
