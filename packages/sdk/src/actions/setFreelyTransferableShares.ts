import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `setFreelyTransferableShares` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareFreelyTransferableSharesParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "setFreelyTransferableShares" }),
  });
}
