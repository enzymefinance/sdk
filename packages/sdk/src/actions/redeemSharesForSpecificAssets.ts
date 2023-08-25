import { prepareFunctionParams } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import { type Address, decodeFunctionData, getAbiItem } from "viem";
import type { Hex } from "viem";

// TODO: The payout assets & payout asset percentages should be a map instead of two arrays.

export type RedeemSharesForSpecificAssetsParams = {
  /**
   * The address to send the redeemed assets to.
   */
  withdrawalRecipient: Address;
  /**
   * The quantity of shares to redeem.
   */
  sharesQuantity: bigint;
  /**
   * The list of specific assets to redeem.
   */
  payoutAssets: readonly Address[];
  /**
   * The list of percentages of the shares to redeem for each asset.
   */
  payoutAssetPercentages: readonly bigint[];
};

/**
 * Prepare the parameters for the `redeemSharesForSpecificAssets` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareRedeemSharesForSpecificAssetsParams({
  withdrawalRecipient,
  sharesQuantity,
  payoutAssets,
  payoutAssetPercentages,
}: RedeemSharesForSpecificAssetsParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptrollerLib, name: "redeemSharesForSpecificAssets" }),
    args: [withdrawalRecipient, sharesQuantity, payoutAssets, payoutAssetPercentages],
  });
}

/**
 * Decode the parameters for the `redeemSharesForSpecificAssets` function.
 *
 * @param params The encoded parameters.
 * @returns The decoded parameters.
 */
export function decodeRedeemSharesForSpecificAssetsParams(params: Hex): RedeemSharesForSpecificAssetsParams {
  const abi = getAbiItem({ abi: IComptrollerLib, name: "redeemSharesForSpecificAssets" });
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
