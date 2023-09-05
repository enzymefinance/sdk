import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abiStakingContract = [
  {
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
  },
];

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
