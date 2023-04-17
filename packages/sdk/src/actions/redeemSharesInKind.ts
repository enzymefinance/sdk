import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
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

export interface SimulateRedeemSharesInKindArgs {
  publicClient: PublicClient;
  sharesOwner: Address;
  withdrawalReceipient?: Address;
  sharesQuantity: bigint;
  additionalAssets: Address[];
  assetsToSkip: Address[];
  comptrollerProxy: Address;
}
export async function simulateRedeemSharesInKind({
  publicClient,
  sharesOwner,
  withdrawalReceipient = sharesOwner,
  sharesQuantity,
  additionalAssets,
  assetsToSkip,
  comptrollerProxy,
}: SimulateRedeemSharesInKindArgs) {
  const { request, result } = await publicClient.simulateContract({
    ...prepareRedeemSharesInKindParams({
      withdrawalReceipient,
      sharesQuantity,
      additionalAssets,
      assetsToSkip,
    }),
    account: sharesOwner,
    address: comptrollerProxy,
  });

  console.log("REQUEST", request);
  console.log("RESULT", result);

  return {
    shares: result, // @TODO: This is not correct, the output is [payoutAssets_[], payoutAmounts_[]]. We need to decode that tuple into sth. like `{ assets: Address, amounts: bigint }[]`
    transactionRequest: request,
  };
}
