import { prepareFunctionParams } from "../utils/viem.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { decodeFunctionData, getAbiItem } from "viem";
import type { Hex } from "viem";

export type SetAutoProtocolFeeSharesBuybackParams = {
  /**
   * Whether to enable or disable the auto buyback of protocol fee shares.
   */
  enabled: boolean;
};

/**
 * Prepares the parameters for the `setAutoProtocolFeeSharesBuyback` function call.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareSetAutoProtocolFeeSharesBuybackParams({ enabled }: SetAutoProtocolFeeSharesBuybackParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "setAutoProtocolFeeSharesBuyback" }),
    args: [enabled],
  });
}

/**
 * Decodes the parameters for the `setAutoProtocolFeeSharesBuyback` function call.
 *
 * @returns The decoded parameters.
 */
export function decodeSetAutoProtocolFeeSharesBuybackParams(params: Hex): SetAutoProtocolFeeSharesBuybackParams {
  const abi = getAbiItem({ abi: IComptroller, name: "setAutoProtocolFeeSharesBuyback" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [enabled] = decoded.args;

  return {
    enabled,
  };
}
