import { prepareFunctionParams } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { decodeFunctionData, getAbiItem } from "viem";
import type { Hex } from "viem";

export type BuyBackProtocolFeeSharesParams = {
  /**
   * The amount of shares to buy back.
   */
  sharesAmount: bigint;
};

/**
 * Prepares the parameters for the `buyBackProtocolFeeShares` function call.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareBuyBackProtocolFeeSharesParams({ sharesAmount }: BuyBackProtocolFeeSharesParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptrollerLib, name: "buyBackProtocolFeeShares" }),
    args: [sharesAmount],
  });
}

/**
 * Decodes the parameters for the `buyBackProtocolFeeShares` function call.
 *
 * @param params The encoded parameters.
 * @returns The decoded parameters.
 */
export function decodeBuyBackProtocolFeeSharesParams(params: Hex): BuyBackProtocolFeeSharesParams {
  const abi = getAbiItem({ abi: IComptrollerLib, name: "buyBackProtocolFeeShares" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [sharesAmount] = decoded.args;

  return {
    sharesAmount,
  };
}
