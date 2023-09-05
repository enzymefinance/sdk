import type { DeepWriteable } from "../../../utils/types.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ParaswapV5SwapType = typeof ParaswapV5SwapType[keyof typeof ParaswapV5SwapType];
export const ParaswapV5SwapType = {
  Simple: 0n,
  Multi: 1n,
  Mega: 2n,
} as const;

const paraswapV5TakeOrderEncoding = [
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
  {
    name: "expectedIncomingAssetAmount",
    type: "uint256",
  },
  {
    name: "outgoingAsset",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "uuid",
    type: "bytes16",
  },
  {
    name: "swapType",
    type: "uint256",
  },
  {
    name: "swapData",
    type: "bytes",
  },
] as const;

const paraswapV5RouteEncoding = {
  components: [
    {
      name: "targetExchange",
      type: "address",
    },
    {
      name: "index",
      type: "uint256",
    },
    {
      name: "percent",
      type: "uint256",
    },
    {
      name: "payload",
      type: "bytes",
    },
    {
      name: "networkFee",
      type: "uint256",
    },
  ],
} as const;

const paraswapV5AdapterEncoding = {
  components: [
    {
      name: "adapter",
      type: "address",
    },
    {
      name: "percent",
      type: "uint256",
    },
    {
      name: "networkFee",
      type: "uint256",
    },
    {
      name: "route",
      type: "tuple[]",
      ...paraswapV5RouteEncoding,
    },
  ],
} as const;

const paraswapV5PathEncoding = {
  components: [
    {
      name: "to",
      type: "address",
    },
    {
      name: "totalNetworkFee",
      type: "uint256",
    },
    {
      name: "adapter",
      type: "tuple[]",
      ...paraswapV5AdapterEncoding,
    },
  ],
} as const;

const paraswapV5MegaSwapDataEncoding = {
  components: [
    {
      name: "fromAmountPercent",
      type: "uint256",
    },
    {
      name: "path",
      type: "tuple[]",
      ...paraswapV5PathEncoding,
    },
  ],
  name: "megaSwapData",
  type: "tuple[]",
} as const;

const paraswapV5MultiSwapDataEncoding = {
  name: "multiSwapPath",
  type: "tuple[]",
  ...paraswapV5PathEncoding,
} as const;

const paraswapV5SimpleSwapDataEncoding = {
  components: [
    {
      name: "incomingAsset",
      type: "address",
    },
    {
      name: "callees",
      type: "address[]",
    },
    {
      name: "exchangeData",
      type: "bytes",
    },
    {
      name: "startIndexes",
      type: "uint256[]",
    },
    {
      name: "values",
      type: "uint256[]",
    },
  ],
  name: "simpleSwapParams",
  type: "tuple",
} as const;

export type ParaswapV5Route = {
  targetExchange: Address;
  index: bigint;
  percent: bigint;
  payload: Hex;
  networkFee: bigint;
};

export type ParaswapV5Adapter = {
  adapter: Address;
  percent: bigint;
  networkFee: bigint;
  route: ParaswapV5Route[];
};

export type ParaswapV5Path = {
  to: Address;
  totalNetworkFee: bigint;
  adapter: ParaswapV5Adapter[];
};

export type ParaswapV5MegaSwapData = {
  fromAmountPercent: bigint;
  path: ParaswapV5Path[];
}[];

export type ParaswapV5MultiSwapData = ParaswapV5Path[];

export type ParaswapV5SimpleSwapData = {
  incomingAsset: Address;
  callees: Address[];
  exchangeData: Hex;
  startIndexes: bigint[];
  values: bigint[];
};

export type ParaswapV5TakeOrderArgs = {
  expectedIncomingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
  outgoingAsset: Address;
  outgoingAssetAmount: bigint;
  uuid: Hex;
} & (
  | { swapType: typeof ParaswapV5SwapType.Mega; swapData: ParaswapV5MegaSwapData }
  | { swapType: typeof ParaswapV5SwapType.Multi; swapData: ParaswapV5MultiSwapData }
  | { swapType: typeof ParaswapV5SwapType.Simple; swapData: ParaswapV5SimpleSwapData }
);

function assertParaswapV5SwapType(value: bigint): asserts value is ParaswapV5SwapType {
  if (!Object.values(ParaswapV5SwapType).includes(value as ParaswapV5SwapType)) {
    throw new Error(`Invalid ParaswapV5SwapType: ${value}`);
  }
}

export function encodeParaswapV5TakeOrderArgs({
  expectedIncomingAssetAmount,
  minIncomingAssetAmount,
  outgoingAsset,
  outgoingAssetAmount,
  swapData,
  swapType,
  uuid,
}: ParaswapV5TakeOrderArgs): Hex {
  let encodedSwapData: Hex;

  if (swapType === ParaswapV5SwapType.Mega) {
    encodedSwapData = encodeAbiParameters([paraswapV5MegaSwapDataEncoding], [swapData]);
  } else if (swapType === ParaswapV5SwapType.Multi) {
    encodedSwapData = encodeAbiParameters([paraswapV5MultiSwapDataEncoding], [swapData]);
  } else if (swapType === ParaswapV5SwapType.Simple) {
    encodedSwapData = encodeAbiParameters([paraswapV5SimpleSwapDataEncoding], [swapData]);
  } else {
    const _exhaustiveCheck: never = swapType;
    return _exhaustiveCheck;
  }

  return encodeAbiParameters(paraswapV5TakeOrderEncoding, [
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
    swapType,
    encodedSwapData,
  ]);
}

export function decodeParaswapV5TakeOrderArgs(callArgs: Hex): ParaswapV5TakeOrderArgs {
  const [
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
    swapType,
    encodedSwapData,
  ] = decodeAbiParameters(paraswapV5TakeOrderEncoding, callArgs);

  assertParaswapV5SwapType(swapType);

  const commonDecodedData = {
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
  };

  if (swapType === ParaswapV5SwapType.Mega) {
    const [swapData] = decodeAbiParameters([paraswapV5MegaSwapDataEncoding], encodedSwapData);

    return {
      ...commonDecodedData,
      swapType,
      swapData: swapData as DeepWriteable<ParaswapV5MegaSwapData>,
    };
  }

  if (swapType === ParaswapV5SwapType.Multi) {
    const [swapData] = decodeAbiParameters([paraswapV5MultiSwapDataEncoding], encodedSwapData);

    return {
      ...commonDecodedData,
      swapType,
      swapData: swapData as DeepWriteable<ParaswapV5MultiSwapData>,
    };
  }

  if (swapType === ParaswapV5SwapType.Simple) {
    const [swapData] = decodeAbiParameters([paraswapV5SimpleSwapDataEncoding], encodedSwapData);

    return {
      ...commonDecodedData,
      swapType,
      swapData: swapData as DeepWriteable<ParaswapV5SimpleSwapData>,
    };
  }

  const _exhaustiveCheck: never = swapType;
  return _exhaustiveCheck;
}
