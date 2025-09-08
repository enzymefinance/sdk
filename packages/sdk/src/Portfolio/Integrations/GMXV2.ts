import { IGMXV2LeverageTradingPositionLib } from "@enzymefinance/abis";
import {
  type Address,
  type Client,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  formatUnits,
  isAddressEqual,
  keccak256,
  parseUnits,
  zeroAddress,
} from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import { assertEnumType } from "../../Utils/assertion.js";
import { getGasPrice } from "../../Utils/gas.js";
import { multiplyBySlippage } from "../../Utils/slippage.js";
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
  MarketIncrease: 2,
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
      {
        name: "validFromTime",
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
    validFromTime: bigint;
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
    name: "validFromTime",
    type: "uint256",
  },
  {
    name: "autoCancel",
    type: "bool",
  },
  {
    name: "executionFeeIncrease",
    type: "uint256",
  },
  {
    name: "exchangeRouter",
    type: "address",
  },
] as const;

export type UpdateOrderArgs = {
  key: Hex;
  sizeDeltaUsd: bigint;
  acceptablePrice: bigint;
  triggerPrice: bigint;
  minOutputAmount: bigint;
  validFromTime: bigint;
  autoCancel: boolean;
  executionFeeIncrease: bigint;
  exchangeRouter: Address;
};

export function updateOrderEncode(args: UpdateOrderArgs): Hex {
  return encodeAbiParameters(updateOrderEncoding, [
    args.key,
    args.sizeDeltaUsd,
    args.acceptablePrice,
    args.triggerPrice,
    args.minOutputAmount,
    args.validFromTime,
    args.autoCancel,
    args.executionFeeIncrease,
    args.exchangeRouter,
  ]);
}

export function updateOrderDecode(encoded: Hex): UpdateOrderArgs {
  const [
    key,
    sizeDeltaUsd,
    acceptablePrice,
    triggerPrice,
    minOutputAmount,
    validFromTime,
    autoCancel,
    executionFeeIncrease,
    exchangeRouter,
  ] = decodeAbiParameters(updateOrderEncoding, encoded);

  return {
    key,
    sizeDeltaUsd,
    triggerPrice,
    acceptablePrice,
    validFromTime,
    minOutputAmount,
    exchangeRouter,
    executionFeeIncrease,
    autoCancel,
  };
}

//--------------------------------------------------------------------------------------------
// CANCEL ORDER
//--------------------------------------------------------------------------------------------

export const cancelOrder = ExternalPositionManager.makeUse(Action.CancelOrder, cancelOrderEncode);

const cancelOrderEncoding = [
  {
    name: "key",
    type: "bytes32",
  },
  {
    name: "exchangeRouter",
    type: "address",
  },
] as const;

export type CancelOrderArgs = {
  key: Hex;
  exchangeRouter: Address;
};

export function cancelOrderEncode(args: CancelOrderArgs): Hex {
  return encodeAbiParameters(cancelOrderEncoding, [args.key, args.exchangeRouter]);
}

