import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Assertion, Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  Stake: 0n,
  ClaimFees: 1n,
  SweepEth: 2n,
  Unstake: 3n,
  PausePosition: 4n,
  UnpausePosition: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// STAKE
//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------
// CLAIM FEES
//--------------------------------------------------------------------------------------------

export const claimFees = ExternalPositionManager.makeUse(Action.ClaimFees, claimFeesEncode);

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
  publicKeys: readonly Hex[];
  claimFeeType: ClaimType;
};

export type ClaimType = (typeof ClaimType)[keyof typeof ClaimType];
export const ClaimType = {
  ExecutionLayer: 0,
  ConsensusLayer: 1,
  All: 2,
} as const;

export function claimFeesEncode(args: ClaimFeesArgs): Hex {
  return encodeAbiParameters(claimFeesEncoding, [args.stakingContract, args.publicKeys, args.claimFeeType]);
}

export function isValidClaimType(value: number): value is ClaimType {
  return Object.values(ClaimType).includes(value as ClaimType);
}

export function claimFeesDecode(encoded: Hex): ClaimFeesArgs {
  const [stakingContract, publicKeys, claimFeeType] = decodeAbiParameters(claimFeesEncoding, encoded);

  Assertion.invariant(isValidClaimType(claimFeeType), `Invalid claim fee type ${claimFeeType}`);

  return {
    stakingContract,
    publicKeys,
    claimFeeType,
  };
}

//--------------------------------------------------------------------------------------------
// SWEEP ETH
//--------------------------------------------------------------------------------------------

export const sweepEth = ExternalPositionManager.makeUse(Action.SweepEth);

//--------------------------------------------------------------------------------------------
// PAUSE POSITION
//--------------------------------------------------------------------------------------------

export const pausePosition = ExternalPositionManager.makeUse(Action.PausePosition);

//--------------------------------------------------------------------------------------------
// UNPAUSE POSITION
//--------------------------------------------------------------------------------------------

export const unpausePosition = ExternalPositionManager.makeUse(Action.UnpausePosition);

//--------------------------------------------------------------------------------------------
// UNSTAKE
//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getCLFeeRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    kilnStaking: Address;
    validatorPublicKey: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getCLFeeRecipient(bytes calldata _publicKey) external view returns (address)"]),
    functionName: "getCLFeeRecipient",
    address: args.kilnStaking,
    args: [args.validatorPublicKey],
  });
}

export function getELFeeRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    kilnStaking: Address;
    validatorPublicKey: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getELFeeRecipient(bytes calldata _publicKey) external view returns (address)"]),
    functionName: "getELFeeRecipient",
    address: args.kilnStaking,
    args: [args.validatorPublicKey],
  });
}

export function getGlobalFee(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    kilnStaking: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getGlobalFee() external view returns (uint256 globalFee_)"]),
    functionName: "getGlobalFee",
    address: args.kilnStaking,
  });
}
