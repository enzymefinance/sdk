import { prepareFunctionParams } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `shutdownGasRelayPaymaster` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareShutdownGasRelayPaymasterParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptrollerLib, name: "shutdownGasRelayPaymaster" }),
  });
}
