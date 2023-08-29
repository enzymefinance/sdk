import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type KilnAction = typeof KilnAction[keyof typeof KilnAction];
export const KilnAction = {
  Stake: 0n,
  ClaimFees: 1n,
  WithdrawEth: 2n,
} as const;

export type KilnClaimType = typeof KilnClaimType[keyof typeof KilnClaimType];
export const KilnClaimType = {
  ExecutionLayer: 0,
  ConsensusLayer: 1,
  All: 2,
} as const;

export const kilnStakeArgsEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "validatorAmount",
    type: "uint256",
  },
] as const;

export const kilnClaimFeesArgsEncoding = [
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

export type KilnStakeArgs = {
  stakingContract: Address;
  validatorAmount: bigint;
  externalPositionProxy: Address;
};

export type KilnClaimFeesArgs = {
  stakingContract: Address;
  publicKeys: Hex[];
  claimFeeType: number;
  externalPositionProxy: Address;
};

export function encodeKilnStakeArgs({ externalPositionProxy, stakingContract, validatorAmount }: KilnStakeArgs): Hex {
  const actionArgs = encodeAbiParameters(kilnStakeArgsEncoding, [stakingContract, validatorAmount]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.Stake,
    actionArgs,
  });
}

export function decodeKilnStakeArgs(callArgs: Hex): KilnStakeArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [stakingContract, validatorAmount] = decodeAbiParameters(kilnStakeArgsEncoding, actionArgs);

  return {
    validatorAmount,
    stakingContract,
    externalPositionProxy,
  };
}

export function encodeKilnClaimFeesArgs({
  externalPositionProxy,
  stakingContract,
  publicKeys,
  claimFeeType,
}: KilnClaimFeesArgs): Hex {
  const actionArgs = encodeAbiParameters(kilnClaimFeesArgsEncoding, [stakingContract, publicKeys, claimFeeType]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.ClaimFees,
    actionArgs,
  });
}

export function decodeKilnClaimFeesArgs(callArgs: Hex): KilnClaimFeesArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [stakingContract, publicKeys, claimFeeType] = decodeAbiParameters(kilnClaimFeesArgsEncoding, actionArgs);

  return {
    externalPositionProxy,
    stakingContract,
    publicKeys,
    claimFeeType,
  };
}
