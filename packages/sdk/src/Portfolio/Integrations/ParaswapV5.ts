import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";
//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

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
      name: "index",
      type: "uint256",
    },
    {
      name: "targetExchange",
      type: "address",
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
      name: "adapters",
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

export type Route = {
  targetExchange: Address;
  index: bigint;
  percent: bigint;
  payload: Hex;
  networkFee: bigint;
};

export type Adapter = {
  adapter: Address;
  percent: bigint;
  networkFee: bigint;
  route: ReadonlyArray<Route>;
};

export type Path = {
  to: Address;
  totalNetworkFee: bigint;
  adapters: ReadonlyArray<Adapter>;
};

export type MegaSwapData = ReadonlyArray<{
  fromAmountPercent: bigint;
  path: ReadonlyArray<Path>;
}>;

export type MultiSwapData = ReadonlyArray<Path>;

export type SimpleSwapData = {
  incomingAsset: Address;
  callees: ReadonlyArray<Address>;
  exchangeData: Hex;
  startIndexes: ReadonlyArray<bigint>;
  values: ReadonlyArray<bigint>;
};

export type SwapType = typeof SwapType[keyof typeof SwapType];
export const SwapType = {
  Simple: 0n,
  Multi: 1n,
  Mega: 2n,
} as const;

export type TakeOrderArgs = {
  expectedIncomingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
  outgoingAsset: Address;
  outgoingAssetAmount: bigint;
  uuid: Hex;
} & (
  | { swapType: typeof SwapType.Mega; swapData: MegaSwapData }
  | { swapType: typeof SwapType.Multi; swapData: MultiSwapData }
  | { swapType: typeof SwapType.Simple; swapData: SimpleSwapData }
);

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  let encodedSwapData: Hex;

  const swapType = args.swapType;
  switch (swapType) {
    case SwapType.Mega: {
      encodedSwapData = encodeAbiParameters([megaSwapDataEncoding], [args.swapData]);
      break;
    }

    case SwapType.Multi: {
      encodedSwapData = encodeAbiParameters([multiSwapDataEncoding], [args.swapData]);
      break;
    }

    case SwapType.Simple: {
      encodedSwapData = encodeAbiParameters([simpleSwapDataEncoding], [args.swapData]);
      break;
    }

    default: {
      Assertion.never(swapType, "Invalid swapType");
    }
  }

  return encodeAbiParameters(takeOrderEncoding, [
    args.minIncomingAssetAmount,
    args.expectedIncomingAssetAmount,
    args.outgoingAsset,
    args.outgoingAssetAmount,
    args.uuid,
    args.swapType,
    encodedSwapData,
  ]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
    swapTypeUntyped,
    encodedSwapData,
  ] = decodeAbiParameters(takeOrderEncoding, encoded);

  const common = {
    minIncomingAssetAmount,
    expectedIncomingAssetAmount,
    outgoingAsset,
    outgoingAssetAmount,
    uuid,
  };

  const swapType = swapTypeUntyped as SwapType;

  switch (swapType) {
    case SwapType.Mega: {
      const [swapData] = decodeAbiParameters([megaSwapDataEncoding], encodedSwapData);

      return {
        ...common,
        swapType,
        swapData,
      };
    }

    case SwapType.Multi: {
      const [swapData] = decodeAbiParameters([multiSwapDataEncoding], encodedSwapData);

      return {
        ...common,
        swapType,
        swapData,
      };
    }

    case SwapType.Simple: {
      const [swapData] = decodeAbiParameters([simpleSwapDataEncoding], encodedSwapData);

      return {
        ...common,
        swapType,
        swapData,
      };
    }

    default: {
      Assertion.never(swapType, "Invalid swapType");
    }
  }
}

//--------------------------------------------------------------------------------------------
// TAKE MULTIPLE ORDERS
//--------------------------------------------------------------------------------------------

export const takeMultipleOrders = IntegrationManager.makeUse(
  IntegrationManager.Selector.TakeMultipleOrders,
  takeMultipleOrdersEncode,
);

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

export type TakeMultipleOrdersArgs = {
  allowOrdersToFail: boolean;
  orders: ReadonlyArray<TakeOrderArgs>;
};

export function takeMultipleOrdersEncode(args: TakeMultipleOrdersArgs): Hex {
  const ordersData = args.orders.map((order) => takeOrderEncode(order));

  return encodeAbiParameters(takeMultipleOrdersEncoding, [ordersData, args.allowOrdersToFail]);
}

export function takeMultipleOrdersDecode(encoded: Hex): TakeMultipleOrdersArgs {
  const [ordersData, allowOrdersToFail] = decodeAbiParameters(takeMultipleOrdersEncoding, encoded);

  return {
    allowOrdersToFail,
    orders: ordersData.map((orderData) => takeOrderDecode(orderData)),
  };
}
