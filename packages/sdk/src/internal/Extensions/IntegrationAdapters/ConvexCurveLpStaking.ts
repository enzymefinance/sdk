import * as Abis from "@enzymefinance/abis";
import { Assertion, Viem } from "@enzymefinance/sdk/Utils";
import {
  type RedeemType,
  isValidRedeemType,
} from "@enzymefinance/sdk/internal/Extensions/IntegrationAdapters/CurveLiquidity";
import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import {
  type Address,
  ContractFunctionExecutionError,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
} from "viem";

//--------------------------------------------------------------------------------------------
// LEND AND STAKE
//--------------------------------------------------------------------------------------------

const lendAndStakeSelector = "0x29fa046e"; // lendAndStake(address,bytes,bytes)
export const lendAndStake = IntegrationManager.makeUse(lendAndStakeSelector, lendAndStakeEncode);

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

const claimRewardsSelector = "0xb9dfbacc"; // claimRewards(address,bytes,bytes)
export const claimRewards = IntegrationManager.makeUse(claimRewardsSelector, claimRewardsEncode);

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

const stakeSelector = "0xfa7dd04d"; // stake(address,bytes,bytes)
export const stake = IntegrationManager.makeUse(stakeSelector, stakeEncode);

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

const unstakeSelector = "0x68e30677"; // unstake(address,bytes,bytes)
export const unstake = IntegrationManager.makeUse(unstakeSelector, unstakeEncode);

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

const unstakeAndRedeemSelector = "0x8334eb99"; // unstakeAndRedeem(address,bytes,bytes)
export const unstakeAndRedeem = IntegrationManager.makeUse(unstakeAndRedeemSelector, unstakeAndRedeemEncode);

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
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

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

export async function getConvexWrapperEstimateRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    stakingWrapper: Address;
    beneficiary: Address;
  }>,
) {
  try {
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
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}

export async function getAllConvexWrapperEstimateRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    stakingWrappers: Address[];
    beneficiary: Address;
  }>,
) {
  const tokenRewards = await Promise.all(
    args.stakingWrappers.map(async (stakingWrapper) => {
      const rewards = await getConvexWrapperEstimateRewards(client, {
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
