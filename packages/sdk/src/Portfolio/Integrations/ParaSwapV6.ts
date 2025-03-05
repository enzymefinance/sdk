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

export type SwapExactAmountInActionArgs = SwapActionArgs & {
  actionId: typeof AdapterAction.SwapExactAmountIn;
};

export type SwapExactAmountOutActionArgs = SwapActionArgs & {
  actionId: typeof AdapterAction.SwapExactAmountOut;
};

const swapActionArgsEncoding = [
  { type: "address", name: "executor" },
  {
    type: "tuple",
    name: "swapData",
    internalType: "struct IParaSwapV6Adapter.SwapData",
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

export function swapExactAmountInActionEncode(args: SwapActionArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(swapActionArgsEncoding, [
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
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountIn, encodedActionArgs]);
}

export function swapExactAmountInActionDecode(encoded: Hex): SwapActionArgs {
  const [action, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);
  if (action !== AdapterAction.SwapExactAmountIn) {
    throw new Error("Invalid action type for SwapExactAmountIn");
  }
  const [executor, swapData, partnerAndFee, executorData] = decodeAbiParameters(
    swapActionArgsEncoding,
    encodedActionArgs,
  );
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

export function swapExactAmountOutActionEncode(args: SwapActionArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(swapActionArgsEncoding, [
    args.executor,
    args.swapData,
    args.partnerAndFee,
    args.executorData,
  ]);
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountOut, encodedActionArgs]);
}

export function swapExactAmountOutActionDecode(encoded: Hex): SwapActionArgs {
  const [action, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);
  if (action !== AdapterAction.SwapExactAmountOut) {
    throw new Error("Invalid action type for SwapExactAmountOut");
  }
  const [executor, swapData, partnerAndFee, executorData] = decodeAbiParameters(
    swapActionArgsEncoding,
    encodedActionArgs,
  );
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

export function swapExactAmountInEncode(args: SwapExactAmountInActionArgs): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = swapExactAmountInActionEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function swapExactAmountInDecode(encoded: Hex): SwapExactAmountInActionArgs {
  const [actionId, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);

  if (actionId !== AdapterAction.SwapExactAmountIn) {
    throw new Error("Invalid action type for SwapExactAmountIn");
  }

  const actionArgs = swapExactAmountInActionDecode(encodedActionArgs);

  return {
    actionId,
    ...actionArgs,
  };
}

export function swapExactAmountOutEncode(args: SwapExactAmountOutActionArgs): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = swapExactAmountOutActionEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function swapExactAmountOutDecode(encoded: Hex): SwapExactAmountOutActionArgs {
  const [actionId, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);

  if (actionId !== AdapterAction.SwapExactAmountOut) {
    throw new Error("Invalid action type for SwapExactAmountOut");
  }

  const actionArgs = swapExactAmountOutActionDecode(encodedActionArgs);

  return {
    actionId,
    ...actionArgs,
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
