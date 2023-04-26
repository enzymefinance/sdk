import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

export interface RedeemSharesForSpecificAssetsParams {
  withdrawalRecipient: Address;
  sharesQuantity: bigint;
  payoutAssets: readonly Address[];
  payoutAssetPercentages: readonly bigint[];
}

export function prepareRedeemSharesForSpecificAssetsParams({
  withdrawalRecipient,
  sharesQuantity,
  payoutAssets,
  payoutAssetPercentages,
}: RedeemSharesForSpecificAssetsParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "redeemSharesForSpecificAssets" }),
    args: [withdrawalRecipient, sharesQuantity, payoutAssets, payoutAssetPercentages],
  });
}

export function decodeRedeemSharesForSpecificAssetsParams(params: Hex): RedeemSharesForSpecificAssetsParams {
  const abi = getAbiItem({ abi: IComptroller, name: "redeemSharesForSpecificAssets" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [withdrawalRecipient, sharesQuantity, payoutAssets, payoutAssetPercentages] = decoded.args;

  return {
    withdrawalRecipient,
    sharesQuantity,
    payoutAssets,
    payoutAssetPercentages,
  };
}
