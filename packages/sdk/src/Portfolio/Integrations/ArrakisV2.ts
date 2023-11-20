import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "arrakisVault",
  },
  {
    name: "maxUnderlyingAmounts",
    type: "uint256[2]",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  arrakisVault: Address;
  maxUnderlyingAmounts: Readonly<[bigint, bigint]>;
  sharesAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.arrakisVault, args.maxUnderlyingAmounts, args.sharesAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [arrakisVault, maxUnderlyingAmounts, sharesAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    arrakisVault,
    maxUnderlyingAmounts,
    sharesAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "arrakisVault",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmounts",
    type: "uint256[2]",
  },
] as const;

export type RedeemArgs = {
  arrakisVault: Address;
  sharesAmount: bigint;
  minIncomingUnderlyingAmounts: Readonly<[bigint, bigint]>;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.arrakisVault, args.sharesAmount, args.minIncomingUnderlyingAmounts]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [arrakisVault, sharesAmount, minIncomingUnderlyingAmounts] = decodeAbiParameters(redeemEncoding, encoded);

  return {
    arrakisVault,
    sharesAmount,
    minIncomingUnderlyingAmounts,
  };
}
