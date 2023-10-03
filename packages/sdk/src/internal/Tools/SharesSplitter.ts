import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, PublicClient } from "viem";

export function getClaimableTokenBalance(
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
