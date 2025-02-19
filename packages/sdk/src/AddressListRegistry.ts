import * as Abis from "@enzymefinance/abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function isInList(
  client: Client,
  args: Viem.ContractCallParameters<{
    addressListRegistry: Address;
    listId: bigint;
    item: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IAddressListRegistry,
    address: args.addressListRegistry,
    functionName: "isInList",
    args: [args.listId, args.item],
  });
}
