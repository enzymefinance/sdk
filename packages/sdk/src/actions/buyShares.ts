import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
import type { Hex } from "viem";
import { applySlippage, toBps } from "../utils/conversion.js";

export interface BuySharesParams {
  investmentAmount: bigint;
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

export interface SimulateBuySharesArgs {
  publicClient: PublicClient;
  depositorAddress: Address;
  comptrollerProxy: Address;
  investmentAmount: bigint;
  maxSlippageBps: bigint;
}

export async function simulateBuyShares({
  publicClient,
  depositorAddress,
  comptrollerProxy,
  investmentAmount,
  maxSlippageBps = toBps(0.03),
}: SimulateBuySharesArgs) {
  let { request, result } = await publicClient.simulateContract({
    ...prepareBuySharesParams({
      investmentAmount,
      minSharesQuantity: 1n,
    }),
    account: depositorAddress,
    address: comptrollerProxy,
  });

  const minSharesQuantity = applySlippage(result, maxSlippageBps);

  ({ request, result } = await publicClient.simulateContract({
    ...prepareBuySharesParams({
      investmentAmount,
      minSharesQuantity,
    }),
    account: depositorAddress,
    address: comptrollerProxy,
  }));

  return {
    minSharesQuantity,
    appliedSlippageBps: maxSlippageBps,
    expectedSharesQuantity: result,
    transactionRequest: request,
  };
}
