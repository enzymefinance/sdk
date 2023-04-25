import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
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

export interface SimulateRedeemSharesForSpecificAssets {
  publicClient: PublicClient;
  sharesOwner: Address;
  withdrawalRecipient?: Address;
  sharesQuantity: bigint;
  payoutAssets: Address[];
  payoutAssetPercentages: bigint[];
  comptrollerProxy: Address;
}

export async function simulateRedeemSharesForSpecificAssets({
  publicClient,
  sharesOwner,
  withdrawalRecipient = sharesOwner,
  sharesQuantity,
  payoutAssets,
  payoutAssetPercentages,
  comptrollerProxy,
}: SimulateRedeemSharesForSpecificAssets) {
  const { request, result } = await publicClient.simulateContract({
    ...prepareRedeemSharesForSpecificAssetsParams({
      withdrawalRecipient,
      sharesQuantity,
      payoutAssets,
      payoutAssetPercentages,
    }),
    account: sharesOwner,
    address: comptrollerProxy,
  });

  return {
    result,
    request,
  };
}
