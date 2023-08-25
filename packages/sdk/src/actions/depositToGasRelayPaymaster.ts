import { prepareFunctionParams } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `depositToGasRelayPaymaster` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareDepositToGasRelayPaymasterParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptrollerLib, name: "depositToGasRelayPaymaster" }),
  });
}
