import * as ExternalPositionManager from "@enzymefinance/sdk/internal/ExternalPositionManager";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "@enzymefinance/sdk/Utils";

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

//--------------------------------------------------------------------------------------------
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

const voteLockedConvexTokenAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "lockedBalances",
    outputs: [
      { internalType: "uint256", name: "total", type: "uint256" },
      {
        internalType: "uint256",
        name: "unlockable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "locked",
        type: "uint256",
      },
      {
        components: [
          { internalType: "uint112", name: "amount", type: "uint112" },
          { internalType: "uint112", name: "boosted", type: "uint112" },
          { internalType: "uint32", name: "unlockTime", type: "uint32" },
        ],
        internalType: "struct CvxLockerV2.LockedBalance[]",
        name: "lockData",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

type LockData = {
  amount: bigint;
  boosted: bigint;
  unlockTime: number;
};

type LockedBalances = {
  total: bigint;
  unlockable: bigint;
  locked: bigint;
  lockedData: LockData[];
};

export async function getVoteLockedBalances(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    voteLockedConvexToken: Address;
    positionAddress: Address;
  }>,
) {
  const [total, unlockable, locked, balancesData] = await Viem.readContract(client, args, {
    abi: voteLockedConvexTokenAbi,
    address: args.voteLockedConvexToken,
    functionName: "lockedBalances",
    args: [args.positionAddress],
  });

  const lockedData = balancesData.map((data) => {
    return {
      amount: data.amount,
      boosted: data.boosted,
      unlockTime: data.unlockTime,
    };
  });

  const lockedBalancesData = {
    total,
    unlockable,
    locked,
    lockedData,
  };

  return lockedBalancesData;
}

export async function getAllVoteLockedBalances(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    voteLockedConvexToken: Address;
    positionAddresses: Address[];
  }>,
) {
  const allLockedBalances = await Promise.all(
    args.positionAddresses.map(async (position) => {
      const lockedBalances = await getVoteLockedBalances(client, {
        voteLockedConvexToken: args.voteLockedConvexToken,
        positionAddress: position,
      });

      return { position, lockedBalances };
    }),
  );

  const lockedBalancesMap: Record<Address, LockedBalances> = {};
  for (const { position, lockedBalances } of allLockedBalances) {
    lockedBalancesMap[position] = lockedBalances;
  }

  return lockedBalancesMap;
}
