import { prepareFunctionParams } from "../utils/viem.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `shutdownGasRelayPaymaster` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareShutdownGasRelayPaymasterParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "shutdownGasRelayPaymaster" }),
  });
}
