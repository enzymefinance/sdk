import { Asset } from "@enzymefinance/sdk";
import { isAddressEqual } from "viem";
import { expect, suite, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { readTokensFromMarket } from "../utils/contracts/PendleV2Tokens.js";
import { getApiVersion } from "../utils/contracts/YearnVaultToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const assets = environment.getAssets();

suite.each(assets)("$symbol ($name): $id", (asset) => {
  test("defined decimals matches on-chain decimals", async () => {
    await expect(
      Asset.getDecimals(client, { asset: asset.id }),
      `Decimals for ${asset.symbol} (${asset.name}) are not defined in the environment`,
    ).resolves.toBe(BigInt(asset.decimals));
  });

  test.skipIf(symbolExceptions.includes(asset.symbol))("defined symbol matches on-chain symbol", async () => {
    switch (asset.type) {
      case AssetType.PENDLE_V2_LP: {
        const pendleV2LpAsset = environment.getAssetAs(asset.id, asset.type);
        const { pt } = await readTokensFromMarket(client, { market: pendleV2LpAsset.id });

        const ptSymbol = await Asset.getSymbol(client, { asset: pt });

        expect(asset.symbol, "Symbol for Pendle LP token is not defined correctly in the environment").toEqual(
          ptSymbol.replace("PT", "LP"),
        );
        break;
      }
      case AssetType.ENZYME_VAULT: {
        // We don't validate Enzyme Vaults symbol, as they can change.
        // For example when Cointerminal update Vaults campaigns
        break;
      }
      default: {
        await expect(
          Asset.getSymbol(client, { asset: asset.id }),
          `Symbol for ${asset.name} (${asset.id}) is not defined in the environment`,
        ).resolves.toBe(asset.symbol);
      }
    }
  });

  test("asset id is unique", () => {
    expect(
      assets.filter(({ id }) => isAddressEqual(asset.id, id)).length,
      `Asset id ${asset.id} is not unique in the environment`,
    ).toBe(1);
  });

  test.skipIf(nameExceptions.includes(asset.name))("defined name matches on-chain name", async () => {
    switch (asset.type) {
      case AssetType.AAVE_V2: {
        const partsAave = asset.name.match(/^Aave (.+)$/);

        const onChainPartsAave = (await Asset.getName(client, { asset: asset.id })).match(
          /^(?:(?:Aave interest bearing)|(?:Aave Matic Market))\s(.+)$/,
        );

        expect(partsAave?.[1], `Name for ${asset.symbol} (${asset.id}) is not defined in the environment`).toEqual(
          onChainPartsAave?.[1],
        );
        break;
      }

      case AssetType.UNISWAP_V2_POOL: {
        const uniswapV2Asset = environment.getAssetAs(asset.id, asset.type);
        const token0 = environment.getAsset(uniswapV2Asset.underlyings[0]);
        const token1 = environment.getAsset(uniswapV2Asset.underlyings[1]);

        const symbol0 = token0.symbol === "WETH" ? "ETH" : token0.symbol;
        const symbol1 = token1.symbol === "WETH" ? "ETH" : token1.symbol;

        expect(asset.name, "Name for Uniswap pool is not defined correctly in the environment").toEqual(
          `Uniswap ${symbol0}/${symbol1} Pool`,
        );
        break;
      }

      case AssetType.PENDLE_V2_LP: {
        const pendleV2LpAsset = environment.getAssetAs(asset.id, asset.type);
        const { pt } = await readTokensFromMarket(client, { market: pendleV2LpAsset.id });

        const ptName = await Asset.getName(client, { asset: pt });

        expect(asset.name, "Name for Pendle LP token is not defined correctly in the environment").toEqual(
          ptName.replace("PT", "LP"),
        );
        break;
      }

      case AssetType.YEARN_VAULT_V2: {
        const partsYearn = asset.name.match(/^(.+ yVault) (\d\.\d\.\d)$/);
        const onChainName = await Asset.getName(client, { asset: asset.id });
        expect(partsYearn?.[1], "Name for Yearn vault is not defined correctly in the environment").toEqual(
          onChainName,
        );

        const onChainVersion = await getApiVersion(client, { yearnVault: asset.id });
        expect(partsYearn?.[2]).toEqual(onChainVersion);
        break;
      }

      case AssetType.ENZYME_VAULT: {
        // We don't validate Enzyme Vaults names, as they can change.
        // For example when Cointerminal update Vaults campaigns
        break;
      }

      default:
        await expect(Asset.getName(client, { asset: asset.id })).resolves.toBe(asset.name);
    }
  });
});

test.skip("empty test suite fallback");

// Symbols and names to skip when we deviate from on-chain values
const symbolExceptions = [
  "KNCL", // onchain value: KNC -> keep to differentiate from new token
  "FTT", // onchain value: FTX Token -> keep, name/symbol seems to be interchanged
  "USDC.e", // onchain value: USDC -> keep, to differentiate from native USDC
  "aWBTC", // onchain value: ATOKEN_IMPL  -> remove
];

const nameExceptions = [
  "Aave MANA v1", // onchain value: Aave interest bearing MANA -> keep to differentiate
  "Aave MANA v2", // onchain value: Aave interest bearing MANA -> keep to differentiate
  "Alameda Research - USDC", // onchain value: Maple Pool Token -> keep to differentiate
  "Balancer 50OHM-25DAI-25WETH", // onchain value: 50OHM-25DAI-25WETH -> keep (Balancer inconsistency)
  "BlockTower Capital - USDC01", // onchain value: Maple Pool Token -> keep to differentiate
  "Celsius wETH Pool", // onchain value: Maple Pool Token -> keep to differentiate
  "Enzyme", // onchain value: Melon -> keep
  "FTX Token (FTT)", // onchain value: FTT -> keep, name/symbol seems to be interchanged
  "Kyber Network Crystal Legacy", // onchain value: Kyber Network Crystal -> keep to differentiate from new token
  "Maven 11 - USDC 01", // onchain value: Maple Pool Token -> keep to differentiate
  "Maven 11 WETH Pool", // onchain value: Maple Pool Token -> keep to differentiate
  "Enzyme (PoS)", // onchain value: Melon Token (PoS) -> keep to differentiate
  "Orthogonal Trading - USDC01", // onchain value: Maple Pool Token -> keep to differentiate
  "Aave WBTC", // onchain value: Aave WBTC -> remove
];
