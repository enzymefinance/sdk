import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const oneInchV5TakeOrderEncoding = [
  {
    name: "executor",
    type: "address",
  },
  {
    components: [
      {
        internalType: "address",
        name: "srcToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "dstToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "srcReceiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "dstReceiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minReturnAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "flags",
        type: "uint256",
      },
    ],
    name: "orderDescription",
    type: "tuple",
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
};

export type OneInchV5TakeOrderArgs = {
  executor: Address;
  orderDescription: OrderDescription;
  data: Hex;
};

export function encodeOneInchV5TakeOrderArgs({ executor, orderDescription, data }: OneInchV5TakeOrderArgs): Hex {
  return encodeAbiParameters(oneInchV5TakeOrderEncoding, [executor, orderDescription, data]);
}

export function decodeOneInchV5TakeOrderArgs(callArgs: Hex): OneInchV5TakeOrderArgs {
  const [executor, orderDescription, data] = decodeAbiParameters(oneInchV5TakeOrderEncoding, callArgs);
  const { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags } = orderDescription;

  return {
    executor,
    orderDescription: { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags },
    data,
  };
}
