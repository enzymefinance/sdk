import * as Abis from "@enzymefinance/abis";
import type { Address, Hex } from "viem";
import { Viem } from "../Utils.js";

export type CallOnExtensionParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the extension to call.
   */
  extensionManager: Address;
  /**
   * The action ID of the extension to call.
   */
  actionId: bigint;
  /**
   * The encoded arguments to pass to the extension.
   */
  callArgs: Hex;
};

export type PopulatedExtensionCall = Viem.PopulatedTransaction<typeof Abis.IComptrollerLib, "callOnExtension">;

export function callExtension(args: CallOnExtensionParams): PopulatedExtensionCall {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "callOnExtension",
    args: [args.extensionManager, args.actionId, args.callArgs],
    address: args.comptrollerProxy,
  });
}
