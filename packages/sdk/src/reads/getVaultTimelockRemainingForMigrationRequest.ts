import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";

export function getVaultTimelockRemainingForMigrationRequest(
  client: PublicClient,
  args: ReadContractParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IDispatcher,
    functionName: "getTimelockRemainingForMigrationRequest",
    address: args.dispatcher,
    args: [args.vault],
  });
}
