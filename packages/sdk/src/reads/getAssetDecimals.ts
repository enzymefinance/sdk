import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export function getAssetDecimals(
  client: PublicClient,
  {
    asset,
  }: {
    asset: Address;
  },
) {
  return readContract(client, {
    abi: parseAbi(["function decimals() view returns (uint)"] as const),
    functionName: "decimals",
    address: asset,
  });
}
