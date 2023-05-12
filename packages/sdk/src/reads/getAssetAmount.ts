import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export async function getAssetAmount(
  client: PublicClient,
  {
    account,
    asset,
  }: {
    account: Address;
    asset: Address;
  },
) {
  return readContract(client, {
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"] as const),
    functionName: "balanceOf",
    address: asset,
    args: [account],
  });
}

export function getAssetAmountMultiple(
  client: PublicClient,
  {
    account,
    assets,
  }: {
    account: Address;
    assets: readonly Address[];
  },
) {
  return Promise.all(assets.map((asset) => getAssetAmount(client, { account, asset })));
}
