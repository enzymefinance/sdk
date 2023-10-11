import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getDelegationPool(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    stakingContract: Address;
    indexer: Address;
  }>,
) {
  const [cooldownBlocks, indexingRewardCut, queryFeeCut, updatedAtBlock, tokens, shares] = await Viem.readContract(
    client,
    args,
    {
      abi: parseAbi([
        "function delegationPools(address indexer) view returns (uint32 cooldownBlocks, uint32 indexingRewardCut, uint32 queryFeeCut, uint256 updatedAtBlock, uint256 tokens, uint256 shares)",
      ]),
      functionName: "delegationPools",
      address: args.stakingContract,
      args: [args.indexer],
    },
  );

  return { cooldownBlocks, indexingRewardCut, queryFeeCut, updatedAtBlock, tokens, shares };
}

export function getDelegationTaxPercentage(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    stakingContract: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function delegationTaxPercentage() view returns (uint32)"]),
    functionName: "delegationTaxPercentage",
    address: args.stakingContract,
  });
}

export function getCurrentEpoch(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    epochManager: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function currentEpoch() view returns (uint256)"]),
    functionName: "currentEpoch",
    address: args.epochManager,
  });
}
