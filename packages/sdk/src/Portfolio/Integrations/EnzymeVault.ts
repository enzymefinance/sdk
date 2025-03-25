import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// ADAPTER - ACTIONS
//--------------------------------------------------------------------------------------------

export type AdapterAction = (typeof AdapterAction)[keyof typeof AdapterAction];
export const AdapterAction = {
  BuyShares: 0n,
  RedeemShares: 1n,
} as const;

export const encodeAdapterAction = IntegrationManager.createEncodeAdapterAction<AdapterAction>();

export const decodeAdapterAction = IntegrationManager.createDecodeAdapterAction<AdapterAction, typeof AdapterAction>(
  AdapterAction,
);

//--------------------------------------------------------------------------------------------
// ADAPTER - BUY SHARES
//--------------------------------------------------------------------------------------------

export type BuySharesArgs = {
  actionId: typeof AdapterAction.BuyShares;
  vaultProxy: Address;
  denominationAsset: Address;
  investmentAmount: bigint;
  minSharesQuantity: bigint;
};

export const buyShares = IntegrationManager.makeUse(IntegrationManager.Selector.Action, buySharesEncode);

const buySharesEncoding = [
  {
    name: "vaultProxy",
    type: "address",
  },
  {
    name: "denominationAsset",
    type: "address",
  },
  {
    name: "investmentAmount",
    type: "uint256",
  },
  {
    name: "minSharesQuantity",
    type: "uint256",
  },
] as const;

export function buySharesEncode(args: BuySharesArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(buySharesEncoding, [
    args.vaultProxy,
    args.denominationAsset,
    args.investmentAmount,
    args.minSharesQuantity,
  ]);

  return encodeAdapterAction({ actionId: args.actionId, encodedActionArgs });
}

export function buySharesDecode(encoded: Hex): BuySharesArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const [vaultProxy, denominationAsset, investmentAmount, minSharesQuantity] = decodeAbiParameters(
    buySharesEncoding,
    encodedActionArgs,
  );

  Assertion.invariant(actionId === AdapterAction.BuyShares, "Invalid actionId");

  return {
    actionId,
    vaultProxy,
    denominationAsset,
    investmentAmount,
    minSharesQuantity,
  };
}

//--------------------------------------------------------------------------------------------
// ADAPTER - REDEEM SHARES
//--------------------------------------------------------------------------------------------

export type RedeemSharesArgs = {
  actionId: typeof AdapterAction.RedeemShares;
  vaultProxy: Address;
  sharesQuantity: bigint;
  payoutAsset: Address;
  minPayoutAssetAmount: bigint;
};

export const redeemShares = IntegrationManager.makeUse(IntegrationManager.Selector.Action, redeemSharesEncode);

const redeemSharesEncoding = [
  {
    name: "vaultProxy",
    type: "address",
  },
  {
    name: "sharesQuantity",
    type: "uint256",
  },
  {
    name: "payoutAsset",
    type: "address",
  },
  {
    name: "minPayoutAssetAmount",
    type: "uint256",
  },
] as const;

export function redeemSharesEncode(args: RedeemSharesArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(redeemSharesEncoding, [
    args.vaultProxy,
    args.sharesQuantity,
    args.payoutAsset,
    args.minPayoutAssetAmount,
  ]);

  return encodeAdapterAction({ actionId: args.actionId, encodedActionArgs });
}

export function redeemSharesDecode(encoded: Hex): RedeemSharesArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const [vaultProxy, sharesQuantity, payoutAsset, minPayoutAssetAmount] = decodeAbiParameters(
    redeemSharesEncoding,
    encodedActionArgs,
  );

  Assertion.invariant(actionId === AdapterAction.RedeemShares, "Invalid actionId");

  return {
    actionId,
    vaultProxy,
    sharesQuantity,
    payoutAsset,
    minPayoutAssetAmount,
  };
}
