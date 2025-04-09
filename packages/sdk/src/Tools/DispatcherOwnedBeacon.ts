import * as Abis from "@enzymefinance/abis";
import type { Address, Hex } from "viem";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// FACTORY
//--------------------------------------------------------------------------------------------

export function deployProxy(args: {
  factory: Address;
  constructData: Hex;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IDispatcherOwnedBeaconFactory,
    functionName: "deployProxy",
    address: args.factory,
    args: [args.constructData],
  });
}
