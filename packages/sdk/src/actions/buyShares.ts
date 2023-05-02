import { prepareFunctionParams } from "../utils/viem.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { type Address, type PublicClient, decodeFunctionData, getAbiItem } from "viem";
import type { Hex } from "viem";
import { simulateContract } from "viem/contract";

export type BuySharesParams = {
  /**
   * The amount of the investment. This is the amount of the denomination asset to invest.
   */
  investmentAmount: bigint;
  /**
   * The minimum number of shares to buy. If the number of shares received is less than this value, the transaction will revert.
   */
  minSharesQuantity: bigint;
};

/**
 * Prepares the parameters for the `buyShares` function call.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareBuySharesParams({ investmentAmount, minSharesQuantity }: BuySharesParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "buyShares" }),
    args: [investmentAmount, minSharesQuantity],
  });
}

/**
 * Decodes the parameters for the `buyShares` function call.
 *
 * @param params The encoded parameters.
 * @returns The decoded parameters.
 */
export function decodeBuySharesParams(params: Hex): BuySharesParams {
  const abi = getAbiItem({ abi: IComptroller, name: "buyShares" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [investmentAmount, minSharesQuantity] = decoded.args;

  return {
    investmentAmount,
    minSharesQuantity,
  };
}

export type GetExpectedShareQuantityParams = Omit<BuySharesParams, "minSharesQuantity"> & {
  /**
   * The address of the comptroller proxy of the vault to buy shares for.
   */
  comptrollerProxy: Address;
  /**
   * The address of the account to buy shares with.
   */
  sharesBuyer: Address;
};

/**
 * Gets the expected number of shares to receive for a given investment amount.
 *
 * @returns The expected number of shares to receive.
 * @params client The public client to use to get the expected number of shares to receive.
 */
export async function getExpectedShareQuantity(
  client: PublicClient,
  { comptrollerProxy, investmentAmount, sharesBuyer }: GetExpectedShareQuantityParams,
) {
  const { result } = await simulateContract(client, {
    ...prepareBuySharesParams({
      investmentAmount: investmentAmount,
      minSharesQuantity: 1n,
    }),
    account: sharesBuyer,
    address: comptrollerProxy,
  });

  return result;
}
