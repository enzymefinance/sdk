import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";

export type RedeemSharesInKindParams = {
  /**
   * The address to send the withdrawn assets to.
   */
  withdrawalReceipient: Address;
  /**
   * The quantity of shares to redeem.
   */
  sharesQuantity: bigint;
  /**
   * The list of additional assets to withdraw.
   *
   * @remarks
   *
   * This is useful for when the user wants to withdraw additional assets that are currently not
   * tracked by the vault. For example, if the vault received an airdrop but the vault manager
   * has not yet added the asset to the vault, the user can still withdraw the asset by adding
   * it to this list.
   */
  additionalAssets: readonly Address[];
  /**
   * The list of assets to skip withdrawal for.
   *
   * @remarks
   *
   * This is useful for when the user wants to withdraw all assets except for a few. In some
   * rare cases, transferal of certain assets may be restricted or dysfunctional, so this allows
   * the user to skip those.
   *
   * Note that this essentially means that the user would be redeeming shares for a subset of the
   * underlying assets they are owed, essentially leaving a portion of their owed assets behind.
   */
  assetsToSkip: readonly Address[];
};

/**
 * Prepare the parameters for the `redeemSharesInKind` function.
 *
 * @returns The prepared parameters to be encoded.
 */
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