export function cancelOrderDecode(encoded: Hex): CancelOrderArgs {
  const [key, exchangeRouter] = decodeAbiParameters(cancelOrderEncoding, encoded);

  return {
    key,
    exchangeRouter,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM FUNDING FEES
//--------------------------------------------------------------------------------------------

export const claimFundingFees = ExternalPositionManager.makeUse(Action.ClaimFundingFees, claimFundingFeesEncode);

const claimFundingFeesEncoding = [
  {
    type: "tuple",
    components: [
      {
        name: "markets",
        type: "address[]",
      },
      {
        name: "tokens",
        type: "address[]",
      },
      {
        name: "exchangeRouter",
        type: "address",
      },
    ],
  },
] as const;

export type ClaimFundingFeesArgs = {
  markets: ReadonlyArray<Address>;
  tokens: ReadonlyArray<Address>;
  exchangeRouter: Address;
};

export function claimFundingFeesEncode(args: ClaimFundingFeesArgs): Hex {
  return encodeAbiParameters(claimFundingFeesEncoding, [args]);
}

export function claimFundingFeesDecode(encoded: Hex): ClaimFundingFeesArgs {
  const [{ markets, tokens, exchangeRouter }] = decodeAbiParameters(claimFundingFeesEncoding, encoded);

  return {
    markets,
    tokens,
    exchangeRouter,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM COLLATERAL
//--------------------------------------------------------------------------------------------

export const claimCollateral = ExternalPositionManager.makeUse(Action.ClaimCollateral, claimCollateralEncode);

const claimCollateralEncoding = [
  {
    type: "tuple",
    components: [
      {
        name: "markets",
        type: "address[]",
      },
      {
        name: "tokens",
        type: "address[]",
      },
      {
        name: "timeKeys",
        type: "uint256[]",
      },
      {
        name: "exchangeRouter",
        type: "address",
      },
    ],
  },
] as const;

export type ClaimCollateralArgs = {
  markets: ReadonlyArray<Address>;
  tokens: ReadonlyArray<Address>;
  timeKeys: ReadonlyArray<bigint>;
  exchangeRouter: Address;
};

export function claimCollateralEncode(args: ClaimCollateralArgs): Hex {
  return encodeAbiParameters(claimCollateralEncoding, [args]);
}

export function claimCollateralDecode(encoded: Hex): ClaimCollateralArgs {
  const [{ markets, tokens, timeKeys, exchangeRouter }] = decodeAbiParameters(claimCollateralEncoding, encoded);

  return {
    markets,
    tokens,
    timeKeys,
    exchangeRouter,
  };
}

//--------------------------------------------------------------------------------------------
// SWEEP
//--------------------------------------------------------------------------------------------

export const sweep = ExternalPositionManager.makeUse(Action.Sweep);

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const readerAbi = [
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getAccountOrders",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "orderKey", type: "bytes32" },
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "account", type: "address" },
                  { internalType: "address", name: "receiver", type: "address" },
                  { internalType: "address", name: "cancellationReceiver", type: "address" },
                  { internalType: "address", name: "callbackContract", type: "address" },
                  { internalType: "address", name: "uiFeeReceiver", type: "address" },
                  { internalType: "address", name: "market", type: "address" },
                  { internalType: "address", name: "initialCollateralToken", type: "address" },
                  { internalType: "address[]", name: "swapPath", type: "address[]" },
                ],
                internalType: "struct Order.Addresses",
                name: "addresses",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "enum Order.OrderType", name: "orderType", type: "uint8" },
                  {
                    internalType: "enum Order.DecreasePositionSwapType",
                    name: "decreasePositionSwapType",
                    type: "uint8",
                  },
                  { internalType: "uint256", name: "sizeDeltaUsd", type: "uint256" },
                  { internalType: "uint256", name: "initialCollateralDeltaAmount", type: "uint256" },
                  { internalType: "uint256", name: "triggerPrice", type: "uint256" },
                  { internalType: "uint256", name: "acceptablePrice", type: "uint256" },
                  { internalType: "uint256", name: "executionFee", type: "uint256" },
                  { internalType: "uint256", name: "callbackGasLimit", type: "uint256" },
                  { internalType: "uint256", name: "minOutputAmount", type: "uint256" },
                  { internalType: "uint256", name: "updatedAtTime", type: "uint256" },
                  { internalType: "uint256", name: "validFromTime", type: "uint256" },
                  { internalType: "uint256", name: "srcChainId", type: "uint256" },
                ],
                internalType: "struct Order.Numbers",
                name: "numbers",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "bool", name: "isLong", type: "bool" },
                  { internalType: "bool", name: "shouldUnwrapNativeToken", type: "bool" },
                  { internalType: "bool", name: "isFrozen", type: "bool" },
                  { internalType: "bool", name: "autoCancel", type: "bool" },
                ],
                internalType: "struct Order.Flags",
                name: "flags",
                type: "tuple",
              },
              { internalType: "bytes32[]", name: "_dataList", type: "bytes32[]" },
            ],
            internalType: "struct Order.Props",
            name: "order",
            type: "tuple",
          },
        ],
        internalType: "struct ReaderUtils.OrderInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "contract IReferralStorage", name: "referralStorage", type: "address" },
      { internalType: "address", name: "account", type: "address" },
      { internalType: "address[]", name: "markets", type: "address[]" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices[]",
        name: "marketPrices",
        type: "tuple[]",
      },
      { internalType: "address", name: "uiFeeReceiver", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getAccountPositionInfoList",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "positionKey", type: "bytes32" },
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "account", type: "address" },
                  { internalType: "address", name: "market", type: "address" },
                  { internalType: "address", name: "collateralToken", type: "address" },
                ],
                internalType: "struct Position.Addresses",
                name: "addresses",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "sizeInUsd", type: "uint256" },
                  { internalType: "uint256", name: "sizeInTokens", type: "uint256" },
                  { internalType: "uint256", name: "collateralAmount", type: "uint256" },
                  { internalType: "int256", name: "pendingImpactAmount", type: "int256" },
                  { internalType: "uint256", name: "borrowingFactor", type: "uint256" },
                  { internalType: "uint256", name: "fundingFeeAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "longTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "shortTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "increasedAtTime", type: "uint256" },
                  { internalType: "uint256", name: "decreasedAtTime", type: "uint256" },
                ],
                internalType: "struct Position.Numbers",
                name: "numbers",
                type: "tuple",
              },
              {
                components: [{ internalType: "bool", name: "isLong", type: "bool" }],
                internalType: "struct Position.Flags",
                name: "flags",
                type: "tuple",
              },
            ],
            internalType: "struct Position.Props",
            name: "position",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  { internalType: "bytes32", name: "referralCode", type: "bytes32" },
                  { internalType: "address", name: "affiliate", type: "address" },
                  { internalType: "address", name: "trader", type: "address" },
                  { internalType: "uint256", name: "totalRebateFactor", type: "uint256" },
                  { internalType: "uint256", name: "affiliateRewardFactor", type: "uint256" },
                  { internalType: "uint256", name: "adjustedAffiliateRewardFactor", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountFactor", type: "uint256" },
                  { internalType: "uint256", name: "totalRebateAmount", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountAmount", type: "uint256" },
                  { internalType: "uint256", name: "affiliateRewardAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionReferralFees",
                name: "referral",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "traderTier", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountFactor", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionProFees",
                name: "pro",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "fundingFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "claimableLongTokenAmount", type: "uint256" },
                  { internalType: "uint256", name: "claimableShortTokenAmount", type: "uint256" },
                  { internalType: "uint256", name: "latestFundingFeeAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "latestLongTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "latestShortTokenClaimableFundingAmountPerSize", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionFundingFees",
                name: "funding",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "borrowingFeeUsd", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeAmountForFeeReceiver", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionBorrowingFees",
                name: "borrowing",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "address", name: "uiFeeReceiver", type: "address" },
                  { internalType: "uint256", name: "uiFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "uiFeeAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionUiFees",
                name: "ui",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "liquidationFeeUsd", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeAmountForFeeReceiver", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionLiquidationFees",
                name: "liquidation",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "min", type: "uint256" },
                  { internalType: "uint256", name: "max", type: "uint256" },
                ],
                internalType: "struct Price.Props",
                name: "collateralTokenPrice",
                type: "tuple",
              },
              { internalType: "uint256", name: "positionFeeFactor", type: "uint256" },
              { internalType: "uint256", name: "protocolFeeAmount", type: "uint256" },
              { internalType: "uint256", name: "positionFeeReceiverFactor", type: "uint256" },
              { internalType: "uint256", name: "feeReceiverAmount", type: "uint256" },
              { internalType: "uint256", name: "feeAmountForPool", type: "uint256" },
              { internalType: "uint256", name: "positionFeeAmountForPool", type: "uint256" },
              { internalType: "uint256", name: "positionFeeAmount", type: "uint256" },
              { internalType: "uint256", name: "totalCostAmountExcludingFunding", type: "uint256" },
              { internalType: "uint256", name: "totalCostAmount", type: "uint256" },
              { internalType: "uint256", name: "totalDiscountAmount", type: "uint256" },
            ],
            internalType: "struct PositionPricingUtils.PositionFees",
            name: "fees",
            type: "tuple",
          },
          {
            components: [
              { internalType: "int256", name: "priceImpactUsd", type: "int256" },
              { internalType: "uint256", name: "executionPrice", type: "uint256" },
              { internalType: "bool", name: "balanceWasImproved", type: "bool" },
              { internalType: "int256", name: "proportionalPendingImpactUsd", type: "int256" },
              { internalType: "int256", name: "totalImpactUsd", type: "int256" },
              { internalType: "uint256", name: "priceImpactDiffUsd", type: "uint256" },
            ],
            internalType: "struct ReaderPricingUtils.ExecutionPriceResult",
            name: "executionPriceResult",
            type: "tuple",
          },
          { internalType: "int256", name: "basePnlUsd", type: "int256" },
          { internalType: "int256", name: "uncappedBasePnlUsd", type: "int256" },
          { internalType: "int256", name: "pnlAfterPriceImpactUsd", type: "int256" },
        ],
        internalType: "struct ReaderPositionUtils.PositionInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getAccountPositions",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "market", type: "address" },
              { internalType: "address", name: "collateralToken", type: "address" },
            ],
            internalType: "struct Position.Addresses",
            name: "addresses",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "sizeInUsd", type: "uint256" },
              { internalType: "uint256", name: "sizeInTokens", type: "uint256" },
              { internalType: "uint256", name: "collateralAmount", type: "uint256" },
              { internalType: "int256", name: "pendingImpactAmount", type: "int256" },
              { internalType: "uint256", name: "borrowingFactor", type: "uint256" },
              { internalType: "uint256", name: "fundingFeeAmountPerSize", type: "uint256" },
              { internalType: "uint256", name: "longTokenClaimableFundingAmountPerSize", type: "uint256" },
              { internalType: "uint256", name: "shortTokenClaimableFundingAmountPerSize", type: "uint256" },
              { internalType: "uint256", name: "increasedAtTime", type: "uint256" },
              { internalType: "uint256", name: "decreasedAtTime", type: "uint256" },
            ],
            internalType: "struct Position.Numbers",
            name: "numbers",
            type: "tuple",
          },
          {
            components: [{ internalType: "bool", name: "isLong", type: "bool" }],
            internalType: "struct Position.Flags",
            name: "flags",
            type: "tuple",
          },
        ],
        internalType: "struct Position.Props[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "market", type: "address" },
      { internalType: "bool", name: "isLong", type: "bool" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
    ],
    name: "getAdlState",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bool", name: "", type: "bool" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "bytes32", name: "key", type: "bytes32" },
    ],
    name: "getDeposit",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "receiver", type: "address" },
              { internalType: "address", name: "callbackContract", type: "address" },
              { internalType: "address", name: "uiFeeReceiver", type: "address" },
              { internalType: "address", name: "market", type: "address" },
              { internalType: "address", name: "initialLongToken", type: "address" },
              { internalType: "address", name: "initialShortToken", type: "address" },
              { internalType: "address[]", name: "longTokenSwapPath", type: "address[]" },
              { internalType: "address[]", name: "shortTokenSwapPath", type: "address[]" },
            ],
            internalType: "struct Deposit.Addresses",
            name: "addresses",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "initialLongTokenAmount", type: "uint256" },
              { internalType: "uint256", name: "initialShortTokenAmount", type: "uint256" },
              { internalType: "uint256", name: "minMarketTokens", type: "uint256" },
              { internalType: "uint256", name: "updatedAtTime", type: "uint256" },
              { internalType: "uint256", name: "executionFee", type: "uint256" },
              { internalType: "uint256", name: "callbackGasLimit", type: "uint256" },
              { internalType: "uint256", name: "srcChainId", type: "uint256" },
            ],
            internalType: "struct Deposit.Numbers",
            name: "numbers",
            type: "tuple",
          },
          {
            components: [{ internalType: "bool", name: "shouldUnwrapNativeToken", type: "bool" }],
            internalType: "struct Deposit.Flags",
            name: "flags",
            type: "tuple",
          },
          { internalType: "bytes32[]", name: "_dataList", type: "bytes32[]" },
        ],
        internalType: "struct Deposit.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "uint256", name: "longTokenAmount", type: "uint256" },
      { internalType: "uint256", name: "shortTokenAmount", type: "uint256" },
      { internalType: "address", name: "uiFeeReceiver", type: "address" },
      { internalType: "enum ISwapPricingUtils.SwapPricingType", name: "swapPricingType", type: "uint8" },
      { internalType: "bool", name: "includeVirtualInventoryImpact", type: "bool" },
    ],
    name: "getDepositAmountOut",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "marketKey", type: "address" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "uint256", name: "positionSizeInUsd", type: "uint256" },
      { internalType: "uint256", name: "positionSizeInTokens", type: "uint256" },
      { internalType: "int256", name: "sizeDeltaUsd", type: "int256" },
      { internalType: "int256", name: "pendingImpactAmount", type: "int256" },
      { internalType: "bool", name: "isLong", type: "bool" },
    ],
    name: "getExecutionPrice",
    outputs: [
      {
        components: [
          { internalType: "int256", name: "priceImpactUsd", type: "int256" },
          { internalType: "uint256", name: "executionPrice", type: "uint256" },
          { internalType: "bool", name: "balanceWasImproved", type: "bool" },
          { internalType: "int256", name: "proportionalPendingImpactUsd", type: "int256" },
          { internalType: "int256", name: "totalImpactUsd", type: "int256" },
          { internalType: "uint256", name: "priceImpactDiffUsd", type: "uint256" },
        ],
        internalType: "struct ReaderPricingUtils.ExecutionPriceResult",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "key", type: "address" },
    ],
    name: "getMarket",
    outputs: [
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
    ],
    name: "getMarketBySalt",
    outputs: [
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "address", name: "marketKey", type: "address" },
    ],
    name: "getMarketInfo",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "marketToken", type: "address" },
              { internalType: "address", name: "indexToken", type: "address" },
              { internalType: "address", name: "longToken", type: "address" },
              { internalType: "address", name: "shortToken", type: "address" },
            ],
            internalType: "struct Market.Props",
            name: "market",
            type: "tuple",
          },
          { internalType: "uint256", name: "borrowingFactorPerSecondForLongs", type: "uint256" },
          { internalType: "uint256", name: "borrowingFactorPerSecondForShorts", type: "uint256" },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "fundingFeeAmountPerSize",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "claimableFundingAmountPerSize",
                type: "tuple",
              },
            ],
            internalType: "struct ReaderUtils.BaseFundingValues",
            name: "baseFunding",
            type: "tuple",
          },
          {
            components: [
              { internalType: "bool", name: "longsPayShorts", type: "bool" },
              { internalType: "uint256", name: "fundingFactorPerSecond", type: "uint256" },
              { internalType: "int256", name: "nextSavedFundingFactorPerSecond", type: "int256" },
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "fundingFeeAmountPerSizeDelta",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "claimableFundingAmountPerSizeDelta",
                type: "tuple",
              },
            ],
            internalType: "struct MarketUtils.GetNextFundingAmountPerSizeResult",
            name: "nextFunding",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "virtualPoolAmountForLongToken", type: "uint256" },
              { internalType: "uint256", name: "virtualPoolAmountForShortToken", type: "uint256" },
              { internalType: "int256", name: "virtualInventoryForPositions", type: "int256" },
            ],
            internalType: "struct ReaderUtils.VirtualInventory",
            name: "virtualInventory",
            type: "tuple",
          },
          { internalType: "bool", name: "isDisabled", type: "bool" },
        ],
        internalType: "struct ReaderUtils.MarketInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices[]",
        name: "marketPricesList",
        type: "tuple[]",
      },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getMarketInfoList",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "marketToken", type: "address" },
              { internalType: "address", name: "indexToken", type: "address" },
              { internalType: "address", name: "longToken", type: "address" },
              { internalType: "address", name: "shortToken", type: "address" },
            ],
            internalType: "struct Market.Props",
            name: "market",
            type: "tuple",
          },
          { internalType: "uint256", name: "borrowingFactorPerSecondForLongs", type: "uint256" },
          { internalType: "uint256", name: "borrowingFactorPerSecondForShorts", type: "uint256" },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "fundingFeeAmountPerSize",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "claimableFundingAmountPerSize",
                type: "tuple",
              },
            ],
            internalType: "struct ReaderUtils.BaseFundingValues",
            name: "baseFunding",
            type: "tuple",
          },
          {
            components: [
              { internalType: "bool", name: "longsPayShorts", type: "bool" },
              { internalType: "uint256", name: "fundingFactorPerSecond", type: "uint256" },
              { internalType: "int256", name: "nextSavedFundingFactorPerSecond", type: "int256" },
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "fundingFeeAmountPerSizeDelta",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "long",
                    type: "tuple",
                  },
                  {
                    components: [
                      { internalType: "uint256", name: "longToken", type: "uint256" },
                      { internalType: "uint256", name: "shortToken", type: "uint256" },
                    ],
                    internalType: "struct MarketUtils.CollateralType",
                    name: "short",
                    type: "tuple",
                  },
                ],
                internalType: "struct MarketUtils.PositionType",
                name: "claimableFundingAmountPerSizeDelta",
                type: "tuple",
              },
            ],
            internalType: "struct MarketUtils.GetNextFundingAmountPerSizeResult",
            name: "nextFunding",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "virtualPoolAmountForLongToken", type: "uint256" },
              { internalType: "uint256", name: "virtualPoolAmountForShortToken", type: "uint256" },
              { internalType: "int256", name: "virtualInventoryForPositions", type: "int256" },
            ],
            internalType: "struct ReaderUtils.VirtualInventory",
            name: "virtualInventory",
            type: "tuple",
          },
          { internalType: "bool", name: "isDisabled", type: "bool" },
        ],
        internalType: "struct ReaderUtils.MarketInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "indexTokenPrice",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "longTokenPrice",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "shortTokenPrice",
        type: "tuple",
      },
      { internalType: "bytes32", name: "pnlFactorType", type: "bytes32" },
      { internalType: "bool", name: "maximize", type: "bool" },
    ],
    name: "getMarketTokenPrice",
    outputs: [
      { internalType: "int256", name: "", type: "int256" },
      {
        components: [
          { internalType: "int256", name: "poolValue", type: "int256" },
          { internalType: "int256", name: "longPnl", type: "int256" },
          { internalType: "int256", name: "shortPnl", type: "int256" },
          { internalType: "int256", name: "netPnl", type: "int256" },
          { internalType: "uint256", name: "longTokenAmount", type: "uint256" },
          { internalType: "uint256", name: "shortTokenAmount", type: "uint256" },
          { internalType: "uint256", name: "longTokenUsd", type: "uint256" },
          { internalType: "uint256", name: "shortTokenUsd", type: "uint256" },
          { internalType: "uint256", name: "totalBorrowingFees", type: "uint256" },
          { internalType: "uint256", name: "borrowingFeePoolFactor", type: "uint256" },
          { internalType: "uint256", name: "impactPoolAmount", type: "uint256" },
          { internalType: "uint256", name: "lentImpactPoolAmount", type: "uint256" },
        ],
        internalType: "struct MarketPoolValueInfo.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "uint256", name: "start", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" },
    ],
    name: "getMarkets",
    outputs: [
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "indexTokenPrice",
        type: "tuple",
      },
      { internalType: "bool", name: "maximize", type: "bool" },
    ],
    name: "getNetPnl",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "indexTokenPrice",
        type: "tuple",
      },
      { internalType: "bool", name: "isLong", type: "bool" },
      { internalType: "bool", name: "maximize", type: "bool" },
    ],
    name: "getOpenInterestWithPnl",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "bytes32", name: "key", type: "bytes32" },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "receiver", type: "address" },
              { internalType: "address", name: "cancellationReceiver", type: "address" },
              { internalType: "address", name: "callbackContract", type: "address" },
              { internalType: "address", name: "uiFeeReceiver", type: "address" },
              { internalType: "address", name: "market", type: "address" },
              { internalType: "address", name: "initialCollateralToken", type: "address" },
              { internalType: "address[]", name: "swapPath", type: "address[]" },
            ],
            internalType: "struct Order.Addresses",
            name: "addresses",
            type: "tuple",
          },
          {
            components: [
              { internalType: "enum Order.OrderType", name: "orderType", type: "uint8" },
              { internalType: "enum Order.DecreasePositionSwapType", name: "decreasePositionSwapType", type: "uint8" },
              { internalType: "uint256", name: "sizeDeltaUsd", type: "uint256" },
              { internalType: "uint256", name: "initialCollateralDeltaAmount", type: "uint256" },
              { internalType: "uint256", name: "triggerPrice", type: "uint256" },
              { internalType: "uint256", name: "acceptablePrice", type: "uint256" },
              { internalType: "uint256", name: "executionFee", type: "uint256" },
              { internalType: "uint256", name: "callbackGasLimit", type: "uint256" },
              { internalType: "uint256", name: "minOutputAmount", type: "uint256" },
              { internalType: "uint256", name: "updatedAtTime", type: "uint256" },
              { internalType: "uint256", name: "validFromTime", type: "uint256" },
              { internalType: "uint256", name: "srcChainId", type: "uint256" },
            ],
            internalType: "struct Order.Numbers",
            name: "numbers",
            type: "tuple",
          },
          {
            components: [
              { internalType: "bool", name: "isLong", type: "bool" },
              { internalType: "bool", name: "shouldUnwrapNativeToken", type: "bool" },
              { internalType: "bool", name: "isFrozen", type: "bool" },
              { internalType: "bool", name: "autoCancel", type: "bool" },
            ],
            internalType: "struct Order.Flags",
            name: "flags",
            type: "tuple",
          },
          { internalType: "bytes32[]", name: "_dataList", type: "bytes32[]" },
        ],
        internalType: "struct Order.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "market", type: "address" },
    ],
    name: "getPendingPositionImpactPoolDistributionAmount",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "indexTokenPrice",
        type: "tuple",
      },
      { internalType: "bool", name: "isLong", type: "bool" },
      { internalType: "bool", name: "maximize", type: "bool" },
    ],
    name: "getPnl",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "marketAddress", type: "address" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "bool", name: "isLong", type: "bool" },
      { internalType: "bool", name: "maximize", type: "bool" },
    ],
    name: "getPnlToPoolFactor",
    outputs: [{ internalType: "int256", name: "", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "bytes32", name: "key", type: "bytes32" },
    ],
    name: "getPosition",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "market", type: "address" },
              { internalType: "address", name: "collateralToken", type: "address" },
            ],
            internalType: "struct Position.Addresses",
            name: "addresses",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "sizeInUsd", type: "uint256" },
              { internalType: "uint256", name: "sizeInTokens", type: "uint256" },
              { internalType: "uint256", name: "collateralAmount", type: "uint256" },
              { internalType: "int256", name: "pendingImpactAmount", type: "int256" },
              { internalType: "uint256", name: "borrowingFactor", type: "uint256" },
              { internalType: "uint256", name: "fundingFeeAmountPerSize", type: "uint256" },
              { internalType: "uint256", name: "longTokenClaimableFundingAmountPerSize", type: "uint256" },
              { internalType: "uint256", name: "shortTokenClaimableFundingAmountPerSize", type: "uint256" },
              { internalType: "uint256", name: "increasedAtTime", type: "uint256" },
              { internalType: "uint256", name: "decreasedAtTime", type: "uint256" },
            ],
            internalType: "struct Position.Numbers",
            name: "numbers",
            type: "tuple",
          },
          {
            components: [{ internalType: "bool", name: "isLong", type: "bool" }],
            internalType: "struct Position.Flags",
            name: "flags",
            type: "tuple",
          },
        ],
        internalType: "struct Position.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "contract IReferralStorage", name: "referralStorage", type: "address" },
      { internalType: "bytes32", name: "positionKey", type: "bytes32" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "uint256", name: "sizeDeltaUsd", type: "uint256" },
      { internalType: "address", name: "uiFeeReceiver", type: "address" },
      { internalType: "bool", name: "usePositionSizeAsSizeDeltaUsd", type: "bool" },
    ],
    name: "getPositionInfo",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "positionKey", type: "bytes32" },
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "account", type: "address" },
                  { internalType: "address", name: "market", type: "address" },
                  { internalType: "address", name: "collateralToken", type: "address" },
                ],
                internalType: "struct Position.Addresses",
                name: "addresses",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "sizeInUsd", type: "uint256" },
                  { internalType: "uint256", name: "sizeInTokens", type: "uint256" },
                  { internalType: "uint256", name: "collateralAmount", type: "uint256" },
                  { internalType: "int256", name: "pendingImpactAmount", type: "int256" },
                  { internalType: "uint256", name: "borrowingFactor", type: "uint256" },
                  { internalType: "uint256", name: "fundingFeeAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "longTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "shortTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "increasedAtTime", type: "uint256" },
                  { internalType: "uint256", name: "decreasedAtTime", type: "uint256" },
                ],
                internalType: "struct Position.Numbers",
                name: "numbers",
                type: "tuple",
              },
              {
                components: [{ internalType: "bool", name: "isLong", type: "bool" }],
                internalType: "struct Position.Flags",
                name: "flags",
                type: "tuple",
              },
            ],
            internalType: "struct Position.Props",
            name: "position",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  { internalType: "bytes32", name: "referralCode", type: "bytes32" },
                  { internalType: "address", name: "affiliate", type: "address" },
                  { internalType: "address", name: "trader", type: "address" },
                  { internalType: "uint256", name: "totalRebateFactor", type: "uint256" },
                  { internalType: "uint256", name: "affiliateRewardFactor", type: "uint256" },
                  { internalType: "uint256", name: "adjustedAffiliateRewardFactor", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountFactor", type: "uint256" },
                  { internalType: "uint256", name: "totalRebateAmount", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountAmount", type: "uint256" },
                  { internalType: "uint256", name: "affiliateRewardAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionReferralFees",
                name: "referral",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "traderTier", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountFactor", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionProFees",
                name: "pro",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "fundingFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "claimableLongTokenAmount", type: "uint256" },
                  { internalType: "uint256", name: "claimableShortTokenAmount", type: "uint256" },
                  { internalType: "uint256", name: "latestFundingFeeAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "latestLongTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "latestShortTokenClaimableFundingAmountPerSize", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionFundingFees",
                name: "funding",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "borrowingFeeUsd", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeAmountForFeeReceiver", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionBorrowingFees",
                name: "borrowing",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "address", name: "uiFeeReceiver", type: "address" },
                  { internalType: "uint256", name: "uiFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "uiFeeAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionUiFees",
                name: "ui",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "liquidationFeeUsd", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeAmountForFeeReceiver", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionLiquidationFees",
                name: "liquidation",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "min", type: "uint256" },
                  { internalType: "uint256", name: "max", type: "uint256" },
                ],
                internalType: "struct Price.Props",
                name: "collateralTokenPrice",
                type: "tuple",
              },
              { internalType: "uint256", name: "positionFeeFactor", type: "uint256" },
              { internalType: "uint256", name: "protocolFeeAmount", type: "uint256" },
              { internalType: "uint256", name: "positionFeeReceiverFactor", type: "uint256" },
              { internalType: "uint256", name: "feeReceiverAmount", type: "uint256" },
              { internalType: "uint256", name: "feeAmountForPool", type: "uint256" },
              { internalType: "uint256", name: "positionFeeAmountForPool", type: "uint256" },
              { internalType: "uint256", name: "positionFeeAmount", type: "uint256" },
              { internalType: "uint256", name: "totalCostAmountExcludingFunding", type: "uint256" },
              { internalType: "uint256", name: "totalCostAmount", type: "uint256" },
              { internalType: "uint256", name: "totalDiscountAmount", type: "uint256" },
            ],
            internalType: "struct PositionPricingUtils.PositionFees",
            name: "fees",
            type: "tuple",
          },
          {
            components: [
              { internalType: "int256", name: "priceImpactUsd", type: "int256" },
              { internalType: "uint256", name: "executionPrice", type: "uint256" },
              { internalType: "bool", name: "balanceWasImproved", type: "bool" },
              { internalType: "int256", name: "proportionalPendingImpactUsd", type: "int256" },
              { internalType: "int256", name: "totalImpactUsd", type: "int256" },
              { internalType: "uint256", name: "priceImpactDiffUsd", type: "uint256" },
            ],
            internalType: "struct ReaderPricingUtils.ExecutionPriceResult",
            name: "executionPriceResult",
            type: "tuple",
          },
          { internalType: "int256", name: "basePnlUsd", type: "int256" },
          { internalType: "int256", name: "uncappedBasePnlUsd", type: "int256" },
          { internalType: "int256", name: "pnlAfterPriceImpactUsd", type: "int256" },
        ],
        internalType: "struct ReaderPositionUtils.PositionInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "contract IReferralStorage", name: "referralStorage", type: "address" },
      { internalType: "bytes32[]", name: "positionKeys", type: "bytes32[]" },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices[]",
        name: "prices",
        type: "tuple[]",
      },
      { internalType: "address", name: "uiFeeReceiver", type: "address" },
    ],
    name: "getPositionInfoList",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "positionKey", type: "bytes32" },
          {
            components: [
              {
                components: [
                  { internalType: "address", name: "account", type: "address" },
                  { internalType: "address", name: "market", type: "address" },
                  { internalType: "address", name: "collateralToken", type: "address" },
                ],
                internalType: "struct Position.Addresses",
                name: "addresses",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "sizeInUsd", type: "uint256" },
                  { internalType: "uint256", name: "sizeInTokens", type: "uint256" },
                  { internalType: "uint256", name: "collateralAmount", type: "uint256" },
                  { internalType: "int256", name: "pendingImpactAmount", type: "int256" },
                  { internalType: "uint256", name: "borrowingFactor", type: "uint256" },
                  { internalType: "uint256", name: "fundingFeeAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "longTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "shortTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "increasedAtTime", type: "uint256" },
                  { internalType: "uint256", name: "decreasedAtTime", type: "uint256" },
                ],
                internalType: "struct Position.Numbers",
                name: "numbers",
                type: "tuple",
              },
              {
                components: [{ internalType: "bool", name: "isLong", type: "bool" }],
                internalType: "struct Position.Flags",
                name: "flags",
                type: "tuple",
              },
            ],
            internalType: "struct Position.Props",
            name: "position",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  { internalType: "bytes32", name: "referralCode", type: "bytes32" },
                  { internalType: "address", name: "affiliate", type: "address" },
                  { internalType: "address", name: "trader", type: "address" },
                  { internalType: "uint256", name: "totalRebateFactor", type: "uint256" },
                  { internalType: "uint256", name: "affiliateRewardFactor", type: "uint256" },
                  { internalType: "uint256", name: "adjustedAffiliateRewardFactor", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountFactor", type: "uint256" },
                  { internalType: "uint256", name: "totalRebateAmount", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountAmount", type: "uint256" },
                  { internalType: "uint256", name: "affiliateRewardAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionReferralFees",
                name: "referral",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "traderTier", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountFactor", type: "uint256" },
                  { internalType: "uint256", name: "traderDiscountAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionProFees",
                name: "pro",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "fundingFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "claimableLongTokenAmount", type: "uint256" },
                  { internalType: "uint256", name: "claimableShortTokenAmount", type: "uint256" },
                  { internalType: "uint256", name: "latestFundingFeeAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "latestLongTokenClaimableFundingAmountPerSize", type: "uint256" },
                  { internalType: "uint256", name: "latestShortTokenClaimableFundingAmountPerSize", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionFundingFees",
                name: "funding",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "borrowingFeeUsd", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "borrowingFeeAmountForFeeReceiver", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionBorrowingFees",
                name: "borrowing",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "address", name: "uiFeeReceiver", type: "address" },
                  { internalType: "uint256", name: "uiFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "uiFeeAmount", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionUiFees",
                name: "ui",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "liquidationFeeUsd", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeAmount", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeReceiverFactor", type: "uint256" },
                  { internalType: "uint256", name: "liquidationFeeAmountForFeeReceiver", type: "uint256" },
                ],
                internalType: "struct PositionPricingUtils.PositionLiquidationFees",
                name: "liquidation",
                type: "tuple",
              },
              {
                components: [
                  { internalType: "uint256", name: "min", type: "uint256" },
                  { internalType: "uint256", name: "max", type: "uint256" },
                ],
                internalType: "struct Price.Props",
                name: "collateralTokenPrice",
                type: "tuple",
              },
              { internalType: "uint256", name: "positionFeeFactor", type: "uint256" },
              { internalType: "uint256", name: "protocolFeeAmount", type: "uint256" },
              { internalType: "uint256", name: "positionFeeReceiverFactor", type: "uint256" },
              { internalType: "uint256", name: "feeReceiverAmount", type: "uint256" },
              { internalType: "uint256", name: "feeAmountForPool", type: "uint256" },
              { internalType: "uint256", name: "positionFeeAmountForPool", type: "uint256" },
              { internalType: "uint256", name: "positionFeeAmount", type: "uint256" },
              { internalType: "uint256", name: "totalCostAmountExcludingFunding", type: "uint256" },
              { internalType: "uint256", name: "totalCostAmount", type: "uint256" },
              { internalType: "uint256", name: "totalDiscountAmount", type: "uint256" },
            ],
            internalType: "struct PositionPricingUtils.PositionFees",
            name: "fees",
            type: "tuple",
          },
          {
            components: [
              { internalType: "int256", name: "priceImpactUsd", type: "int256" },
              { internalType: "uint256", name: "executionPrice", type: "uint256" },
              { internalType: "bool", name: "balanceWasImproved", type: "bool" },
              { internalType: "int256", name: "proportionalPendingImpactUsd", type: "int256" },
              { internalType: "int256", name: "totalImpactUsd", type: "int256" },
              { internalType: "uint256", name: "priceImpactDiffUsd", type: "uint256" },
            ],
            internalType: "struct ReaderPricingUtils.ExecutionPriceResult",
            name: "executionPriceResult",
            type: "tuple",
          },
          { internalType: "int256", name: "basePnlUsd", type: "int256" },
          { internalType: "int256", name: "uncappedBasePnlUsd", type: "int256" },
          { internalType: "int256", name: "pnlAfterPriceImpactUsd", type: "int256" },
        ],
        internalType: "struct ReaderPositionUtils.PositionInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "bytes32", name: "positionKey", type: "bytes32" },
      { internalType: "uint256", name: "sizeDeltaUsd", type: "uint256" },
    ],
    name: "getPositionPnlUsd",
    outputs: [
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "bytes32", name: "key", type: "bytes32" },
    ],
    name: "getShift",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "receiver", type: "address" },
              { internalType: "address", name: "callbackContract", type: "address" },
              { internalType: "address", name: "uiFeeReceiver", type: "address" },
              { internalType: "address", name: "fromMarket", type: "address" },
              { internalType: "address", name: "toMarket", type: "address" },
            ],
            internalType: "struct Shift.Addresses",
            name: "addresses",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "marketTokenAmount", type: "uint256" },
              { internalType: "uint256", name: "minMarketTokens", type: "uint256" },
              { internalType: "uint256", name: "updatedAtTime", type: "uint256" },
              { internalType: "uint256", name: "executionFee", type: "uint256" },
              { internalType: "uint256", name: "callbackGasLimit", type: "uint256" },
              { internalType: "uint256", name: "srcChainId", type: "uint256" },
            ],
            internalType: "struct Shift.Numbers",
            name: "numbers",
            type: "tuple",
          },
          { internalType: "bytes32[]", name: "_dataList", type: "bytes32[]" },
        ],
        internalType: "struct Shift.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address", name: "uiFeeReceiver", type: "address" },
    ],
    name: "getSwapAmountOut",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "int256", name: "", type: "int256" },
      {
        components: [
          { internalType: "uint256", name: "feeReceiverAmount", type: "uint256" },
          { internalType: "uint256", name: "feeAmountForPool", type: "uint256" },
          { internalType: "uint256", name: "amountAfterFees", type: "uint256" },
          { internalType: "address", name: "uiFeeReceiver", type: "address" },
          { internalType: "uint256", name: "uiFeeReceiverFactor", type: "uint256" },
          { internalType: "uint256", name: "uiFeeAmount", type: "uint256" },
        ],
        internalType: "struct SwapPricingUtils.SwapFees",
        name: "fees",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "address", name: "marketKey", type: "address" },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "tokenInPrice",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "min", type: "uint256" },
          { internalType: "uint256", name: "max", type: "uint256" },
        ],
        internalType: "struct Price.Props",
        name: "tokenOutPrice",
        type: "tuple",
      },
    ],
    name: "getSwapPriceImpact",
    outputs: [
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "int256", name: "", type: "int256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "bytes32", name: "key", type: "bytes32" },
    ],
    name: "getWithdrawal",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "receiver", type: "address" },
              { internalType: "address", name: "callbackContract", type: "address" },
              { internalType: "address", name: "uiFeeReceiver", type: "address" },
              { internalType: "address", name: "market", type: "address" },
              { internalType: "address[]", name: "longTokenSwapPath", type: "address[]" },
              { internalType: "address[]", name: "shortTokenSwapPath", type: "address[]" },
            ],
            internalType: "struct Withdrawal.Addresses",
            name: "addresses",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "marketTokenAmount", type: "uint256" },
              { internalType: "uint256", name: "minLongTokenAmount", type: "uint256" },
              { internalType: "uint256", name: "minShortTokenAmount", type: "uint256" },
              { internalType: "uint256", name: "updatedAtTime", type: "uint256" },
              { internalType: "uint256", name: "executionFee", type: "uint256" },
              { internalType: "uint256", name: "callbackGasLimit", type: "uint256" },
              { internalType: "uint256", name: "srcChainId", type: "uint256" },
            ],
            internalType: "struct Withdrawal.Numbers",
            name: "numbers",
            type: "tuple",
          },
          {
            components: [{ internalType: "bool", name: "shouldUnwrapNativeToken", type: "bool" }],
            internalType: "struct Withdrawal.Flags",
            name: "flags",
            type: "tuple",
          },
          { internalType: "bytes32[]", name: "_dataList", type: "bytes32[]" },
        ],
        internalType: "struct Withdrawal.Props",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "uint256", name: "marketTokenAmount", type: "uint256" },
      { internalType: "address", name: "uiFeeReceiver", type: "address" },
      { internalType: "enum ISwapPricingUtils.SwapPricingType", name: "swapPricingType", type: "uint8" },
    ],
    name: "getWithdrawalAmountOut",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract DataStore", name: "dataStore", type: "address" },
      { internalType: "contract IReferralStorage", name: "referralStorage", type: "address" },
      { internalType: "bytes32", name: "positionKey", type: "bytes32" },
      {
        components: [
          { internalType: "address", name: "marketToken", type: "address" },
          { internalType: "address", name: "indexToken", type: "address" },
          { internalType: "address", name: "longToken", type: "address" },
          { internalType: "address", name: "shortToken", type: "address" },
        ],
        internalType: "struct Market.Props",
        name: "market",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "indexTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "longTokenPrice",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "min", type: "uint256" },
              { internalType: "uint256", name: "max", type: "uint256" },
            ],
            internalType: "struct Price.Props",
            name: "shortTokenPrice",
            type: "tuple",
          },
        ],
        internalType: "struct MarketUtils.MarketPrices",
        name: "prices",
        type: "tuple",
      },
      { internalType: "bool", name: "shouldValidateMinCollateralUsd", type: "bool" },
      { internalType: "bool", name: "forLiquidation", type: "bool" },
    ],
    name: "isPositionLiquidatable",
    outputs: [
      { internalType: "bool", name: "", type: "bool" },
      { internalType: "string", name: "", type: "string" },
      {
        components: [
          { internalType: "int256", name: "remainingCollateralUsd", type: "int256" },
          { internalType: "int256", name: "minCollateralUsd", type: "int256" },
          { internalType: "int256", name: "minCollateralUsdForLeverage", type: "int256" },
        ],
        internalType: "struct PositionUtils.IsPositionLiquidatableInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

type Price = {
  min: bigint;
  max: bigint;
};

export function getMarketInfoList(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    marketPricesList: ReadonlyArray<{
      indexTokenPrice: Price;
      longTokenPrice: Price;
      shortTokenPrice: Price;
    }>;
    start: bigint;
    end: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getMarketInfoList",
    address: args.reader,
    args: [args.dataStore, args.marketPricesList, args.start, args.end],
  });
}

