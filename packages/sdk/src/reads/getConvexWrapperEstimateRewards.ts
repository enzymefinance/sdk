import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IConvexCurveLpStakingWrapperLib } from "@enzymefinance/abis/IConvexCurveLpStakingWrapperLib";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

export async function getConvexWrapperEstimateRewards(
  client: PublicClient,
  args: ReadContractParameters<{
    stakingWrapper: Address;
    beneficiary: Address;
  }>,
) {
  try {
    const {
      result: [rewardTokens, claimedAmounts],
    } = await client.simulateContract({
      ...readContractParameters(args),
      abi: IConvexCurveLpStakingWrapperLib,
      functionName: "claimRewardsFor",
      address: args.stakingWrapper,
      args: [args.beneficiary],
    });

    const tokenRewards: Record<Address, bigint> = {};
    for (let i = 0; i < rewardTokens.length; i++) {
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      const rewardToken = rewardTokens[i]!;
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      const claimedAmount = claimedAmounts[i]! ?? 0n;
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
  args: ReadContractParameters<{
    stakingWrappers: Address[];
    beneficiary: Address;
  }>,
) {
  const tokenRewards = await Promise.all(
    args.stakingWrappers.map(async (stakingWrapper) =>
      getConvexWrapperEstimateRewards(client, {
        ...args,
        stakingWrapper,
      }),
    ),
  );

  return tokenRewards;
}
