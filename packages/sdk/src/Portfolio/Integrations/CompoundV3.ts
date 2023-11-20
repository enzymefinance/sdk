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
    name: "cToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  cToken: Address;
  depositAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.cToken, args.depositAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [cToken, depositAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    cToken,
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
    name: "cToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  cToken: Address;
  redeemAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.cToken, args.redeemAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [cToken, redeemAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { cToken, redeemAmount };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

const claimRewardsSelector = "0xb9dfbacc"; // claimRewards(address,bytes,bytes)
export const claimRewards = IntegrationManager.makeUse(claimRewardsSelector, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    type: "address[]",
    name: "cTokens",
  },
] as const;

export type ClaimRewardsArgs = {
  cTokens: ReadonlyArray<Address>;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.cTokens]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [cTokens] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { cTokens };
}
