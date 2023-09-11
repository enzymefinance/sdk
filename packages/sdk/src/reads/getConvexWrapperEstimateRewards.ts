import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IConvexCurveLpStakingWrapperLib } from "@enzymefinance/abis/IConvexCurveLpStakingWrapperLib";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

export async function getConvexWrapperEstimateRewards(
  client: PublicClient,
  args: ReadContractParameters<{
    assetAddress: Address;
    claimAddress: Address;
  }>,
) {
  try {
    const [claimedAmounts, rewardTokens] = (await client.simulateContract({
      ...readContractParameters(args),
      abi: IConvexCurveLpStakingWrapperLib,
      functionName: "claimRewardsFor",
      address: args.assetAddress,
      args: [args.claimAddress],
    })) as unknown as [bigint[], Address[]];

    return {
      claimedAmounts,
      rewardTokens,
    };
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
