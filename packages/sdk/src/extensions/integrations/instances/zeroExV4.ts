import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const zeroExV4TakeOrderEncoding = [
  {
    name: "signedOrder",
    type: "bytes",
  },
  {
    name: "takerAssetFillAmount",
    type: "uint128",
  },
  {
    name: "orderType",
    type: "uint256",
  },
] as const;

export type ZeroExV4TakeOrderArgs = {
  signedOrder: Hex;
  takerAssetFillAmount: bigint;
  orderType: bigint;
};

export function encodeZeroExV4TakeOrderArgs({
  signedOrder,
  takerAssetFillAmount,
  orderType,
}: ZeroExV4TakeOrderArgs): Hex {
  return encodeAbiParameters(zeroExV4TakeOrderEncoding, [signedOrder, takerAssetFillAmount, orderType]);
}

export function decodeZeroExV4TakeOrderArgs(callArgs: Hex): ZeroExV4TakeOrderArgs {
  const [signedOrder, takerAssetFillAmount, orderType] = decodeAbiParameters(zeroExV4TakeOrderEncoding, callArgs);

  return {
    signedOrder,
    takerAssetFillAmount,
    orderType,
  };
}
