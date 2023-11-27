import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { Assertion, Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";
import { type RedeemType, isValidRedeemType } from "./Curve.js";

//--------------------------------------------------------------------------------------------
// LEND AND STAKE
//--------------------------------------------------------------------------------------------

export const lendAndStake = IntegrationManager.makeUse(IntegrationManager.Selector.LendAndStake, lendAndStakeEncode);

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
    orderedOutgoingAssetAmounts,
    incomingStakingToken,
    minIncomingStakingTokenAmount,
    useUnderlyings,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = IntegrationManager.makeUse(IntegrationManager.Selector.ClaimRewards, claimRewardsEncode);

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

export const stake = IntegrationManager.makeUse(IntegrationManager.Selector.Stake, stakeEncode);

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

export const unstake = IntegrationManager.makeUse(IntegrationManager.Selector.Unstake, unstakeEncode);

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

export const unstakeAndRedeem = IntegrationManager.makeUse(
  IntegrationManager.Selector.UnstakeAndRedeem,
  unstakeAndRedeemEncode,
);

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

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

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

export const claimVotingRewards = ExternalPositionManager.makeUse(Action.ClaimRewards, claimVotingRewardsEncode);

const claimVotingRewardsEncoding = [
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

export type ClaimVotingRewardsArgs = {
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

export function claimVotingRewardsEncode(args: ClaimVotingRewardsArgs): Hex {
  return encodeAbiParameters(claimVotingRewardsEncoding, [
    args.allTokensToTransfer,
    args.claimLockerRewards,
    args.extraRewardTokens,
    args.votiumClaims,
    args.unstakeCvxCrv,
  ]);
}

export function claimVotingRewardsDecode(encoded: Hex): ClaimVotingRewardsArgs {
  const [allTokensToTransfer, claimLockerRewards, extraRewardTokens, votiumClaims, unstakeCvxCrv] = decodeAbiParameters(
    claimVotingRewardsEncoding,
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
// EXTERNAL READ FUNCTIONS - CVX MINING
//--------------------------------------------------------------------------------------------

const cvxMiningAbi = {
  inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
  name: "ConvertCrvToCvx",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export async function convertCrvToCvx(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cvxMining: Address;
    amount: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: [cvxMiningAbi],
    address: args.cvxMining,
    functionName: "ConvertCrvToCvx",
    args: [args.amount],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - VOTE LOCKED CONVEX TOKEN
//--------------------------------------------------------------------------------------------

// ABI from https://etherscan.io/address/0x72a19342e8f1838460ebfccef09f6585e32db86e#code
const cvxLockerV2Abi = [
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "lockedBalances",
    outputs: [
      { internalType: "uint256", name: "total", type: "uint256" },
      { internalType: "uint256", name: "unlockable", type: "uint256" },
      { internalType: "uint256", name: "locked", type: "uint256" },
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
  {
    inputs: [{ internalType: "address", name: "_account", type: "address" }],
    name: "claimableRewards",
    outputs: [
      {
        components: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        internalType: "struct CvxLockerV2.EarnedData[]",
        name: "userRewards",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "userLocks",
    outputs: [
      { internalType: "uint112", name: "amount", type: "uint112" },
      { internalType: "uint112", name: "boosted", type: "uint112" },
      { internalType: "uint32", name: "unlockTime", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getVoteLockedBalances(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    voteLockedConvexToken: Address;
    positionAddress: Address;
  }>,
) {
  const [total, unlockable, locked, balancesData] = await Viem.readContract(client, args, {
    abi: cvxLockerV2Abi,
    address: args.voteLockedConvexToken,
    functionName: "lockedBalances",
    args: [args.positionAddress],
  });

  const lockedData = balancesData.map((data) => ({
    amount: data.amount,
    boosted: data.boosted,
    unlockTime: data.unlockTime,
  }));

  return {
    total,
    unlockable,
    locked,
    lockedData,
  };
}

export async function getClaimableRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    voteLockedConvexToken: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: cvxLockerV2Abi,
    address: args.voteLockedConvexToken,
    functionName: "claimableRewards",
    args: [args.user],
  });
}

export async function getUserLocks(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    voteLockedConvexToken: Address;
    user: Address;
    lockNumber: bigint;
  }>,
) {
  const [amount, boosted, unlockTime] = await Viem.readContract(client, args, {
    abi: cvxLockerV2Abi,
    address: args.voteLockedConvexToken,
    functionName: "userLocks",
    args: [args.user, args.lockNumber],
  });

  return { amount, boosted, unlockTime };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - CVX BOOSTER
//--------------------------------------------------------------------------------------------

// ABI from https://etherscan.io/address/0xf403c135812408bfbe8713b5a23a04b3d48aae31#code
const boosterAbi = [
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "address", name: "lptoken", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "gauge", type: "address" },
      { internalType: "address", name: "crvRewards", type: "address" },
      { internalType: "address", name: "stash", type: "address" },
      { internalType: "bool", name: "shutdown", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockIncentive",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakerIncentive",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "earmarkIncentive",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export interface PoolInfo {
  lptoken: Address;
  token: Address;
  gauge: Address;
  crvRewards: Address;
  stash: Address;
  shutdown: boolean;
}

export async function getPoolInfo(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    booster: Address;
    pid: bigint;
  }>,
) {
  const [lptoken, token, gauge, crvRewards, stash, shutdown] = await Viem.readContract(client, args, {
    abi: boosterAbi,
    functionName: "poolInfo",
    address: args.booster,
    args: [args.pid],
  });

  return { lptoken, token, gauge, crvRewards, stash, shutdown };
}

export async function getLockIncentive(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    booster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: boosterAbi,
    functionName: "lockIncentive",
    address: args.booster,
  });
}

export async function getStakerIncentive(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    booster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: boosterAbi,
    functionName: "stakerIncentive",
    address: args.booster,
  });
}

export async function getEarmarkIncentive(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    booster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: boosterAbi,
    functionName: "earmarkIncentive",
    address: args.booster,
  });
}

export async function getPlatformFee(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    booster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: boosterAbi,
    functionName: "platformFee",
    address: args.booster,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - CVX CRV REWARDS
//--------------------------------------------------------------------------------------------

// ABI from https://etherscan.io/address/0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e#code
const cvxCrvRewards = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "extraRewardsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "extraRewards",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cvxCrvRewards: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: cvxCrvRewards,
    functionName: "rewards",
    address: args.cvxCrvRewards,
    args: [args.user],
  });
}

export async function getExtraRewardsLength(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cvxCrvRewards: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: cvxCrvRewards,
    functionName: "extraRewardsLength",
    address: args.cvxCrvRewards,
  });
}

