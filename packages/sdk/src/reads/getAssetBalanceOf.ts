import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export function getAssetBalanceOf(
  client: PublicClient,
  {
    asset,
  }: {
    asset: Address;
  },
) {
  return readContract(client, {
    abi: parseAbi(["function balanceOf() view returns (uint)"] as const),
    functionName: "balanceOf",
    address: asset,
  });
}
