import pThrottle from "p-throttle";
import type { Address, Asset } from "../../src/index.js";
import { Network, networks } from "../../src/index.js";

const throttle = pThrottle({
  limit: Number.parseInt(process.env.COINGECKO_MINUTE_RATE || "30"), // Demo rate
  interval: 60000,
  onDelay: () => {},
});

async function fetchPrices(url: string, addresses: ReadonlyArray<string>) {
  const response = await fetch(`${url}?vs_currencies=usd&contract_addresses=${addresses.join(",")}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.json();
}

export async function getCoingeckoPrices(network: Network, assets: ReadonlyArray<Asset>) {
  const slug = network === Network.POLYGON ? "polygon-pos" : networks[network].slug;
  const url = `https://api.coingecko.com/api/v3/simple/token_price/${slug}`;

  const ids = assets.map((asset) => asset.id);
  const chunks = [...Array(Math.ceil(ids.length / 10))].map(() => ids.splice(0, 10));

  const results = await Promise.all(
    chunks.map(async (addresses) => {
      const json = (await throttle(fetchPrices)(url, addresses)) as Record<Address, { usd?: number }>;
      const prices = Object.entries(json).reduce<Record<Address, number>>((carry, [address, price]) => {
        if (price.usd === undefined) {
          return carry;
        }

        carry[address.toLowerCase()] = price.usd;

        return carry;
      }, {});

      return prices;
    }),
  );

  return results.reduce((carry, current) => {
    Object.assign(carry, current);
    return carry;
  });
}
