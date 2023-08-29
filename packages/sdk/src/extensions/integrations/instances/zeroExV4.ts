import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ZeroExV4OrderType = typeof ZeroExV4OrderType[keyof typeof ZeroExV4OrderType];
export const ZeroExV4OrderType = {
  Limit: 0,
  Rfq: 1,
} as const;

export const zeroExV4TakeOrderEncoding = [
  {
    name: "encodedZeroExOrderArgs",
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
  encodedZeroExOrderArgs: Hex;
  takerAssetFillAmount: bigint;
  orderType: ZeroExV4OrderType;
};

export function encodeZeroExV4TakeOrderArgs({
  encodedZeroExOrderArgs,
  takerAssetFillAmount,
  orderType,
}: ZeroExV4TakeOrderArgs): Hex {
  return encodeAbiParameters(zeroExV4TakeOrderEncoding, [encodedZeroExOrderArgs, takerAssetFillAmount, orderType]);
}

function assertZeroExV4OrderType(value: number): asserts value is ZeroExV4OrderType {
  if (!Object.values(ZeroExV4OrderType).includes(value as ZeroExV4OrderType)) {
    throw new Error(`Invalid ZeroExV4OrderType: ${value}`);
  }
}

export function decodeZeroExV4TakeOrderArgs(callArgs: Hex): ZeroExV4TakeOrderArgs {
  const [encodedZeroExOrderArgs, takerAssetFillAmount, orderType] = decodeAbiParameters(
    zeroExV4TakeOrderEncoding,
    callArgs,
  );

  assertZeroExV4OrderType(orderType);

  return {
    encodedZeroExOrderArgs,
    takerAssetFillAmount,
    orderType,
  };
}
