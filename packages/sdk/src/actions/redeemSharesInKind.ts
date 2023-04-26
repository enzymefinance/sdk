import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

export interface RedeemSharesInKindParams {
  withdrawalReceipient: Address;
  sharesQuantity: bigint;
  additionalAssets: readonly Address[];
  assetsToSkip: readonly Address[];
}

export function prepareRedeemSharesInKindParams({
  withdrawalReceipient,
  sharesQuantity,
  additionalAssets = [],
  assetsToSkip = [],
}: RedeemSharesInKindParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "redeemSharesInKind" }),
    args: [withdrawalReceipient, sharesQuantity, additionalAssets, assetsToSkip],
  });
}

export function decodeRedeemSharesParams(params: Hex): RedeemSharesInKindParams {
  const abi = getAbiItem({ abi: IComptroller, name: "redeemSharesInKind" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [withdrawalReceipient, sharesQuantity, additionalAssets, assetsToSkip] = decoded.args;

  return {
    withdrawalReceipient,
    sharesQuantity,
    additionalAssets,
    assetsToSkip,
  };
}
