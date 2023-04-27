import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem } from "viem";

/**
 * Prepare the parameters for the `deployGasRelayPaymaster` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareDeployGasRelayPaymasterParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "deployGasRelayPaymaster" }),
  });
}
