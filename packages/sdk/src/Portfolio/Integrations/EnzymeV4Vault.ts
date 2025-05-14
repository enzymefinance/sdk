import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// ADAPTER - ACTIONS
//--------------------------------------------------------------------------------------------

export type AdapterAction = (typeof AdapterAction)[keyof typeof AdapterAction];
export const AdapterAction = {
  BuyShares: 0n,
  RedeemSharesForSpecificAssets: 1n,
} as const;

export const encodeAdapterAction = IntegrationManager.createEncodeAdapterAction<AdapterAction>();

export const decodeAdapterAction = IntegrationManager.createDecodeAdapterAction<AdapterAction, typeof AdapterAction>(
  AdapterAction,
);

//--------------------------------------------------------------------------------------------
// ADAPTER - BUY SHARES
//--------------------------------------------------------------------------------------------

export type BuySharesArgs = {
  vaultProxy: Address;
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
    args.investmentAmount,
    args.minSharesQuantity,
  ]);

  return encodeAdapterAction({ actionId: AdapterAction.BuyShares, encodedActionArgs });
}

export function buySharesDecode(encoded: Hex): BuySharesArgs {
  const { encodedActionArgs } = decodeAdapterAction(encoded);

  const [vaultProxy, investmentAmount, minSharesQuantity] = decodeAbiParameters(buySharesEncoding, encodedActionArgs);

  return {
    vaultProxy,
    investmentAmount,
    minSharesQuantity,
  };
}

//--------------------------------------------------------------------------------------------
// ADAPTER - REDEEM SHARES FOR SPECIFIC ASSETS
//--------------------------------------------------------------------------------------------

export type RedeemSharesForSpecificAssetsArgs = {
  vaultProxy: Address;
  sharesQuantity: bigint;
  payoutAssets: ReadonlyArray<Address>;
  payoutAssetPercentages: ReadonlyArray<bigint>;
  minPayoutAssetAmounts: ReadonlyArray<bigint>;
};

export const redeemSharesForSpecificAssets = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  redeemSharesForSpecificAssetsEncode,
);

const redeemSharesForSpecificAssetsEncoding = [
  {
    name: "vaultProxy",
    type: "address",
  },
  {
    name: "sharesQuantity",
    type: "uint256",
  },
  {
    name: "payoutAssets",
    type: "address[]",
  },
  {
    name: "payoutAssetPercentages",
    type: "uint256[]",
  },
  {
    name: "minPayoutAssetAmounts",
    type: "uint256[]",
  },
] as const;

export function redeemSharesForSpecificAssetsEncode(args: RedeemSharesForSpecificAssetsArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(redeemSharesForSpecificAssetsEncoding, [
    args.vaultProxy,
    args.sharesQuantity,
    args.payoutAssets,
    args.payoutAssetPercentages,
    args.minPayoutAssetAmounts,
  ]);

  return encodeAdapterAction({ actionId: AdapterAction.RedeemSharesForSpecificAssets, encodedActionArgs });
}

export function redeemSharesForSpecificAssetsDecode(encoded: Hex): RedeemSharesForSpecificAssetsArgs {
  const { encodedActionArgs } = decodeAdapterAction(encoded);

  const [vaultProxy, sharesQuantity, payoutAssets, payoutAssetPercentages, minPayoutAssetAmounts] = decodeAbiParameters(
    redeemSharesForSpecificAssetsEncoding,
    encodedActionArgs,
  );

  return {
    vaultProxy,
    sharesQuantity,
    payoutAssets,
    payoutAssetPercentages,
    minPayoutAssetAmounts,
  };
}