export function getMarketInfo(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    marketPrices: {
      indexTokenPrice: Price;
      longTokenPrice: Price;
      shortTokenPrice: Price;
    };
    market: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getMarketInfo",
    address: args.reader,
    args: [args.dataStore, args.marketPrices, args.market],
  });
}

export function getMarkets(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    start: bigint;
    end: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getMarkets",
    address: args.reader,
    args: [args.dataStore, args.start, args.end],
  });
}

export function getMarket(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    market: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getMarket",
    address: args.reader,
    args: [args.dataStore, args.market],
  });
}

export function getOraclePrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    chainlinkOracle: Address;
    token: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: [
      {
        type: "function",
        name: "getOraclePrice",
        inputs: [
          {
            name: "_token",
            type: "address",
            internalType: "address",
          },
          {
            name: "_data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
        outputs: [
          {
            name: "validatedPrice_",
            type: "tuple",
            internalType: "struct IGMXV2ChainlinkPriceFeedProvider.ValidatedPrice",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "min",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "max",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "provider",
                type: "address",
                internalType: "address",
              },
            ],
          },
        ],
        stateMutability: "view",
      },
    ],
    functionName: "getOraclePrice",
    address: args.chainlinkOracle,
    args: [args.token, "0x"],
  });
}

const dataStoreAbi = [
  {
    type: "function",
    name: "getBytes32ValuesAt",
    inputs: [
      {
        name: "_setKey",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_start",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_end",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "values_",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUint",
    inputs: [
      {
        name: "_key",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "value_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
] as const;

export async function getAccountPositionInfoList(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    account: Address;
    chainlinkOracle: Address;
    referralStorage: Address;
    uiFeeReceiver: Address;
    start: bigint;
    end: bigint;
  }>,
) {
  const [positionsKeys, positions] = await Promise.all([
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: dataStoreAbi,
      functionName: "getBytes32ValuesAt",
      address: args.dataStore,
      args: [
        keccak256(
          encodeAbiParameters(
            [{ type: "bytes32" }, { type: "address" }],
            [encodeKey("ACCOUNT_POSITION_LIST"), args.account],
          ),
        ),
        args.start,
        args.end,
      ],
    }),
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: readerAbi,
      functionName: "getAccountPositions",
      address: args.reader,
      args: [args.dataStore, args.account, args.start, args.end],
    }),
  ]);

  const marketInfos = await Promise.all(
    positions.map((position) =>
      getMarket(client, {
        market: position.addresses.market,
        reader: args.reader,
        dataStore: args.dataStore,
      }),
    ),
  );

  const marketPrices = await Promise.all(
    marketInfos.map(async (marketInfo) => {
      const [indexTokenPrice, longTokenPrice, shortTokenPrice] = await Promise.all([
        getOraclePrice(client, { chainlinkOracle: args.chainlinkOracle, token: marketInfo.indexToken }),
        getOraclePrice(client, { chainlinkOracle: args.chainlinkOracle, token: marketInfo.longToken }),
        getOraclePrice(client, { chainlinkOracle: args.chainlinkOracle, token: marketInfo.shortToken }),
      ]);

      return {
        marketInfo,
        indexTokenPrice,
        longTokenPrice,
        shortTokenPrice,
      };
    }),
  );

  const markets = marketPrices.map(({ marketInfo }) => marketInfo.marketToken);

  const accountPositionInfoList = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getAccountPositionInfoList",
    address: args.reader,
    args: [
      args.dataStore,
      args.referralStorage,
      args.account,
      markets,
      marketPrices,
      args.uiFeeReceiver,
      args.start,
      args.end,
    ],
  });

  return {
    marketPrices,
    accountPositionInfoList: accountPositionInfoList.map((accountPositionInfo, i) => ({
      ...accountPositionInfo,
      positionKey: positionsKeys[i],
    })),
  };
}

