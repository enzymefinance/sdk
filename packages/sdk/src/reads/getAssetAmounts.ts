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
    args.assets.map(async (asset) => {
      const amount = await getAssetAmount(client, {
        ...args,
        asset,
      });

      return { asset, amount };
    }),
  );

  const amounts: Record<Address, bigint> = {};
  for (const { asset, amount } of balances) {
    amounts[asset] = amount;
  }

  return amounts;
}
