import * as Abis from "@enzymefinance/abis";
import { Assertion, Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

//--------------------------------------------------------------------------------------------
// CVX MINING
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
// VOTE LOCKED CONVEX TOKEN
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
  return Viem.readContract(client, args, {
    abi: cvxLockerV2Abi,
    address: args.voteLockedConvexToken,
    functionName: "userLocks",
    args: [args.user, args.lockNumber],
  });
}

//--------------------------------------------------------------------------------------------
// CVX BOOSTER
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
// CVX BOOSTER
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
// STAKING WRAPPER
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

  const tokenRewards: Record<Address, bigint> = {};
  for (let i = 0; i < rewardTokens.length; i++) {
    const rewardToken = rewardTokens[i];
    const claimedAmount = claimedAmounts[i];
    Assertion.invariant(rewardToken !== undefined, "Expected reward token to be defined.");
    Assertion.invariant(claimedAmount !== undefined, "Expected claimed amount to be defined.");

    tokenRewards[rewardToken] = claimedAmount;
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
  const tokenRewards = await Promise.all(
    args.stakingWrappers.map(async (stakingWrapper) => {
      const rewards = await getEstimateRewards(client, {
        ...args,
        stakingWrapper,
      });

      return { rewards, stakingWrapper };
    }),
  );

  const tokenRewardsMap: Record<Address, Record<`0x${string}`, bigint> | undefined> = {};

  for (const { rewards, stakingWrapper } of tokenRewards) {
    tokenRewardsMap[stakingWrapper] = rewards;
  }

  return tokenRewardsMap;
}