export async function getAccountOrders(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    account: Address;
    start: bigint;
    end: bigint;
  }>,
) {
  const [orderKeys, accountOrders] = await Promise.all([
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: dataStoreAbi,
      functionName: "getBytes32ValuesAt",
      address: args.dataStore,
      args: [
        keccak256(
          encodeAbiParameters(
            [{ type: "bytes32" }, { type: "address" }],
            [encodeKey("ACCOUNT_ORDER_LIST"), args.account],
          ),
        ),
        args.start,
        args.end,
      ],
    }),
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: readerAbi,
      functionName: "getAccountOrders",
      address: args.reader,
      args: [args.dataStore, args.account, args.start, args.end],
    }),
  ]);

  return accountOrders.map((order, i) => ({
    ...order,
    orderKey: orderKeys[i],
  }));
}

export async function getExternalPositionClaimableCollateral(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    chainlinkOracle: Address;
    externalPosition: Address;
  }>,
) {
  const claimableCollateralKeys = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IGMXV2LeverageTradingPositionLib,
    functionName: "getClaimableCollateralKeys",
    address: args.externalPosition,
  });

  const claimableCollateralInfos = await Promise.all(
    claimableCollateralKeys.map((claimableCollateralKey) =>
      readContract(client, {
        ...Viem.extractBlockParameters(args),
        abi: IGMXV2LeverageTradingPositionLib,
        functionName: "getClaimableCollateralKeyToClaimableCollateralInfo",
        address: args.externalPosition,
        args: [claimableCollateralKey],
      }),
    ),
  );

  return Promise.all(
    claimableCollateralInfos.map(async ({ market, token, timeKey }) => {
      const [claimableCollateral, claimedCollateral, claimableFactorForTime, claimableFactorForAccount] =
        await Promise.all([
          readContract(client, {
            ...Viem.extractBlockParameters(args),
            abi: dataStoreAbi,
            functionName: "getUint",
            address: args.dataStore,
            args: [
              keccak256(
                encodeAbiParameters(
                  [
                    { type: "bytes32" },
                    { type: "address" },
                    { type: "address" },
                    { type: "uint256" },
                    { type: "address" },
                  ],
                  [
                    encodeKey("CLAIMABLE_COLLATERAL_AMOUNT_DATA_STORE_KEY"),
                    market,
                    token,
                    timeKey,
                    args.externalPosition,
                  ],
                ),
              ),
            ],
          }),
          readContract(client, {
            ...Viem.extractBlockParameters(args),
            abi: dataStoreAbi,
            functionName: "getUint",
            address: args.dataStore,
            args: [
              keccak256(
                encodeAbiParameters(
                  [
                    { type: "bytes32" },
                    { type: "address" },
                    { type: "address" },
                    { type: "uint256" },
                    { type: "address" },
                  ],
                  [
                    encodeKey("CLAIMED_COLLATERAL_AMOUNT_DATA_STORE_KEY"),
                    market,
                    token,
                    timeKey,
                    args.externalPosition,
                  ],
                ),
              ),
            ],
          }),
          readContract(client, {
            ...Viem.extractBlockParameters(args),
            abi: dataStoreAbi,
            functionName: "getUint",
            address: args.dataStore,
            args: [
              keccak256(
                encodeAbiParameters(
                  [{ type: "bytes32" }, { type: "address" }, { type: "address" }, { type: "uint256" }],
                  [encodeKey("CLAIMABLE_COLLATERAL_FACTOR"), market, token, timeKey],
                ),
              ),
            ],
          }),
          readContract(client, {
            ...Viem.extractBlockParameters(args),
            abi: dataStoreAbi,
            functionName: "getUint",
            address: args.dataStore,
            args: [
              keccak256(
                encodeAbiParameters(
                  [
                    { type: "bytes32" },
                    { type: "address" },
                    { type: "address" },
                    { type: "uint256" },
                    { type: "address" },
                  ],
                  [encodeKey("CLAIMABLE_COLLATERAL_FACTOR"), market, token, timeKey, args.externalPosition],
                ),
              ),
            ],
          }),
        ]);

      const claimableFactor =
        claimableFactorForTime > claimableFactorForAccount ? claimableFactorForTime : claimableFactorForAccount;

      const adjustedClaimableAmount = (claimableCollateral * claimableFactor) / 10n ** 30n; // 30 is the float precision in the GMX

      const amountToBeClaimed = adjustedClaimableAmount - claimedCollateral;

      return {
        market,
        token,
        timeKey,
        amountToBeClaimed,
      };
    }),
  );
}

