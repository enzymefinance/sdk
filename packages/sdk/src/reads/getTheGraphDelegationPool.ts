import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
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

export async function getTheGraphDelegationPool(
  client: PublicClient,
  args: ReadContractParameters<{
    stakingContract: Address;
    indexer: Address;
  }>,
) {
  const [cooldownBlocks, indexingRewardCut, queryFeeCut, updatedAtBlock, tokens, shares] = await client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "delegationPools",
    address: args.stakingContract,
    args: [args.indexer],
  });

  return { cooldownBlocks, indexingRewardCut, queryFeeCut, updatedAtBlock, tokens, shares };
}
