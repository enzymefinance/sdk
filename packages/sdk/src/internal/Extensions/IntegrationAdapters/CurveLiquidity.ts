import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion } from "../../../Utils.js";
import * as IntegrationManager from "../../IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "orderedOutgoingAssetAmounts",
    type: "uint256[]",
  },
  {
    name: "minIncomingLpTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
] as const;

export type LendArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: ReadonlyArray<bigint>;
  minIncomingLpTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [
    args.pool,
    args.orderedOutgoingAssetAmounts,
    args.minIncomingLpTokenAmount,
    args.useUnderlyings,
  ]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [pool, orderedOutgoingAssetAmounts, minIncomingLpTokenAmount, useUnderlyings] = decodeAbiParameters(
    lendEncoding,
    encoded,
  );

  return {
    pool,
    orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
    minIncomingLpTokenAmount,
    useUnderlyings,
  };
}

//--------------------------------------------------------------------------------------------
// LEND AND STAKE
//--------------------------------------------------------------------------------------------

const lendAndStakeSelector = "0x29fa046e"; // lendAndStake(address,bytes,bytes)
export const lendAndStake = IntegrationManager.makeUse(lendAndStakeSelector, lendAndStakeEncode);

const lendAndStakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "orderedOutgoingAssetAmounts",
    type: "uint256[]",
  },
  {
    name: "incomingStakingToken",
    type: "address",
  },
  {
    name: "minIncomingStakingTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
] as const;

export type LendAndStakeArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: ReadonlyArray<bigint>;
  incomingStakingToken: Address;
  minIncomingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function lendAndStakeEncode(args: LendAndStakeArgs): Hex {
  return encodeAbiParameters(lendAndStakeEncoding, [
    args.pool,
    args.orderedOutgoingAssetAmounts,
    args.incomingStakingToken,
    args.minIncomingStakingTokenAmount,
    args.useUnderlyings,
  ]);
}

export function lendAndStakeDecode(encoded: Hex): LendAndStakeArgs {
  const [pool, orderedOutgoingAssetAmounts, incomingStakingToken, minIncomingStakingTokenAmount, useUnderlyings] =
    decodeAbiParameters(lendAndStakeEncoding, encoded);

  return {
    pool,
    orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
    incomingStakingToken,
    minIncomingStakingTokenAmount,
    useUnderlyings,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

const redeemEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingLpTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
  {
    name: "redeemType",
    type: "uint8",
  },
  {
    name: "incomingAssetsData",
    type: "bytes",
  },
] as const;

export type RedeemType = typeof RedeemType[keyof typeof RedeemType];
export const RedeemType = {
  Standard: 0,
  OneCoin: 1,
} as const;

export type RedeemArgs = {
  pool: Address;
  outgoingLpTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemType;
  incomingAssetsData: Hex;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.pool,
    args.outgoingLpTokenAmount,
    args.useUnderlyings,
    args.redeemType,
    args.incomingAssetsData,
  ]);
}

export function isValidRedeemType(value: number): value is RedeemType {
  return !Object.values(RedeemType).includes(value as RedeemType);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [pool, outgoingLpTokenAmount, useUnderlyings, redeemType, incomingAssetsData] = decodeAbiParameters(
    redeemEncoding,
    encoded,
  );

  if (!isValidRedeemType(redeemType)) {
    Assertion.invariant(false, "Invalid redeem type");
  }

  return {
    pool,
    outgoingLpTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

const claimRewardsSelector = "0xb9dfbacc"; // claimRewards(address,bytes,bytes)
export const claimRewards = IntegrationManager.makeUse(claimRewardsSelector, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
] as const;

export type ClaimRewardsArgs = {
  stakingToken: Address;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.stakingToken]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [stakingToken] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { stakingToken };
}

//--------------------------------------------------------------------------------------------
// STAKE
//--------------------------------------------------------------------------------------------

const stakeSelector = "0xfa7dd04d"; // stake(address,bytes,bytes)
export const stake = IntegrationManager.makeUse(stakeSelector, stakeEncode);

const stakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "incomingStakingToken",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type StakeArgs = {
  pool: Address;
  incomingStakingToken: Address;
  amount: bigint;
};

export function stakeEncode(args: StakeArgs): Hex {
  return encodeAbiParameters(stakeEncoding, [args.pool, args.incomingStakingToken, args.amount]);
}

export function stakeDecode(encoded: Hex): StakeArgs {
  const [pool, incomingStakingToken, amount] = decodeAbiParameters(stakeEncoding, encoded);

  return { pool, incomingStakingToken, amount };
}

//--------------------------------------------------------------------------------------------
// UNSTAKE
//--------------------------------------------------------------------------------------------

const unstakeSelector = "0x68e30677"; // unstake(address,bytes,bytes)
export const unstake = IntegrationManager.makeUse(unstakeSelector, unstakeEncode);

const unstakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingStakingToken",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type UnstakeArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  amount: bigint;
};

export function unstakeEncode(args: UnstakeArgs): Hex {
  return encodeAbiParameters(unstakeEncoding, [args.pool, args.outgoingStakingToken, args.amount]);
}

export function unstakeDecode(encoded: Hex): UnstakeArgs {
  const [pool, outgoingStakingToken, amount] = decodeAbiParameters(unstakeEncoding, encoded);

  return { pool, outgoingStakingToken, amount };
}

//--------------------------------------------------------------------------------------------
// UNSTAKE AND REDEEM
//--------------------------------------------------------------------------------------------

const unstakeAndRedeemSelector = "0x8334eb99"; // unstakeAndRedeem(address,bytes,bytes)
export const unstakeAndRedeem = IntegrationManager.makeUse(unstakeAndRedeemSelector, unstakeAndRedeemEncode);

const unstakeAndRedeemEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingStakingToken",
    type: "address",
  },
  {
    name: "outgoingStakingTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
  {
    name: "redeemType",
    type: "uint8",
  },
  {
    name: "incomingAssetsData",
    type: "bytes",
  },
] as const;

export type UnstakeAndRedeemArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  outgoingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemType;
  incomingAssetsData: Hex;
};

export function unstakeAndRedeemEncode(args: UnstakeAndRedeemArgs): Hex {
  return encodeAbiParameters(unstakeAndRedeemEncoding, [
    args.pool,
    args.outgoingStakingToken,
    args.outgoingStakingTokenAmount,
    args.useUnderlyings,
    args.redeemType,
    args.incomingAssetsData,
  ]);
}

export function unstakeAndRedeemDecode(encoded: Hex): UnstakeAndRedeemArgs {
  const [pool, outgoingStakingToken, outgoingStakingTokenAmount, useUnderlyings, redeemType, incomingAssetsData] =
    decodeAbiParameters(unstakeAndRedeemEncoding, encoded);

  if (!isValidRedeemType(redeemType)) {
    Assertion.invariant(false, "Invalid redeem type");
  }

  return {
    pool,
    outgoingStakingToken,
    outgoingStakingTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  };
}
