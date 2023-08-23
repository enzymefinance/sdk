import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const zeroExV2TakeOrderEncoding = [  
  {
    name: "SignedZeroExV2Order",
    type: "bytes",
  },
  {
    name: "takerAssetFillAmount",
    type: "uint256",
  },
] as const;

export type ZeroExV2TakeOrderArgs = {
  signedOrder: Hex;
  takerAssetFillAmount: bigint;
}

export function encodeZeroExV2TakeOrderArgs({
  signedOrder,
  takerAssetFillAmount,
}: ZeroExV2TakeOrderArgs): Hex {
  return encodeAbiParameters(zeroExV2TakeOrderEncoding, [signedOrder, takerAssetFillAmount]);
}

export function decodeZeroExV2TakeOrderArgs(callArgs: Hex): ZeroExV2TakeOrderArgs {
  const [signedOrder, takerAssetFillAmount] = decodeAbiParameters(zeroExV2TakeOrderEncoding, callArgs);

  return {
    signedOrder,
    takerAssetFillAmount,
  };
}
