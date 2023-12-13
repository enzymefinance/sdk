import * as Abis from "@enzymefinance/abis";
import { Address } from "viem";
import { Viem } from "../Utils.js";

export function invokeContinuousFeeHookAndPayoutSharesOutstandingForFund(args: {
  unpermissionedActionsWrapper: Address;
  comptrollerProxy: Address;
  fees: Address[];
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IUnpermissionedActionsWrapper,
    functionName: "invokeContinuousFeeHookAndPayoutSharesOutstandingForFund",
    address: args.unpermissionedActionsWrapper,
    args: [args.comptrollerProxy, args.fees],
  });
}
