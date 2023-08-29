import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ZeroExV4OrderType = typeof ZeroExV4OrderType[keyof typeof ZeroExV4OrderType];
export const ZeroExV4OrderType = {
  Limit: 0,
  Rfq: 1,
} as const;

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
    type: "uint8",
  },
] as const;

export type ZeroExV4TakeOrderArgs = {
  signedOrder: Hex;
  takerAssetFillAmount: bigint;
  orderType: number;
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
