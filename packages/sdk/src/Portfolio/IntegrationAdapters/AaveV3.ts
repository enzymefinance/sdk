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
    name: "aToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  aToken: Address;
  depositAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.aToken, args.depositAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [aToken, depositAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    aToken,
    depositAmount,
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
    name: "aToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  aToken: Address;
  redeemAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.aToken, args.redeemAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [aToken, redeemAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { aToken, redeemAmount };
}
