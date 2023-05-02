import { prepareFunctionParams } from "../../src/utils/viem.js";
import { IVault } from "@enzymefinance/abis/IVault";
import { getAbiItem } from "viem";

/**
 * Prepares the parameters for the `removeNominatedOwner` function call.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareRemoveNominatedOwnerParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "removeNominatedOwner" }),
  });
}
