import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    name: "outgoingAssets",
    type: "address[2]",
  },
  {
    name: "maxOutgoingAssetAmounts",
    type: "uint256[2]",
  },
  {
    name: "minOutgoingAssetAmounts",
    type: "uint256[2]",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  outgoingAssets: readonly [Address, Address];
  maxOutgoingAssetAmounts: readonly [bigint, bigint];
  minOutgoingAssetAmounts: readonly [bigint, bigint];
  minIncomingAssetAmount: bigint;
};

export function lendEncode({
  outgoingAssets,
  maxOutgoingAssetAmounts,
  minOutgoingAssetAmounts,
  minIncomingAssetAmount,
}: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [
    outgoingAssets,
    maxOutgoingAssetAmounts,
    minOutgoingAssetAmounts,
    minIncomingAssetAmount,
  ]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [outgoingAssets, maxOutgoingAssetAmounts, minOutgoingAssetAmounts, minIncomingAssetAmount] =
    decodeAbiParameters(lendEncoding, encoded);

  return {
    outgoingAssets,
    maxOutgoingAssetAmounts,
    minOutgoingAssetAmounts,
    minIncomingAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

const redeemEncoding = [
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "incomingAssets",
    type: "address[2]",
  },
  {
    name: "minIncomingAssetAmounts",
    type: "uint256[2]",
  },
] as const;

export type RedeemArgs = {
  outgoingAssetAmount: bigint;
  incomingAssets: readonly [Address, Address];
  minIncomingAssetAmounts: readonly [bigint, bigint];
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.outgoingAssetAmount,
    args.incomingAssets,
    args.minIncomingAssetAmounts,
  ]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [outgoingAssetAmount, incomingAssets, minIncomingAssetAmounts] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    outgoingAssetAmount,
    incomingAssets,
    minIncomingAssetAmounts,
  };
}
