import { prepareFunctionParams } from "../utils/viem.js";
import { IVaultLib } from "@enzymefinance/abis/IVaultLib";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `setFreelyTransferableShares` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareFreelyTransferableSharesParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVaultLib, name: "setFreelyTransferableShares" }),
  });
}
