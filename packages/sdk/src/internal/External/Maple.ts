import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

const convertToExitAssetsAbi = {
  inputs: [{ internalType: "uint256", name: "shares_", type: "uint256" }],
  name: "convertToExitAssets",
  outputs: [{ internalType: "uint256", name: "assets_", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export async function convertSharesToExitAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    shares: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: [convertToExitAssetsAbi],
    functionName: "convertToExitAssets",
    address: args.pool,
    args: [args.shares],
  });
}
