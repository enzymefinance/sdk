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

// This encoding matches the Solidity SwapActionArgs struct:
// (address executor, SwapData swapData, uint256 partnerAndFee, bytes executorData)
const swapActionArgsEncoding = [
  { type: "address", name: "executor" },
  {
    type: "tuple",
    name: "swapData",
    components: [
      { type: "address", name: "srcToken" },
      { type: "address", name: "destToken" },
      { type: "uint256", name: "fromAmount" },
      { type: "uint256", name: "toAmount" },
      { type: "uint256", name: "quotedAmount" },
      { type: "bytes32", name: "metadata" },
    ],
  },
  { type: "uint256", name: "partnerAndFee" },
  { type: "bytes", name: "executorData" },
] as const;

const adapterActionEncoding = [
  { name: "actionId", type: "uint256" },
  { name: "encodedActionArgs", type: "bytes" },
] as const;

export function swapExactAmountInEncode(args: SwapActionArgs): Hex {
  const encodedSwapArgs = encodeAbiParameters(swapActionArgsEncoding, [
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
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountIn, encodedSwapArgs]);
}

export function swapExactAmountOutEncode(args: SwapActionArgs): Hex {
  const encodedSwapArgs = encodeAbiParameters(swapActionArgsEncoding, [
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
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountOut, encodedSwapArgs]);
}

export const swapExactAmountIn = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapExactAmountInEncode,
);

export const swapExactAmountOut = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapExactAmountOutEncode,
);
