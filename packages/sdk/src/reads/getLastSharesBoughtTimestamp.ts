import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";

export function getLastSharesBoughtTimestamp(
  client: PublicClient,
  args: ReadContractParameters<{
    depositor: Address;
    comptrollerProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IComptrollerLib,
    functionName: "getLastSharesBoughtTimestampForAccount",
    address: args.comptrollerProxy,
    args: [args.depositor],
  });
}
