import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ConvexVotingAction = typeof ConvexVotingAction[keyof typeof ConvexVotingAction];
export const ConvexVotingAction = {
  Lock: 0n,
  Relock: 1n,
  Withdraw: 2n,
  ClaimRewards: 3n,
  Delegate: 4n,
} as const;

export const convexVotingLockArgsEncoding = [
  {
    name: "amount",
    type: "uint256",
  },
  {
    name: "spendRatio",
    type: "uint256",
  },
] as const;

export type ConvexVotingLockArgs = {
  externalPositionProxy: Address;
  amount: bigint;
  spendRatio: bigint;
};

export function encodeConvexVotingLockArgs({ externalPositionProxy, amount, spendRatio }: ConvexVotingLockArgs): Hex {
  const actionArgs = encodeAbiParameters(convexVotingLockArgsEncoding, [amount, spendRatio]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ConvexVotingAction.Lock,
    actionArgs,
  });
}

export function decodeConvexVotingLockArgs(callArgs: Hex): ConvexVotingLockArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [amount, spendRatio] = decodeAbiParameters(convexVotingLockArgsEncoding, actionArgs);

  return {
    amount,
    spendRatio,
    externalPositionProxy,
  };
}

export type ConvexVotingRelockArgs = {
  externalPositionProxy: Address;
};

export function encodeConvexVotingRelockArgs({ externalPositionProxy }: ConvexVotingRelockArgs): Hex {
  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ConvexVotingAction.Relock,
    actionArgs: "0x",
  });
}

export function decodeConvexVotingRelockArgs(callArgs: Hex): ConvexVotingRelockArgs {
  const { externalPositionProxy } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    externalPositionProxy,
  };
}

export type ConvexVotingWithdrawArgs = {
  externalPositionProxy: Address;
};

export function encodeConvexVotingWithdrawArgs({ externalPositionProxy }: ConvexVotingWithdrawArgs): Hex {
  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ConvexVotingAction.Withdraw,
    actionArgs: "0x",
  });
}

export function decodeConvexVotingWithdrawArgs(callArgs: Hex): ConvexVotingRelockArgs {
  const { externalPositionProxy } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    externalPositionProxy,
  };
}

export const convexClaimRewardsArgsEncoding = [
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

export type ConvexVotingClaimRewardsArgs = {
  externalPositionProxy: Address;
  allTokensToTransfer: Address[];
  claimLockerRewards: boolean;
  extraRewardTokens: Address[];
  votiumClaims: {
    token: Address;
    index: bigint;
    amount: bigint;
    merkleProof: Hex[];
  }[];
  unstakeCvxCrv: boolean;
};

export function encodeConvexVotingClaimRewardsArgs({
  externalPositionProxy,
  allTokensToTransfer,
  claimLockerRewards,
  extraRewardTokens,
  votiumClaims,
  unstakeCvxCrv,
}: ConvexVotingClaimRewardsArgs): Hex {
  const actionArgs = encodeAbiParameters(convexClaimRewardsArgsEncoding, [
    allTokensToTransfer,
    claimLockerRewards,
    extraRewardTokens,
    votiumClaims,
    unstakeCvxCrv,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ConvexVotingAction.ClaimRewards,
    actionArgs,
  });
}

export function decodeConvexVotingClaimRewardsArgs(callArgs: Hex): ConvexVotingClaimRewardsArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [allTokensToTransfer, claimLockerRewards, extraRewardTokens, votiumClaims, unstakeCvxCrv] = decodeAbiParameters(
    convexClaimRewardsArgsEncoding,
    actionArgs,
  );

  return {
    allTokensToTransfer: [...allTokensToTransfer],
    claimLockerRewards,
    extraRewardTokens: [...extraRewardTokens],
    votiumClaims: votiumClaims.map((claim) => ({
      ...claim,
      merkleProof: [...claim.merkleProof],
    })),
    unstakeCvxCrv,
    externalPositionProxy,
  };
}

export const convexVotingDelegateArgsEncoding = [
  {
    name: "delegate",
    type: "address",
  },
] as const;

export type ConvexVotingDelegateArgs = {
  externalPositionProxy: Address;
  delegate: Address;
};

export function encodeConvexVotingDelegateArgs({ externalPositionProxy, delegate }: ConvexVotingDelegateArgs): Hex {
  const actionArgs = encodeAbiParameters(convexVotingDelegateArgsEncoding, [delegate]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ConvexVotingAction.Delegate,
    actionArgs,
  });
}

export function decodeConvexVotingDelegateArgs(callArgs: Hex): ConvexVotingDelegateArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [delegate] = decodeAbiParameters(convexVotingDelegateArgsEncoding, actionArgs);

  return {
    delegate,
    externalPositionProxy,
  };
}
