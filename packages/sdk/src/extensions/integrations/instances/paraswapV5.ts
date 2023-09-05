import { never } from "../../../utils/assertions.js";
import type { DeepWriteable } from "../../../utils/types.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ParaswapV5SwapType = typeof ParaswapV5SwapType[keyof typeof ParaswapV5SwapType];
export const ParaswapV5SwapType = {
  Simple: 0n,
  Multi: 1n,
  Mega: 2n,
} as const;

const takeOrderEncoding = [
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

const routeEncoding = {
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

const adapterEncoding = {
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
      ...routeEncoding,
    },
  ],
} as const;

const pathEncoding = {
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
      ...adapterEncoding,
    },
  ],
} as const;

const megaSwapDataEncoding = {
  components: [
    {
      name: "fromAmountPercent",
      type: "uint256",
    },
    {
      name: "path",
      type: "tuple[]",
      ...pathEncoding,
    },
  ],
  name: "megaSwapData",
  type: "tuple[]",
} as const;

const multiSwapDataEncoding = {
  name: "multiSwapPath",
  type: "tuple[]",
  ...pathEncoding,
} as const;

const simpleSwapDataEncoding = {
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

  switch (swapType) {
    case ParaswapV5SwapType.Mega: {
      encodedSwapData = encodeAbiParameters([megaSwapDataEncoding], [swapData]);
      break;
    }

    case ParaswapV5SwapType.Multi: {
      encodedSwapData = encodeAbiParameters([multiSwapDataEncoding], [swapData]);
      break;
    }

    case ParaswapV5SwapType.Simple: {
      encodedSwapData = encodeAbiParameters([simpleSwapDataEncoding], [swapData]);
      break;
    }

    default: {
      never(swapType, "Invalid swap type");
    }
  }

  return encodeAbiParameters(takeOrderEncoding, [
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
    swapTypeUntyped,
    encodedSwapData,
  ] = decodeAbiParameters(takeOrderEncoding, callArgs);

  const common = {
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
  };

  const swapType = swapTypeUntyped as ParaswapV5SwapType;

  switch (swapType) {
    case ParaswapV5SwapType.Mega: {
      const [swapData] = decodeAbiParameters([megaSwapDataEncoding], encodedSwapData);

      return {
        ...common,
        swapType,
        swapData: swapData as DeepWriteable<ParaswapV5MegaSwapData>,
      };
    }

    case ParaswapV5SwapType.Multi: {
      const [swapData] = decodeAbiParameters([multiSwapDataEncoding], encodedSwapData);

      return {
        ...common,
        swapType,
        swapData: swapData as DeepWriteable<ParaswapV5MultiSwapData>,
      };
    }

    case ParaswapV5SwapType.Simple: {
      const [swapData] = decodeAbiParameters([simpleSwapDataEncoding], encodedSwapData);

      return {
        ...common,
        swapType,
        swapData: swapData as DeepWriteable<ParaswapV5SimpleSwapData>,
      };
    }

    default: {
      never(swapType, "Invalid swap type");
    }
  }
}

const takeMultipleOrdersEncoding = [
  {
    name: "ordersData",
    type: "bytes[]",
  },
  {
    name: "allowOrdersToFail",
    type: "bool",
  },
] as const;

export type ParaswapV5TakeMultipleOrdersArgs = {
  allowOrdersToFail: boolean;
  orders: ParaswapV5TakeOrderArgs[];
};

export function encodeParaswapV5TakeMultipleOrdersArgs({
  orders,
  allowOrdersToFail,
}: ParaswapV5TakeMultipleOrdersArgs): Hex {
  const ordersData = orders.map((order) => encodeParaswapV5TakeOrderArgs(order));

  return encodeAbiParameters(takeMultipleOrdersEncoding, [ordersData, allowOrdersToFail]);
}

export function decodeParaswapV5TakeMultipleOrdersArgs(callArgs: Hex): ParaswapV5TakeMultipleOrdersArgs {
  const [ordersData, allowOrdersToFail] = decodeAbiParameters(takeMultipleOrdersEncoding, callArgs);

  return {
    allowOrdersToFail,
    orders: ordersData.map((orderData) => decodeParaswapV5TakeOrderArgs(orderData)),
  };
}
