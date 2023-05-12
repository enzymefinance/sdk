import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetDecimals(
  client: PublicClient,
  {
    asset,
  }: {
    asset: Address;
  },
) {
  const decimals = await readContract(client, {
    abi: parseAbi(["function decimals() view returns (uint)"] as const),
    functionName: "decimals",
    address: asset,
  });

  return decimals;
}
