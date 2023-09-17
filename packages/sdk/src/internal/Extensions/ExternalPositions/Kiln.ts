import { Assertion } from "@enzymefinance/sdk/Utils";
import * as ExternalPositionManager from "@enzymefinance/sdk/internal/ExternalPositionManager";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  Stake: 0n,
  ClaimFees: 1n,
  SweepEth: 2n,
  Unstake: 3n,
  PausePosition: 4n,
  UnpausePosition: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

// --------------------------------------------------------------------------------------------
// STAKE
// --------------------------------------------------------------------------------------------

export const stake = ExternalPositionManager.makeUse(Action.Stake, stakeEncode);
export const createAndStake = ExternalPositionManager.makeCreateAndUse(Action.Stake, stakeEncode);

const stakeEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "validatorAmount",
    type: "uint256",
  },
] as const;

export type StakeArgs = {
  stakingContract: Address;
  validatorAmount: bigint;
};

export function stakeEncode(args: StakeArgs): Hex {
  return encodeAbiParameters(stakeEncoding, [args.stakingContract, args.validatorAmount]);
}

export function stakeDecode(encoded: Hex): StakeArgs {
  const [stakingContract, validatorAmount] = decodeAbiParameters(stakeEncoding, encoded);

  return {
    stakingContract,
    validatorAmount,
  };
}

// --------------------------------------------------------------------------------------------
// CLAIM FEES
// --------------------------------------------------------------------------------------------

const claimFeesEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "publicKeys",
    type: "bytes[]",
  },
  {
    name: "claimFeeType",
    type: "uint8",
  },
] as const;

export type ClaimFeesArgs = {
  stakingContract: Address;
  publicKeys: ReadonlyArray<Hex>;
  claimFeeType: ClaimType;
};

export type ClaimType = typeof ClaimType[keyof typeof ClaimType];
export const ClaimType = {
  ExecutionLayer: 0,
  ConsensusLayer: 1,
  All: 2,
} as const;

export function claimFeesEncode(args: ClaimFeesArgs): Hex {
  return encodeAbiParameters(claimFeesEncoding, [args.stakingContract, args.publicKeys, args.claimFeeType]);
}

export function isValidClaimType(value: number): value is ClaimType {
  return !Object.values(ClaimType).includes(value as ClaimType);
}

export function claimFeesDecode(encoded: Hex): ClaimFeesArgs {
  const [stakingContract, publicKeys, claimFeeType] = decodeAbiParameters(claimFeesEncoding, encoded);

  if (!isValidClaimType(claimFeeType)) {
    Assertion.invariant(false, "Invalid claim fee type");
  }

  return {
    stakingContract,
    publicKeys,
    claimFeeType,
  };
}

// --------------------------------------------------------------------------------------------
// SWEEP ETH
// --------------------------------------------------------------------------------------------

export const sweepEth = ExternalPositionManager.makeUse(Action.SweepEth);

// --------------------------------------------------------------------------------------------
// PAUSE POSITION
// --------------------------------------------------------------------------------------------

export const pausePosition = ExternalPositionManager.makeUse(Action.PausePosition);

// --------------------------------------------------------------------------------------------
// UNPAUSE POSITION
// --------------------------------------------------------------------------------------------

export const unpausePosition = ExternalPositionManager.makeUse(Action.UnpausePosition);

// --------------------------------------------------------------------------------------------
// UNSTAKE
// --------------------------------------------------------------------------------------------

export const unstake = ExternalPositionManager.makeUse(Action.Unstake, unstakeEncode);

const unstakeEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "publicKeys",
    type: "bytes",
  },
] as const;

export type UnstakeArgs = {
  publicKeys: Hex;
  stakingContract: Address;
};

export function unstakeEncode(args: UnstakeArgs): Hex {
  return encodeAbiParameters(unstakeEncoding, [args.stakingContract, args.publicKeys]);
}

export function unstakeDecode(encoded: Hex): UnstakeArgs {
  const [stakingContract, publicKeys] = decodeAbiParameters(unstakeEncoding, encoded);

  return {
    stakingContract,
    publicKeys,
  };
}
