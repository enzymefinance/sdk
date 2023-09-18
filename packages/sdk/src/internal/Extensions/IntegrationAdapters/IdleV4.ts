import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    name: "idleToken",
    type: "address",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minIncomingIdleTokenAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  idleToken: Address;
  depositAmount: bigint;
  minIncomingIdleTokenAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.idleToken, args.depositAmount, args.minIncomingIdleTokenAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [idleToken, depositAmount, minIncomingIdleTokenAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    idleToken,
    depositAmount,
    minIncomingIdleTokenAmount,
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
    name: "idleToken",
  },
  {
    name: "outgoingIdleTokenAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  idleToken: Address;
  outgoingIdleTokenAmount: bigint;
  minIncomingUnderlyingAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.idleToken,
    args.outgoingIdleTokenAmount,
    args.minIncomingUnderlyingAmount,
  ]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount] = decodeAbiParameters(
    redeemEncoding,
    encoded,
  );

  return { idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

const claimRewardsSelector = "0xb9dfbacc"; // claimRewards(address,bytes,bytes)
export const claimRewards = IntegrationManager.makeUse(claimRewardsSelector, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    type: "address",
    name: "idleToken",
  },
] as const;

export type ClaimRewardsArgs = {
  idleToken: Address;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.idleToken]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [idleToken] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { idleToken };
}
