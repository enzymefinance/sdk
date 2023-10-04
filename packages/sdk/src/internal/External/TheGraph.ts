import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

const delegationPoolsAbi = {
  inputs: [{ internalType: "address", name: "", type: "address" }],
  name: "delegationPools",
  outputs: [
    { internalType: "uint32", name: "cooldownBlocks", type: "uint32" },
    { internalType: "uint32", name: "indexingRewardCut", type: "uint32" },
    { internalType: "uint32", name: "queryFeeCut", type: "uint32" },
    { internalType: "uint256", name: "updatedAtBlock", type: "uint256" },
    { internalType: "uint256", name: "tokens", type: "uint256" },
    { internalType: "uint256", name: "shares", type: "uint256" },
  ],
  stateMutability: "view",
  type: "function",
} as const;

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
      abi: [delegationPoolsAbi],
      functionName: "delegationPools",
      address: args.stakingContract,
      args: [args.indexer],
    },
  );

  return { cooldownBlocks, indexingRewardCut, queryFeeCut, updatedAtBlock, tokens, shares };
}
