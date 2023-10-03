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