export async function getExternalPositionFundingFees(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    externalPosition: Address;
  }>,
) {
  const trackedMarkets = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IGMXV2LeverageTradingPositionLib,
    functionName: "getTrackedMarkets",
    address: args.externalPosition,
  });

  const marketInfos = await Promise.all(
    trackedMarkets.map((market) =>
      getMarket(client, {
        market,
        reader: args.reader,
        dataStore: args.dataStore,
      }),
    ),
  );

  const fundingFees = await Promise.all(
    marketInfos.map(async (marketInfo) => {
      const [longTokenFundingFees, shortTokenFundingFees] = await Promise.all([
        readContract(client, {
          ...Viem.extractBlockParameters(args),
          abi: dataStoreAbi,
          functionName: "getUint",
          address: args.dataStore,
          args: [
            keccak256(
              encodeAbiParameters(
                [{ type: "bytes32" }, { type: "address" }, { type: "address" }, { type: "address" }],
                [
                  encodeKey("CLAIMABLE_FUNDING_AMOUNT"),
                  marketInfo.marketToken,
                  marketInfo.longToken,
                  args.externalPosition,
                ],
              ),
            ),
          ],
        }),
        isAddressEqual(marketInfo.longToken, marketInfo.shortToken)
          ? undefined
          : readContract(client, {
              ...Viem.extractBlockParameters(args),
              abi: dataStoreAbi,
              functionName: "getUint",
              address: args.dataStore,
              args: [
                keccak256(
                  encodeAbiParameters(
                    [{ type: "bytes32" }, { type: "address" }, { type: "address" }, { type: "address" }],
                    [
                      encodeKey("CLAIMABLE_FUNDING_AMOUNT"),
                      marketInfo.marketToken,
                      marketInfo.shortToken,
                      args.externalPosition,
                    ],
                  ),
                ),
              ],
            }),
      ]);

      return [
        ...(longTokenFundingFees > 0
          ? [{ market: marketInfo.marketToken, token: marketInfo.longToken, amountToBeClaimed: longTokenFundingFees }]
          : []),
        ...(shortTokenFundingFees !== undefined && shortTokenFundingFees > 0
          ? [
              {
                market: marketInfo.marketToken,
                token: marketInfo.shortToken,
                amountToBeClaimed: shortTokenFundingFees,
              },
            ]
          : []),
      ];
    }),
  );

  return fundingFees.flat();
}

