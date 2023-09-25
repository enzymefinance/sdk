import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, Hex } from "viem";

export type CallExtensionParams = {
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

export type PopulatedExtensionCall = Viem.PopulatedTransaction<"callOnExtension", typeof Abis.IComptrollerLib>;

export function callExtension(args: CallExtensionParams): PopulatedExtensionCall {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "callOnExtension",
    args: [args.extensionManager, args.actionId, args.callArgs],
    address: args.comptrollerProxy,
  });
}
