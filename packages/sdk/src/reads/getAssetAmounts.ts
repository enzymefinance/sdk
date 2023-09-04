import type { ReadContractParameters } from "../utils/viem.js";
import { getAssetAmount } from "./getAssetAmount.js";
import type { Address, PublicClient } from "viem";

export async function getAssetAmounts(
  client: PublicClient,
  args: ReadContractParameters<{
    owner: Address;
    assets: Address[];
  }>,
) {
  const balances = await Promise.all(
    args.assets.map((asset) => {
      return getAssetAmount(client, {
        asset,
        owner: args.owner,
      });
    }),
  );

  return balances.reduce<Record<Address, bigint>>((balancesMap, balance, currentIndex) => {
    const asset = args.assets[currentIndex];

    if (!asset) {
      throw new Error(`Asset not found at index ${currentIndex}`);
    }

    balancesMap[asset] = balance;
    return balancesMap;
  }, {});
}
