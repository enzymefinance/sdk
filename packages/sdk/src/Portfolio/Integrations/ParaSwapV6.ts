import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { assertEnumType } from "../../Utils/assertion.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

export type AdapterAction = (typeof AdapterAction)[keyof typeof AdapterAction];
export const AdapterAction = {
  SwapExactAmountIn: 0n,
  SwapExactAmountOut: 1n,
} as const;

export type AdapterActionArgs = {
  actionId: AdapterAction;
  encodedActionArgs: Hex;
};

const adapterActionEncoding = [
  {
    name: "actionId",
    type: "uint256",
  },
  {
    name: "encodedActionArgs",
    type: "bytes",
  },
] as const;

export function encodeAdapterAction(args: AdapterActionArgs): Hex {
  return encodeAbiParameters(adapterActionEncoding, [args.actionId, args.encodedActionArgs]);
}

export function decodeAdapterAction(encoded: Hex): AdapterActionArgs {
  const [actionId, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);

  assertEnumType(AdapterAction, actionId);

  return {
    actionId,
    encodedActionArgs,
  };
}

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

export function swapExactAmountInEncode(args: SwapActionArgs): Hex {
  const encodedArgs = encodeAbiParameters(swapActionArgsEncoding, [
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
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountIn, encodedArgs]);
}

export function swapExactAmountInDecode(encoded: Hex): SwapActionArgs {
  const [action, encodedArgs] = decodeAbiParameters(adapterActionEncoding, encoded);
  if (action !== AdapterAction.SwapExactAmountIn) {
    throw new Error("Invalid action type for SwapExactAmountIn");
  }
  const [executor, swapData, partnerAndFee, executorData] = decodeAbiParameters(swapActionArgsEncoding, encodedArgs);
  const { srcToken, destToken, fromAmount, toAmount, quotedAmount, metadata } = swapData;
  return {
    executor,
    swapData: {
      srcToken,
      destToken,
      fromAmount,
      toAmount,
      quotedAmount,
      metadata,
    },
    partnerAndFee,
    executorData,
  };
}

export function swapExactAmountOutEncode(args: SwapActionArgs): Hex {
  const encodedArgs = encodeAbiParameters(swapActionArgsEncoding, [
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
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountOut, encodedArgs]);
}

export function swapExactAmountOutDecode(encoded: Hex): SwapActionArgs {
  const [action, encodedArgs] = decodeAbiParameters(adapterActionEncoding, encoded);
  if (action !== AdapterAction.SwapExactAmountOut) {
    throw new Error("Invalid action type for SwapExactAmountOut");
  }
  const [executor, swapData, partnerAndFee, executorData] = decodeAbiParameters(swapActionArgsEncoding, encodedArgs);
  const { srcToken, destToken, fromAmount, toAmount, quotedAmount, metadata } = swapData;
  return {
    executor,
    swapData: {
      srcToken,
      destToken,
      fromAmount,
      toAmount,
      quotedAmount,
      metadata,
    },
    partnerAndFee,
    executorData,
  };
}

export const swapExactAmountIn = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapExactAmountInEncode,
);

export const swapExactAmountOut = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapExactAmountOutEncode,
);
