import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetTotalSupply(
  client: PublicClient,
  {
    asset,
  }: {
    asset: Address;
  },
) {
  const totalSupply = await readContract(client, {
    abi: parseAbi(["function totalSupply() view returns (uint)"] as const),
    functionName: "totalSupply",
    address: asset,
  });

  return totalSupply;
}
