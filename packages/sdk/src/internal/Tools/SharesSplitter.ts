import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "../../Utils";

export function getSharesSplitterTokenBalanceClaimableForUser(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    splitter: Address;
    token: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.ISharesSplitterLib,
    address: args.splitter,
    functionName: "getTokenBalClaimableForUser",
    args: [args.user, args.token],
  });
}
