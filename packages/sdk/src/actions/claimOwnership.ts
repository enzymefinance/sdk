import { prepareFunctionParams } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `claimOwnership` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareClaimOwnershipParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVaultLib, name: "claimOwnership" }),
  });
}
