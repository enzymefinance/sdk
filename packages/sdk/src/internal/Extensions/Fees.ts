import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "../../Utils.js";

export * as Entrance from "./Fees/Entrance.js";
export * as Exit from "./Fees/Exit.js";
export * as Management from "./Fees/Management.js";
export * as Performance from "./Fees/Performance.js";

export function getRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    fee: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IFee,
    functionName: "getRecipientForFund",
    args: [args.comptrollerProxy],
    address: args.fee,
  });
}
