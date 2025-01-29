import { z } from "zod";
import { type Asset, AssetType } from "../../src/assets.js";
import { type Network, networks } from "../../src/networks.js";
import type { NarrowByType } from "../../src/types.js";

const schema = z.object({
  pt: z.object({
    price: z.object({ usd: z.number().nonnegative() }),
  }),
  lp: z.object({
    price: z.object({ usd: z.number().nonnegative() }),
  }),
});

export async function getPendleAssetPrice(
  network: Network,
  asset: NarrowByType<Asset, AssetType.PENDLE_V2_LP | AssetType.PENDLE_V2_PT>,
) {
  const market = asset.type === AssetType.PENDLE_V2_LP ? asset.id : asset.markets[0];

  const response = await fetch(`https://api-v2.pendle.finance/core/v1/${networks[network].id}/markets/${market}`);

  const result = await response.json();

  const parsedResult = schema.parse(result);

  return asset.type === AssetType.PENDLE_V2_LP ? parsedResult.lp.price.usd : parsedResult.pt.price.usd;
}
