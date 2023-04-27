import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem } from "viem";
import type { Hex } from "viem";

export interface SetAutoProtocolFeeSharesBuybackParams {
  nextAutoProtocolFeeSharesBuyback: boolean;
}

export function prepareSetAutoProtocolFeeSharesBuybackParams({
  nextAutoProtocolFeeSharesBuyback,
}: SetAutoProtocolFeeSharesBuybackParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "setAutoProtocolFeeSharesBuyback" }),
    args: [nextAutoProtocolFeeSharesBuyback],
  });
}

export function decodeSetAutoProtocolFeeSharesBuybackParams(params: Hex): SetAutoProtocolFeeSharesBuybackParams {
  const abi = getAbiItem({ abi: IComptroller, name: "setAutoProtocolFeeSharesBuyback" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [nextAutoProtocolFeeSharesBuyback] = decoded.args;

  return {
    nextAutoProtocolFeeSharesBuyback,
  };
}