export function getMinCollateralUsd(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [encodeKey("MIN_COLLATERAL_USD")],
  });
}

export function getMinCollateralFactor(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
    market: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [
      keccak256(
        encodeAbiParameters(
          [{ type: "bytes32" }, { type: "address" }],
          [encodeKey("MIN_COLLATERAL_FACTOR"), args.market],
        ),
      ),
    ],
  });
}

export function getMaxPositionImpactFactorForLiquidations(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
    market: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [
      keccak256(
        encodeAbiParameters(
          [{ type: "bytes32" }, { type: "address" }],
          [encodeKey("MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS"), args.market],
        ),
      ),
    ],
  });
}

export function getIncreaseOrderGasLimit(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [encodeKey("INCREASE_ORDER_GAS_LIMIT")],
  });
}

export function getDecreaseOrderGasLimit(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [encodeKey("DECREASE_ORDER_GAS_LIMIT")],
  });
}

export function getExecutionPrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    dataStore: Address;
    market: Address;
    prices: {
      indexTokenPrice: Price;
      longTokenPrice: Price;
      shortTokenPrice: Price;
    };
    positionSizeInUsd: bigint;
    positionSizeInTokens: bigint;
    sizeDeltaUsd: bigint;
    pendingImpactAmount: bigint;
    isLong: boolean;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getExecutionPrice",
    address: args.reader,
    args: [
      args.dataStore,
      args.market,
      args.prices,
      args.positionSizeInUsd,
      args.positionSizeInTokens,
      args.sizeDeltaUsd,
      args.pendingImpactAmount,
      args.isLong,
    ],
  });
}

