import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
  inputs: [{ internalType: "uint256", name: "shares_", type: "uint256" }],
  name: "convertToExitAssets",
  outputs: [{ internalType: "uint256", name: "assets_", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export async function convertMapleSharesToExitAssets(
  client: PublicClient,
  args: ReadContractParameters<{
    pool: Address;
    shares: bigint;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "convertToExitAssets",
    address: args.pool,
    args: [args.shares],
  });
}
