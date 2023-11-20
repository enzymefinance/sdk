//--------------------------------------------------------------------------------------------
// COMPOUND, UNI
//--------------------------------------------------------------------------------------------

import { type Address, type PublicClient, parseAbi } from "viem";
import { Viem } from "../Utils.js";

export async function getDelegates(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    token: Address;
    account: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function delegates(address account) view returns (address)"]),
    functionName: "delegates",
    address: args.token,
    args: [args.account],
  });
}

//--------------------------------------------------------------------------------------------
// AAVE, STKAAVE
//--------------------------------------------------------------------------------------------

export async function getDelegateeByType(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    token: Address;
    delegator: Address;
    type: number;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getDelegateeByType(address delegator, uint8 type) view returns (address)"]),
    functionName: "getDelegateeByType",
    address: args.token,
    args: [args.delegator, args.type],
  });
}