export async function getPositionInfo(
  client: Client,
  args: Viem.ContractCallParameters<{
    reader: Address;
    positionKey: Hex;
    dataStore: Address;
    chainlinkOracle: Address;
    referralStorage: Address;
    uiFeeReceiver: Address;
    market: Address;
  }>,
) {
  const marketInfo = await getMarket(client, args);

  const [indexTokenPrice, longTokenPrice, shortTokenPrice] = await Promise.all([
    getOraclePrice(client, { chainlinkOracle: args.chainlinkOracle, token: marketInfo.indexToken }),
    getOraclePrice(client, { chainlinkOracle: args.chainlinkOracle, token: marketInfo.longToken }),
    getOraclePrice(client, { chainlinkOracle: args.chainlinkOracle, token: marketInfo.shortToken }),
  ]);

  const marketPrices = {
    indexTokenPrice,
    longTokenPrice,
    shortTokenPrice,
  };

  const positionInfo = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: readerAbi,
    functionName: "getPositionInfo",
    address: args.reader,
    args: [args.dataStore, args.referralStorage, args.positionKey, marketPrices, 0n, args.uiFeeReceiver, true],
  });

  return {
    marketPrices,
    positionInfo,
  };
}

export function getExecutionGasFeeBaseAmountV2One(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [encodeKey("EXECUTION_GAS_FEE_BASE_AMOUNT_V2_1")],
  });
}

export function getExecutionGasFeePerOraclePrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [encodeKey("EXECUTION_GAS_FEE_PER_ORACLE_PRICE")],
  });
}

export function getExecutionGasFeeMultiplierFactor(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [encodeKey("EXECUTION_GAS_FEE_MULTIPLIER_FACTOR")],
  });
}

export function getPositionFeeFactor(
  client: Client,
  args: Viem.ContractCallParameters<{
    dataStore: Address;
    market: Address;
    forPositiveImpact: boolean;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: dataStoreAbi,
    functionName: "getUint",
    address: args.dataStore,
    args: [
      keccak256(
        encodeAbiParameters(
          [{ type: "bytes32" }, { type: "address" }, { type: "bool" }],
          [encodeKey("POSITION_FEE_FACTOR"), args.market, args.forPositiveImpact],
        ),
      ),
    ],
  });
}

export const usdDecimals = 30;

export function formatUsd(value: bigint, decimalsToAdjust = 0) {
  return Number(formatUnits(value, usdDecimals - decimalsToAdjust));
}

export function parseUsd(value: number, decimalsToAdjust = 0) {
  return parseUnits(value.toString(), usdDecimals - decimalsToAdjust);
}

export function encodeKey(key: string) {
  return keccak256(encodeAbiParameters([{ type: "string" }], [key]));
}

