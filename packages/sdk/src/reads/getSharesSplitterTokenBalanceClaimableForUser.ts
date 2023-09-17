import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { ISharesSplitterLib } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";

export function getSharesSplitterTokenBalanceClaimableForUser(
  client: PublicClient,
  args: ReadContractParameters<{
    splitter: Address;
    token: Address;
    user: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: ISharesSplitterLib,
    address: args.splitter,
    functionName: "getTokenBalClaimableForUser",
    args: [args.user, args.token],
  });
}
