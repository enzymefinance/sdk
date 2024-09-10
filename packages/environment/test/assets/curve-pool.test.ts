import { Utils } from "@enzymefinance/sdk";
import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { calcWithdrawOneCoin, getCoins, getCoinsInt128 } from "../utils/contracts/CurvePool.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets();
const lps = environment.getAssets({ types: [AssetType.CURVE_POOL_LP] });

test.each(lps)("curve pool details: $symbol ($name): $id", async (asset) => {
  // Check that the underlying tokens are correct and ordered properly

  const coins = await Promise.all(
    asset.underlyings.map(async (_, index) => {
      try {
        return await getCoins(client, { curvePool: asset.pool, index: BigInt(index) });
      } catch {
        return getCoinsInt128(client, { curvePool: asset.pool, index: BigInt(index) });
      }
    }),
  );

  expect(
    asset.underlyings.every((underlying, index) => {
      // Replace the ethAddress with wETH
      const coin = Utils.Address.safeSameAddress(coins[index], "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE")
        ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        : coins[index];

      return Utils.Address.safeSameAddress(underlying, coin);
    }),
    "Underlying tokens do not match the ones returned by the contract",
  ).toBe(true);

  // Check that the staking assets exist
  expect(
    asset.staking.every((stakingAsset) => assets.find((a) => stakingAsset.token === a.id) !== undefined),
    "Staking assets not found",
  ).toBe(true);
});

test.each(lps)("curve pool redemption possible: $symbol ($name): $id", async (asset) => {
  try {
    // check if single assets redemptions is possible
    const result = await calcWithdrawOneCoin(client, {
      curvePool: asset.pool,
      amount: 10n ** BigInt(asset.decimals),
      index: 0n,
    });

    expect(result).toBeTruthy();
  } catch {
    // if single assets redemptions is not possible, check if all underlying assets are in our asset universe,
    // so the user have possibility to redeem all of the underlying assets tokens at once.

    const assetsInTheUniverse = asset.underlyings
      .map((underlying) => {
        try {
          return environment.getAsset(underlying).registered;
        } catch {
          return false;
        }
      })
      .filter(Boolean);

    expect(
      assetsInTheUniverse.length,
      "Not all underlying assets are in the asset universe, so the user can't redeem all of the underlying assets tokens at once",
    ).toBe(asset.underlyings.length);
  }
});

test.skip("empty test suite fallback");
