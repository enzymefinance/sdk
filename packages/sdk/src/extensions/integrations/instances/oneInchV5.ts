import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const oneInchV5TakeOrderEncoding = [
  {
    name: "executor",
    type: "address",
  },
  {
    name: "orderDescription",
    type: "tuple(address srcToken, address dstToken, address srcReceiver, address dstReceiver, uint256 amount, uint256 minReturnAmount, uint256 flags)",
  },
  {
    name: "data",
    type: "bytes",
  },
] as const;

type OrderDescription = {
  srcToken: Address;
  dstToken: Address;
  srcReceiver: Address;
  dstReceiver: Address;
  amount: bigint;
  minReturnAmount: bigint;
  flags: bigint;
}

export type OneInchV5TakeOrderArgs = {
  executor: Address;
  orderDescription: OrderDescription;
  data: Hex;
};

export function encodeOneInchV5TakeOrderArgs({
  executor,
  orderDescription,
  data,
}: OneInchV5TakeOrderArgs): Hex {
  const { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags } = orderDescription;
  return encodeAbiParameters(oneInchV5TakeOrderEncoding, [
    executor,
    [srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags],
    data,
  ]);
}

export function decodeOneInchV5TakeOrderArgs(callArgs: Hex): OneInchV5TakeOrderArgs {
  const [
    executor,
    orderDescription,
    data,
  ] = decodeAbiParameters(oneInchV5TakeOrderEncoding, callArgs);

  return {
    executor,
    orderDescription,
    data,
  };
}
