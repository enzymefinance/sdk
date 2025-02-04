import * as Abis from "@enzymefinance/abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deploy(args: {
  sharesSplitterFactory: Address;
  addresses: ReadonlyArray<Address>;
  percentages: ReadonlyArray<bigint>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISharesSplitterFactory,
    functionName: "deploy",
    address: args.sharesSplitterFactory,
    args: [args.addresses, args.percentages],
  });
}

export function claimToken(args: {
  sharesSplitter: Address;
  vaultProxy: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISharesSplitterLib,
    functionName: "claimToken",
    address: args.sharesSplitter,
    args: [args.vaultProxy],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getClaimableTokenBalance(
  client: Client,
  args: Viem.ContractCallParameters<{
    splitter: Address;
    token: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISharesSplitterLib,
    address: args.splitter,
    functionName: "getTokenBalClaimableForUser",
    args: [args.user, args.token],
  });
}
