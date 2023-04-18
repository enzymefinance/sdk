import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
import type { Hex } from "viem";

export interface BuySharesParams {
  investmentAmount: bigint;
  /**
   * The minimum number of shares to buy. If the number of shares to buy is less than this value, the transaction will revert.
   */
  minSharesQuantity: bigint;
}

export function prepareBuySharesParams({ investmentAmount, minSharesQuantity }: BuySharesParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "buyShares" }),
    args: [investmentAmount, minSharesQuantity],
  });
}

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

export async function getExpectedShareQuantity({
  publicClient,
  comptrollerProxy,
  investmentAmount,
  sharesBuyer,
}: {
  publicClient: PublicClient;
  comptrollerProxy: Address;
  investmentAmount: bigint;
  sharesBuyer: Address;
}) {
  const { result } = await publicClient.simulateContract({
    ...prepareBuySharesParams({
      investmentAmount,
      minSharesQuantity: 1n,
    }),
    account: sharesBuyer,
    address: comptrollerProxy,
  });

  return result;
}
