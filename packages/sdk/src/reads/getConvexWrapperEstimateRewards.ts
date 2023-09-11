import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IConvexCurveLpStakingWrapperLib } from "@enzymefinance/abis/IConvexCurveLpStakingWrapperLib";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

export function getConvexWrapperEstimateRewards(
  client: PublicClient,
  args: ReadContractParameters<{
    assetAddress: Address;
    claimAddress: Address;
  }>,
) {
  try {
    return client.simulateContract({
      ...readContractParameters(args),
      abi: IConvexCurveLpStakingWrapperLib,
      functionName: "claimRewardsFor",
      address: args.assetAddress,
      args: [args.claimAddress],
    });
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
