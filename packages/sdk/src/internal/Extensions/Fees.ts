import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "@enzymefinance/sdk/Utils";

export * as Entrance from "@enzymefinance/sdk/internal/Extensions/Fees/Entrance";
export * as Exit from "@enzymefinance/sdk/internal/Extensions/Fees/Exit";
export * as Management from "@enzymefinance/sdk/internal/Extensions/Fees/Management";
export * as Performance from "@enzymefinance/sdk/internal/Extensions/Fees/Performance";

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
