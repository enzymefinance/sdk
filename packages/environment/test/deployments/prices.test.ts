import { Protocol } from "@enzymefinance/sdk";
import { formatEther } from "viem";
import { beforeAll, expect, suite, test } from "vitest";
import type { Address } from "../../src/index.js";
import { AssetType, Environment } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getCoingeckoPrices } from "../utils/coingecko.js";
import { calcNormalizedAssetValue } from "../utils/contracts/AssetValueCalculator.js";
import { environment } from "../utils/fixtures.js";

const assets = environment.getAssets();
const primitives = environment.getAssets({
  registered: true,
  types: [AssetType.PRIMITIVE, AssetType.AAVE_V2],
});

const client = getClient(environment.network.id);

async function isRegistered(asset: Address) {
  if (Environment.isPhoenix(environment) || Environment.isEncore(environment)) {
    const a = environment.getContract("ChainlinkPriceFeed");
    const b = environment.getContract("AggregatedDerivativePriceFeed");
    const results = await Promise.all([
      Protocol.isSupportedAsset(client, { valueInterpreter: a, asset }),
      Protocol.isSupportedAsset(client, { valueInterpreter: b, asset }),
    ]);

    return results.includes(true);
  }

  const c = environment.getContract("ValueInterpreter");

  return Protocol.isSupportedAsset(client, { valueInterpreter: c, asset });
}

let prices: Record<Address, number | undefined> = {};

beforeAll(async () => {
  prices = await getCoingeckoPrices(environment.network.id, primitives);
}, 120000);

suite.each(assets)("$symbol ($name): $id", (asset) => {
  let registered: boolean;
  let valid: boolean;
  let onchain: number;

  beforeAll(async () => {
    const dai = environment.namedTokens.dai;

    const normalized = await calcNormalizedAssetValue(client, {
      assetValueCalculator: environment.contracts.AssetValueCalculator,
      baseAsset: asset.id,
      quoteAsset: dai.id,
    });

    onchain = Number(formatEther(normalized.value));
    valid = normalized.valueIsValid;
    registered = await isRegistered(asset.id);
  });

  if (asset.registered) {
    test("registered asset is valid", () => {
      expect(registered).toBeTruthy();
      expect(valid).toBeTruthy();
      expect(onchain).not.toBe(0);
    });

    // TODO: Find a better way to reliably compare prices.
    test(
      "on-chain price is close to off-chain price",
      () => {
        const offchain = prices[asset.id];

        if (offchain === undefined) {
          return;
        }

        const difference = Math.abs((offchain - onchain) / ((offchain + onchain) / 2));
        const message = [
          `Off-chain: $${offchain.toFixed(4)}`,
          `On-chain: $${onchain.toFixed(4)}`,
          `Difference: ${(difference * 100).toFixed(2)}%`,
        ];

        // Allow a difference of up to 5%
        expect(difference, message.join(" / ")).toBeLessThan(0.05);
      },
      { retry: 1, timeout: 60000 },
    );
  } else {
    test("unregistered asset is not valid", () => {
      expect(registered).toBeFalsy();
      expect(valid).toBeFalsy();
      expect(onchain).toBe(0);
    });
  }
});