export async function getExtraRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cvxCrvRewards: Address;
    id: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: cvxCrvRewards,
    functionName: "extraRewards",
    address: args.cvxCrvRewards,
    args: [args.id],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - CVX CRV EXTRA REWARDS
//--------------------------------------------------------------------------------------------

export async function getExtraRewardsRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cvxCrvExtraRewards: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function rewards(address user) view returns (uint256)"]),
    functionName: "rewards",
    address: args.cvxCrvExtraRewards,
    args: [args.user],
  });
}

export async function getExtraRewardsRewardToken(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cvxCrvExtraRewards: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function rewardToken() view returns (address)"]),
    functionName: "rewardToken",
    address: args.cvxCrvExtraRewards,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - STAKING WRAPPER
//--------------------------------------------------------------------------------------------

export async function getEstimateRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    stakingWrapper: Address;
    beneficiary: Address;
  }>,
) {
  const {
    result: [rewardTokens, claimedAmounts],
  } = await Viem.simulateContract(client, args, {
    abi: Abis.IConvexCurveLpStakingWrapperLib,
    functionName: "claimRewardsFor",
    address: args.stakingWrapper,
    args: [args.beneficiary],
  });

  const tokenRewards: { rewardToken: Address; claimedAmount: bigint }[] = [];
  for (let i = 0; i < rewardTokens.length; i++) {
    const rewardToken = rewardTokens[i];
    const claimedAmount = claimedAmounts[i];
    Assertion.invariant(rewardToken !== undefined, "Expected reward token to be defined.");
    Assertion.invariant(claimedAmount !== undefined, "Expected claimed amount to be defined.");

    tokenRewards.push({ rewardToken, claimedAmount });
  }

  return tokenRewards;
}

export async function getAllEstimateRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    stakingWrappers: Address[];
    beneficiary: Address;
  }>,
) {
  return Promise.all(
    args.stakingWrappers.map(async (stakingWrapper) => {
      const rewards = await getEstimateRewards(client, {
        ...args,
        stakingWrapper,
      });

      return { rewards, stakingWrapper };
    }),
  );
}
