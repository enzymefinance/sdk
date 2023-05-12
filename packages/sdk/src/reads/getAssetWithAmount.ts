import { getAssetAmount } from "./getAssetAmount.js";
import { getAssetInfo } from "./getAssetInfo.js";
import type { Address, PublicClient } from "viem";

export async function getAssetWithAmount(
  client: PublicClient,
  {
    account,
    asset,
  }: {
    account: Address;
    asset: Address;
  },
) {
  const [info, amount] = await Promise.all([
    getAssetInfo(client, { asset }),
    getAssetAmount(client, { account, asset }),
  ]);

  return { ...info, amount };
}
