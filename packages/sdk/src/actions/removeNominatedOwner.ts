import { prepareFunctionParams } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import { getAbiItem } from "viem";

/**
 * Prepares the parameters for the `removeNominatedOwner` function call.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareRemoveNominatedOwnerParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVaultLib, name: "removeNominatedOwner" }),
  });
}
