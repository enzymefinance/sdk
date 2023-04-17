import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
import type { Hex } from "viem";

export interface RedeemSharesInKindParams {
  recipient: Address;
  sharesQuantity: bigint;
  additionalAssets: readonly Address[];
  assetsToSkip: readonly Address[];
}

export function prepareRedeemSharesInKindParams({
  recipient,
  sharesQuantity,
  additionalAssets = [],
  assetsToSkip = [],
}: RedeemSharesInKindParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "redeemSharesInKind" }),
    args: [recipient, sharesQuantity, additionalAssets, assetsToSkip],
  });
}

export function decodeRedeemSharesParams(params: Hex): RedeemSharesInKindParams {
  const abi = getAbiItem({ abi: IComptroller, name: "redeemSharesInKind" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [recipient, sharesQuantity, additionalAssets, assetsToSkip] = decoded.args;

  return {
    recipient,
    sharesQuantity,
    additionalAssets,
    assetsToSkip,
  };
}

export interface SimulateRedeemSharesInKindArgs {
  publicClient: PublicClient;
  signer: Address;
  recipient?: Address;
  sharesQuantity: bigint;
  additionalAssets: Address[];
  assetsToSkip: Address[];
  comptrollerProxy: Address;
}
export async function simulateRedeemSharesInKind({
  publicClient,
  signer,
  recipient = signer,
  sharesQuantity,
  additionalAssets,
  assetsToSkip,
  comptrollerProxy,
}: SimulateRedeemSharesInKindArgs) {
  const { request, result } = await publicClient.simulateContract({
    ...prepareRedeemSharesInKindParams({
      recipient,
      sharesQuantity,
      additionalAssets,
      assetsToSkip,
    }),
    address: comptrollerProxy,
  });

  console.log("REQUEST", request);
  console.log("RESULT", result);

  return {
    shares: result,
    transactionRequest: request,
  };
}
