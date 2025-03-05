import { type Address, type Hex, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

export type AdapterAction = (typeof AdapterAction)[keyof typeof AdapterAction];
export const AdapterAction = {
  SwapExactAmountIn: 0n,
  SwapExactAmountOut: 1n,
} as const;

export type SwapData = {
  srcToken: Address;
  destToken: Address;
  fromAmount: bigint;
  toAmount: bigint;
  quotedAmount: bigint;
  metadata: Hex;
};

export type SwapActionArgs = {
  executor: Address;
  swapData: SwapData;
  partnerAndFee: bigint;
  executorData: Hex;
};

const adapterSwapEncoding = [
  { name: "actionId", type: "uint256" },
  { name: "executor", type: "address" },
  {
    name: "swapData",
    type: "tuple",
    components: [
      { name: "srcToken", type: "address" },
      { name: "destToken", type: "address" },
      { name: "fromAmount", type: "uint256" },
      { name: "toAmount", type: "uint256" },
      { name: "quotedAmount", type: "uint256" },
      { name: "metadata", type: "bytes32" },
    ],
  },
  { name: "partnerAndFee", type: "uint256" },
  { name: "executorData", type: "bytes" },
] as const;

export function swapExactAmountInEncode(args: SwapActionArgs): Hex {
  return encodeAbiParameters(adapterSwapEncoding, [
    AdapterAction.SwapExactAmountIn,
    args.executor,
    {
      srcToken: args.swapData.srcToken,
      destToken: args.swapData.destToken,
      fromAmount: args.swapData.fromAmount,
      toAmount: args.swapData.toAmount,
      quotedAmount: args.swapData.quotedAmount,
      metadata: args.swapData.metadata,
    },
    args.partnerAndFee,
    args.executorData,
  ]);
}

export function swapExactAmountOutEncode(args: SwapActionArgs): Hex {
  return encodeAbiParameters(adapterSwapEncoding, [
    AdapterAction.SwapExactAmountOut,
    args.executor,
    {
      srcToken: args.swapData.srcToken,
      destToken: args.swapData.destToken,
      fromAmount: args.swapData.fromAmount,
      toAmount: args.swapData.toAmount,
      quotedAmount: args.swapData.quotedAmount,
      metadata: args.swapData.metadata,
    },
    args.partnerAndFee,
    args.executorData,
  ]);
}

export const swapExactAmountIn = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapExactAmountInEncode,
);

export const swapExactAmountOut = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapExactAmountOutEncode,
);
