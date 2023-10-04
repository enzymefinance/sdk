import * as Abis from "@enzymefinance/abis";
import { Assertion, Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

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

interface LockData {
  amount: bigint;
  boosted: bigint;
  unlockTime: number;
}

interface LockedBalances {
  total: bigint;
  unlockable: bigint;
  locked: bigint;
  lockedData: LockData[];
}

export interface PoolInfo {
  lptoken: Address;
  token: Address;
  gauge: Address;
  crvRewards: Address;
  stash: Address;
  shutdown: boolean;
}

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

const convertCrvToCvxAbi = {
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
    abi: [convertCrvToCvxAbi],
    address: args.cvxMining,
    functionName: "ConvertCrvToCvx",
    args: [args.amount],
  });
}

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
