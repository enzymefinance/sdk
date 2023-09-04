import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";

const abiStakingContract = parseAbi([
  "function delegationPools(address indexer) view returns (uint32 cooldownBlocks, uint32 indexingRewardCut, uint32 queryFeeCut, uint256 updatedAtBlock, uint256 tokens, uint256 shares)",
] as const);

export function getTheGraphDelegationPool(
  client: PublicClient,
  args: ReadContractParameters<{
    stakingContract: Address;
    indexer: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: abiStakingContract,
    functionName: "delegationPools",
    address: args.stakingContract,
    args: [args.indexer],
  });
}
