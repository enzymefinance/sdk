import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as ExternalPositionManager from "../../ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  Lock: 0n,
  Relock: 1n,
  Withdraw: 2n,
  ClaimRewards: 3n,
  Delegate: 4n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// LOCK
//--------------------------------------------------------------------------------------------

export const lock = ExternalPositionManager.makeUse(Action.Lock, lockEncode);
export const createAndLock = ExternalPositionManager.makeCreateAndUse(Action.Lock, lockEncode);

const lockEncoding = [
  {
    name: "amount",
    type: "uint256",
  },
  {
    name: "spendRatio",
    type: "uint256",
  },
] as const;

export type LockArgs = {
  amount: bigint;
  spendRatio: bigint;
};

export function lockEncode(args: LockArgs): Hex {
  return encodeAbiParameters(lockEncoding, [args.amount, args.spendRatio]);
}

export function lockDecode(encoded: Hex): LockArgs {
  const [amount, spendRatio] = decodeAbiParameters(lockEncoding, encoded);

  return {
    amount,
    spendRatio,
  };
}

//--------------------------------------------------------------------------------------------
// RELOCK
//--------------------------------------------------------------------------------------------

export const relock = ExternalPositionManager.makeUse(Action.Relock);

//--------------------------------------------------------------------------------------------
// WITHDRAW
//--------------------------------------------------------------------------------------------

export const withdraw = ExternalPositionManager.makeUse(Action.Withdraw);

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = ExternalPositionManager.makeUse(Action.ClaimRewards, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "allTokensToTransfer",
    type: "address[]",
  },
  {
    name: "claimLockerRewards",
    type: "bool",
  },
  {
    name: "extraRewardTokens",
    type: "address[]",
  },
  {
    components: [
      {
        name: "token",
        type: "address",
      },
      {
        name: "index",
        type: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
      },
      {
        name: "merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "votiumClaims",
    type: "tuple[]",
  },
  {
    name: "unstakeCvxCrv",
    type: "bool",
  },
] as const;

export type ClaimRewardsArgs = {
  allTokensToTransfer: ReadonlyArray<Address>;
  claimLockerRewards: boolean;
  extraRewardTokens: ReadonlyArray<Address>;
  votiumClaims: ReadonlyArray<{
    token: Address;
    index: bigint;
    amount: bigint;
    merkleProof: ReadonlyArray<Hex>;
  }>;
  unstakeCvxCrv: boolean;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [
    args.allTokensToTransfer,
    args.claimLockerRewards,
    args.extraRewardTokens,
    args.votiumClaims,
    args.unstakeCvxCrv,
  ]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [allTokensToTransfer, claimLockerRewards, extraRewardTokens, votiumClaims, unstakeCvxCrv] = decodeAbiParameters(
    claimRewardsEncoding,
    encoded,
  );

  return {
    allTokensToTransfer,
    claimLockerRewards,
    extraRewardTokens,
    votiumClaims,
    unstakeCvxCrv,
  };
}

//--------------------------------------------------------------------------------------------
// DELEGATE
//--------------------------------------------------------------------------------------------

export const delegate = ExternalPositionManager.makeUse(Action.Delegate, delegateEncode);
export const createAndDelegate = ExternalPositionManager.makeCreateAndUse(Action.Delegate, delegateEncode);

const delegateEncoding = [
  {
    name: "delegate",
    type: "address",
  },
] as const;

export type DelegateArgs = {
  delegate: Address;
};

export function delegateEncode(args: DelegateArgs): Hex {
  return encodeAbiParameters(delegateEncoding, [args.delegate]);
}

export function delegateDecode(encoded: Hex): DelegateArgs {
  const [delegate] = decodeAbiParameters(delegateEncoding, encoded);

  return {
    delegate,
  };
}
