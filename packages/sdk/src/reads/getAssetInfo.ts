import { getAssetDecimals } from "./getAssetDecimals.js";
import { getAssetName } from "./getAssetName.js";
import { getAssetSymbol } from "./getAssetSymbol.js";
import type { Address, PublicClient } from "viem";

export async function getAssetInfo(
  client: PublicClient,
  {
    asset,
  }: {
    asset: Address;
  },
) {
  const [name, symbol, decimals] = await Promise.all([
    getAssetName(client, { asset }),
    getAssetSymbol(client, { asset }),
    getAssetDecimals(client, { asset }),
  ]);

  return { name, symbol, decimals, address: asset };
}

export function getAssetInfoMultiple(
  client: PublicClient,
  {
    assets,
  }: {
    assets: readonly Address[];
  },
) {
  return Promise.all(assets.map((asset) => getAssetInfo(client, { asset })));
}
