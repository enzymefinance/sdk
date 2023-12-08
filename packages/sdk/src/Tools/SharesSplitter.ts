import * as Abis from "@enzymefinance/abis";
import type { Address, Chain, PublicClient, Transport } from "viem";
import { Viem } from "../Utils.js";

export function getClaimableTokenBalance<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
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
