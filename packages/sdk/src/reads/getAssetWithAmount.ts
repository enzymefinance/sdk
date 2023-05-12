import { getAmount } from "./getAmount.js";
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
  const [info, amount] = await Promise.all([getAssetInfo(client, { asset }), getAmount(client, { account, asset })]);

  return { ...info, amount };
}
