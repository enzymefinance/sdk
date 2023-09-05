import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IDispatcher } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";

export function getMigrationRequestDetails(
  client: PublicClient,
  args: ReadContractParameters<{
    vault: Address;
    dispatcher: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IDispatcher,
    functionName: "getMigrationRequestDetailsForVaultProxy",
    address: args.dispatcher,
    args: [args.vault],
  });
}
