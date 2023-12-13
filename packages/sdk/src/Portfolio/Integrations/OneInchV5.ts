import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

const takeOrderEncoding = [
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

export type OrderDescription = {
  srcToken: Address;
  dstToken: Address;
  srcReceiver: Address;
  dstReceiver: Address;
  amount: bigint;
  minReturnAmount: bigint;
  flags: bigint;
};

export type TakeOrderArgs = {
  executor: Address;
  orderDescription: OrderDescription;
  data: Hex;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [args.executor, args.orderDescription, args.data]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [executor, orderDescription, data] = decodeAbiParameters(takeOrderEncoding, encoded);
  const { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags } = orderDescription;

  return {
    executor,
    orderDescription: { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags },
    data,
  };
}

const swapArgsEncoding = [
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
  { name: "unknown", type: "bytes" },
  {
    name: "data",
    type: "bytes",
  },
] as const;

export function decodedSwapArgs(encoded: Hex): TakeOrderArgs {
  const [executor, orderDescription, , data] = decodeAbiParameters(swapArgsEncoding, `0x${encoded.slice(10)}`);
  const { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags } = orderDescription;

  return {
    executor,
    orderDescription: { srcToken, dstToken, srcReceiver, dstReceiver, amount, minReturnAmount, flags },
    data,
  };
}
