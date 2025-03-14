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
  {
    type: "tuple",
    name: "swapActionArgs",
    internalType: "struct IParaSwapV6Adapter.SwapActionArgs",
    components: [
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
    ],
  },
] as const;

export function swapExactAmountInEncode(args: SwapActionArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(swapActionArgsEncoding, [
    {
      executor: args.executor,
      swapData: args.swapData,
      partnerAndFee: args.partnerAndFee,
      executorData: args.executorData,
    },
  ]);
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountIn, encodedActionArgs]);
}

export function swapExactAmountInDecode(encoded: Hex): SwapActionArgs {
  const [action, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);
  if (action !== AdapterAction.SwapExactAmountIn) {
    throw new Error("Invalid action type for SwapExactAmountIn");
  }
  const { executor, swapData, partnerAndFee, executorData } = decodeAbiParameters(
    swapActionArgsEncoding,
    encodedActionArgs,
  )[0];

  return {
    executor,
    swapData,
    partnerAndFee,
    executorData,
  };
}

export function swapExactAmountOutEncode(args: SwapActionArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(swapActionArgsEncoding, [
    {
      executor: args.executor,
      swapData: args.swapData,
      partnerAndFee: args.partnerAndFee,
      executorData: args.executorData,
    },
  ]);
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapExactAmountOut, encodedActionArgs]);
}

export function swapExactAmountOutDecode(encoded: Hex): SwapActionArgs {
  const [action, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);
  if (action !== AdapterAction.SwapExactAmountOut) {
    throw new Error("Invalid action type for SwapExactAmountOut");
  }
  const { executor, swapData, partnerAndFee, executorData } = decodeAbiParameters(
    swapActionArgsEncoding,
    encodedActionArgs,
  )[0];
  return {
    executor,
    swapData,
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
