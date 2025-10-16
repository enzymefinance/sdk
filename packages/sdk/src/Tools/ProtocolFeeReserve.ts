import * as Abis from "@enzymefinance/abis";
import type { Address, Hex } from "viem";
import { Viem } from "../Utils.js";

export function callOnContract(args: {
  protocolFeeReserveProxy: Address;
  contract: Address;
  callData: Hex;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IProtocolFeeReserveLib,
    functionName: "callOnContract",
    address: args.protocolFeeReserveProxy,
    args: [args.contract, args.callData],
  });
}
