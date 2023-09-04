import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";

export type KilnAction = typeof KilnAction[keyof typeof KilnAction];
export const KilnAction = {
  Stake: 0n,
  ClaimFees: 1n,
  SweepEth: 2n,
  Unstake: 3n,
  PausePositionValue: 4n,
  UnpausePositionValue: 5n,
} as const;

export type KilnClaimType = typeof KilnClaimType[keyof typeof KilnClaimType];
export const KilnClaimType = {
  ExecutionLayer: 0,
  ConsensusLayer: 1,
  All: 2,
} as const;

const kilnStakeArgsEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "validatorAmount",
    type: "uint256",
  },
] as const;

const kilnClaimFeesArgsEncoding = [
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

const kilnUnstakeArgsEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "publicKeys",
    type: "bytes[]",
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
    externalPositionProxy,
    stakingContract,
    validatorAmount,
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
    publicKeys: [...publicKeys],
    claimFeeType,
  };
}

export type KilnSweepEthArgs = {
  externalPositionProxy: Address;
};

export function encodeKilnSweepEthArgs({ externalPositionProxy }: KilnSweepEthArgs): Hex {
  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.SweepEth,
    actionArgs: "0x",
  });
}

export function decodeKilnSweepEthArgs(callArgs: Hex): KilnSweepEthArgs {
  const { externalPositionProxy } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    externalPositionProxy,
  };
}

export type KilnPausePositionValueArgs = {
  externalPositionProxy: Address;
};

export function encodeKilnPausePositionValueArgs({ externalPositionProxy }: KilnPausePositionValueArgs): Hex {
  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.PausePositionValue,
    actionArgs: "0x",
  });
}

export function decodeKilnPausePositionValueArgs(callArgs: Hex): KilnPausePositionValueArgs {
  const { externalPositionProxy } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    externalPositionProxy,
  };
}

export type KilnUnpausePositionValueArgs = {
  externalPositionProxy: Address;
};

export function encodeKilnUnpausePositionValueArgs({ externalPositionProxy }: KilnUnpausePositionValueArgs): Hex {
  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.UnpausePositionValue,
    actionArgs: "0x",
  });
}

export function decodeKilnUnpausePositionValueArgs(callArgs: Hex): KilnUnpausePositionValueArgs {
  const { externalPositionProxy } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    externalPositionProxy,
  };
}

export type KilnUnstakeArgs = {
  externalPositionProxy: Address;
  publicKeys: Hex[];
  stakingContract: Address;
};

export function encodeKilnUnstakeArgs({ externalPositionProxy, stakingContract, publicKeys }: KilnUnstakeArgs): Hex {
  const actionArgs = encodeAbiParameters(kilnUnstakeArgsEncoding, [stakingContract, publicKeys]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.Unstake,
    actionArgs,
  });
}

export function decodeKilnUnstakeArgs(callArgs: Hex): KilnUnstakeArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [stakingContract, publicKeys] = decodeAbiParameters(kilnUnstakeArgsEncoding, actionArgs);

  return {
    externalPositionProxy,
    stakingContract,
    publicKeys: [...publicKeys],
  };
}
