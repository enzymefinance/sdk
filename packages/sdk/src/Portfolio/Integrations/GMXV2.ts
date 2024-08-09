import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { assertEnumType } from "../../Utils/assertion.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  CreateOrder: 0n,
  UpdateOrder: 1n,
  CancelOrder: 2n,
  ClaimFundingFees: 3n,
  ClaimCollateral: 4n,
  Sweep: 5n,
} as const;

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
export const OrderType = {
  MarketSwap: 0,
  LimitSwap: 1,
  MarketIncrease: 2,
  LimitIncrease: 3,
  MarketDecrease: 4,
  LimitDecrease: 5,
  StopLossDecrease: 6,
  Liquidation: 7,
} as const;

export type DecreasePositionSwapType = (typeof DecreasePositionSwapType)[keyof typeof DecreasePositionSwapType];
export const DecreasePositionSwapType = {
  NoSwap: 0,
  SwapPnlTokenToCollateralToken: 1,
  SwapCollateralTokenToPnlToken: 2,
} as const;

//--------------------------------------------------------------------------------------------
// CREATE ORDER
//--------------------------------------------------------------------------------------------

export const createOrder = ExternalPositionManager.makeUse(Action.CreateOrder, createOrderEncode);
export const createAndCreateOrder = ExternalPositionManager.makeCreateAndUse(Action.CreateOrder, createOrderEncode);

const createOrderEncoding = [
  {
    components: [
      {
        name: "market",
        type: "address",
      },
      {
        name: "initialCollateralToken",
        type: "address",
      },
    ],
    name: "addresses",
    type: "tuple",
  },
  {
    components: [
      {
        name: "sizeDeltaUsd",
        type: "uint256",
      },
      {
        name: "initialCollateralDeltaAmount",
        type: "uint256",
      },
      {
        name: "triggerPrice",
        type: "uint256",
      },
      {
        name: "acceptablePrice",
        type: "uint256",
      },
      {
        name: "executionFee",
        type: "uint256",
      },
      {
        name: "minOutputAmount",
        type: "uint256",
      },
    ],
    name: "numbers",
    type: "tuple",
  },
  {
    name: "orderType",
    type: "uint8",
  },
  {
    name: "decreasePositionSwapType",
    type: "uint8",
  },
  {
    name: "isLong",
    type: "bool",
  },
  {
    name: "exchangeRouter",
    type: "address",
  },
  {
    name: "autoCancel",
    type: "bool",
  },
] as const;

export type CreateOrderArgs = {
  addresses: {
    market: Address;
    initialCollateralToken: Address;
  };
  numbers: {
    sizeDeltaUsd: bigint;
    initialCollateralDeltaAmount: bigint;
    triggerPrice: bigint;
    acceptablePrice: bigint;
    executionFee: bigint;
    minOutputAmount: bigint;
  };
  orderType: OrderType;
  decreasePositionSwapType: DecreasePositionSwapType;
  isLong: boolean;
  exchangeRouter: Address;
  autoCancel: boolean;
};

export function createOrderEncode(args: CreateOrderArgs): Hex {
  return encodeAbiParameters(createOrderEncoding, [
    args.addresses,
    args.numbers,
    args.orderType,
    args.decreasePositionSwapType,
    args.isLong,
    args.exchangeRouter,
    args.autoCancel,
  ]);
}

export function createOrderDecode(encoded: Hex): CreateOrderArgs {
  const [addresses, numbers, orderType, decreasePositionSwapType, isLong, exchangeRouter, autoCancel] =
    decodeAbiParameters(createOrderEncoding, encoded);

  assertEnumType(OrderType, orderType);
  assertEnumType(DecreasePositionSwapType, decreasePositionSwapType);

  return {
    addresses,
    numbers,
    orderType,
    decreasePositionSwapType,
    isLong,
    exchangeRouter,
    autoCancel,
  };
}

//--------------------------------------------------------------------------------------------
// UPDATE ORDER
//--------------------------------------------------------------------------------------------

export const updateOrder = ExternalPositionManager.makeUse(Action.UpdateOrder, updateOrderEncode);

const updateOrderEncoding = [
  {
    name: "key",
    type: "bytes32",
  },
  {
    name: "sizeDeltaUsd",
    type: "uint256",
  },
  {
    name: "acceptablePrice",
    type: "uint256",
  },
  {
    name: "triggerPrice",
    type: "uint256",
  },
  {
    name: "minOutputAmount",
    type: "uint256",
  },
  {
    name: "exchangeRouter",
    type: "address",
  },
  {
    name: "autoCancel",
    type: "bool",
  },
] as const;

export type UpdateOrderArgs = {
  key: Hex;
  sizeDeltaUsd: bigint;
  triggerPrice: bigint;
  acceptablePrice: bigint;
  minOutputAmount: bigint;
  exchangeRouter: Address;
  autoCancel: boolean;
};

export function updateOrderEncode(args: UpdateOrderArgs): Hex {
  return encodeAbiParameters(updateOrderEncoding, [
    args.key,
    args.sizeDeltaUsd,
    args.acceptablePrice,
    args.triggerPrice,
    args.minOutputAmount,
    args.exchangeRouter,
    args.autoCancel,
  ]);
}

export function updateOrderDecode(encoded: Hex): UpdateOrderArgs {
  const [key, sizeDeltaUsd, acceptablePrice, triggerPrice, minOutputAmount, exchangeRouter, autoCancel] =
    decodeAbiParameters(updateOrderEncoding, encoded);

  return {
    key,
    sizeDeltaUsd,
    triggerPrice,
    acceptablePrice,
    minOutputAmount,
    exchangeRouter,
    autoCancel,
  };
}