export function getLiquidationPrice({
  sizeInUsd,
  sizeInTokens,
  collateralUsd,
  collateralAmount,
  indexToken,
  indexTokenDecimals,
  maxPositionImpactFactorForLiquidations,
  minCollateralFactor,
  collateralToken,
  minCollateralUsd,
  isLong,
  priceImpactUsd,
  totalFeesUsd,
  protocolFeeUsd,
}: {
  sizeInUsd: bigint;
  sizeInTokens: bigint;
  collateralAmount: bigint;
  collateralUsd: bigint;
  collateralToken: Address;
  indexToken: Address;
  indexTokenDecimals: number;
  maxPositionImpactFactorForLiquidations: bigint;
  minCollateralFactor: bigint;
  minCollateralUsd: bigint;
  protocolFeeUsd: bigint;
  priceImpactUsd: bigint;
  isLong: boolean;
  totalFeesUsd: bigint;
}) {
  if (sizeInUsd <= 0 || sizeInTokens <= 0) {
    return undefined;
  }

  const totalPendingFeesUsd = totalFeesUsd - protocolFeeUsd;

  const maxNegativePriceImpactUsd = -1n * applyFactor(sizeInUsd, maxPositionImpactFactorForLiquidations);

  let priceImpactDeltaUsd = priceImpactUsd;

  if (priceImpactDeltaUsd < maxNegativePriceImpactUsd) {
    priceImpactDeltaUsd = maxNegativePriceImpactUsd;
  }

  // Ignore positive price impact
  if (priceImpactDeltaUsd > 0) {
    priceImpactDeltaUsd = 0n;
  }

  let liquidationCollateralUsd = applyFactor(sizeInUsd, minCollateralFactor);
  if (liquidationCollateralUsd < minCollateralUsd) {
    liquidationCollateralUsd = minCollateralUsd;
  }

  let liquidationPrice: bigint;

  if (isAddressEqual(collateralToken, indexToken)) {
    if (isLong) {
      const denominator = sizeInTokens + collateralAmount;

      if (denominator === 0n) {
        return undefined;
      }

      liquidationPrice =
        ((sizeInUsd + liquidationCollateralUsd - priceImpactDeltaUsd + totalFeesUsd) / denominator) *
        parseUnits("1", indexTokenDecimals);
    } else {
      const denominator = sizeInTokens - collateralAmount;

      if (denominator === 0n) {
        return undefined;
      }

      liquidationPrice =
        ((sizeInUsd - liquidationCollateralUsd + priceImpactDeltaUsd - totalFeesUsd) / denominator) *
        parseUnits("1", indexTokenDecimals);
    }
  } else {
    if (sizeInTokens === 0n) {
      return undefined;
    }

    const remainingCollateralUsd = collateralUsd + priceImpactDeltaUsd - totalPendingFeesUsd - protocolFeeUsd;

    if (isLong) {
      liquidationPrice =
        ((liquidationCollateralUsd - remainingCollateralUsd + sizeInUsd) / sizeInTokens) *
        parseUnits("1", indexTokenDecimals);
    } else {
      liquidationPrice =
        ((liquidationCollateralUsd - remainingCollateralUsd - sizeInUsd) / -sizeInTokens) *
        parseUnits("1", indexTokenDecimals);
    }
  }

  if (liquidationPrice <= 0) {
    return undefined;
  }

  return formatUsd(liquidationPrice);
}

export function applyFactor(value: bigint, factor: bigint) {
  const precision = 30; // precision used in the GMX protocol
  return (value * factor) / parseUnits("1", precision);
}

export type ExecutionOrderType = "increase" | "decrease";

export async function getExecutionFee({
  client,
  orderType,
  dataStore,
}: { client: PublicClient; orderType: ExecutionOrderType; dataStore: Address }) {
  const callbackGasLimit = 750_000n; // value set in the Enzyme integration contract

  const [gasLimit, gasPrice, baseGasLimit, executionGasFeePerOraclePrice, executionGasFeeMultiplierFactor] =
    await Promise.all([
      getGasLimit({ client, orderType, dataStore }),
      getGasPrice(client),
      getExecutionGasFeeBaseAmountV2One(client, { dataStore }),
      getExecutionGasFeePerOraclePrice(client, { dataStore }),
      getExecutionGasFeeMultiplierFactor(client, { dataStore }),
    ]);

  const estimatedGasLimit = gasLimit + (orderType === "increase" ? 0n : callbackGasLimit);

  const adjustedGasLimit = adjustGasLimitForEstimate({
    estimatedGasLimit,
    baseGasLimit,
    executionGasFeePerOraclePrice,
    executionGasFeeMultiplierFactor,
  });

  const value = adjustedGasLimit * gasPrice;

  return value + multiplyBySlippage({ value, slippage: 0.3 }); // add 30% slippage to gas fee if gas price in block changes while order is being created
}

export function adjustGasLimitForEstimate({
  estimatedGasLimit,
  baseGasLimit,
  executionGasFeePerOraclePrice,
  executionGasFeeMultiplierFactor,
}: {
  estimatedGasLimit: bigint;
  baseGasLimit: bigint;
  executionGasFeePerOraclePrice: bigint;
  executionGasFeeMultiplierFactor: bigint;
}) {
  const oraclePriceCount = 3n; // value set in gmx protocol

  const baseGasLimitWithOraclePrice = baseGasLimit + executionGasFeePerOraclePrice * oraclePriceCount;

  return baseGasLimitWithOraclePrice + applyFactor(estimatedGasLimit, executionGasFeeMultiplierFactor);
}

export function getGasLimit({
  client,
  orderType,
  dataStore,
}: { client: PublicClient; orderType: ExecutionOrderType; dataStore: Address }) {
  return orderType === "increase"
    ? getIncreaseOrderGasLimit(client, { dataStore })
    : getDecreaseOrderGasLimit(client, { dataStore });
}

export function getAcceptablePrice({
  executionPrice,
  slippage,
  isLong,
  isIncrease,
}: { executionPrice: bigint; slippage: number; isLong: boolean; isIncrease: boolean }) {
  const slippageUsd = executionPrice - multiplyBySlippage({ value: executionPrice, slippage });

  if (isLong) {
    return isIncrease ? executionPrice + slippageUsd : executionPrice - slippageUsd;
  }

  return isIncrease ? executionPrice - slippageUsd : executionPrice + slippageUsd;
}

export function getPositionNetValue({
  collateralUsd,
  totalFeesUsd,
  pnl,
}: {
  collateralUsd: bigint;
  totalFeesUsd: bigint;
  pnl: bigint;
}) {
  return formatUsd(collateralUsd - totalFeesUsd + pnl);
}

export function getEntryPrice({
  sizeInUsd,
  sizeInTokens,
  indexTokenDecimals,
}: { sizeInUsd: bigint; sizeInTokens: bigint; indexTokenDecimals: number }) {
  if (sizeInTokens === 0n) {
    return undefined;
  }

  return formatUsd((sizeInUsd * parseUnits("1", indexTokenDecimals)) / sizeInTokens);
}

export function getLeverage({
  pnl,
  sizeInUsd,
  collateralUsd,
  pendingBorrowingFeesUsd,
  pendingFundingFeesUsd,
}: {
  sizeInUsd: bigint;
  collateralUsd: bigint;
  pnl: bigint;
  pendingFundingFeesUsd: bigint;
  pendingBorrowingFeesUsd: bigint;
}) {
  const totalPendingFeesUsd = getPositionPendingFeesUsd({ pendingFundingFeesUsd, pendingBorrowingFeesUsd });

  const remainingCollateralUsd = collateralUsd + (pnl ?? 0n) - totalPendingFeesUsd;

  if (remainingCollateralUsd <= 0) {
    return undefined;
  }
  const basisPointsDivisor = 10000;

  return Number(
    (Number((sizeInUsd * BigInt(basisPointsDivisor)) / remainingCollateralUsd) / basisPointsDivisor).toFixed(2),
  );
}

export function getPositionPendingFeesUsd(p: { pendingFundingFeesUsd: bigint; pendingBorrowingFeesUsd: bigint }) {
  const { pendingFundingFeesUsd, pendingBorrowingFeesUsd } = p;

  return pendingBorrowingFeesUsd + pendingFundingFeesUsd;
}

// Those are index tokens that GMX uses internally to mark certain tokens. There might be no contract under those addresses.
// GMX for some pools uses common tokens, and info about those can be get via our environment package with environment.getAsset(tokenAddress) method.
export const arbitrumGMXIndexTokens = [
  {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    address: zeroAddress,
  },
  {
    name: "Magic Internet Money",
    symbol: "MIM",
    decimals: 18,
    address: "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    address: "0x47904963fc8b2340414262125aF798B9655E58Cd",
    decimals: 8,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    address: "0xC4da4c24fd591125c3F47b340b6f4f76111883d8",
    decimals: 8,
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    decimals: 8,
    address: "0xB46A094Bc4B0adBD801E14b9DB95e05E28962764",
  },
  {
    name: "XRP",
    symbol: "XRP",
    address: "0xc14e065b0067dE91534e032868f5Ac6ecf2c6868",
    decimals: 6,
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    address: "0x7D7F1765aCbaF847b9A1f7137FE8Ed4931FbfEbA",
    decimals: 6,
  },
  {
    name: "Near",
    symbol: "NEAR",
    address: "0x1FF7F3EFBb9481Cbd7db4F932cBCD4467144237C",
    decimals: 24,
  },
  {
    name: "ORDI",
    symbol: "ORDI",
    address: "0x1E15d08f3CA46853B692EE28AE9C7a0b88a9c994",
    decimals: 18,
  },
  {
    name: "Stacks",
    symbol: "STX",
    address: "0xBaf07cF91D413C0aCB2b7444B9Bf13b4e03c9D71",
    decimals: 6,
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    address: "0x3E57D02f9d196873e55727382974b02EdebE6bfd",
    decimals: 18,
  },
] as const;

export const uiFeeReceiver = "0xbF70734E9E1da98149E4550025B1055Facd60583"; // UI fee receiver address set in the Enzyme integration contract. The fee is currently set to 0
