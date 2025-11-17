import { expect } from "vitest";
import { z } from "zod";

import { Erc4626Protocol } from "../../src/assets.js";
import type { Address } from "../../src/index.js";
import { AssetType, CurvePoolTemplate, CurveStakingType, Network } from "../../src/index.js";
import { PriceFeedType } from "../../src/price-feeds.js";

const address = z.string().regex(/^0x[0-9a-f]{40}$/) as z.Schema<Address>;

export const CommonAssetSchema = z.object({
  decimals: z.number().int().min(0).max(18),
  id: address,
  name: z.string(),
  network: z.nativeEnum(Network),
  symbol: z.string(),
  type: z.nativeEnum(AssetType),
  priceFeed: z
    .object({
      type: z.nativeEnum(PriceFeedType),
    })
    .optional(),
});

export const StaderSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.STADER),
});

export const SynthetixSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.SYNTHETIX),
});

export const PrimitiveSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.PRIMITIVE),
});

export const AaveSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.AAVE_V2),
  underlying: address,
});

export const AaveV3Schema = CommonAssetSchema.extend({
  type: z.literal(AssetType.AAVE_V3),
  underlying: address,
});

export const CompoundSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.COMPOUND_V2),
  underlying: address,
});

export const CompoundV3Schema = CommonAssetSchema.extend({
  type: z.literal(AssetType.COMPOUND_V3),
  underlying: address,
});

export const IdleSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.IDLE),
  underlying: address,
});

export const YearnVaultV2Schema = CommonAssetSchema.extend({
  type: z.literal(AssetType.YEARN_VAULT_V2),
  underlying: address,
});

export const UniswapV2PoolSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.UNISWAP_V2_POOL),
  underlyings: z.array(address).length(2),
});

export const MaplePoolV1Schema = CommonAssetSchema.extend({
  type: z.literal(AssetType.MAPLE_V1),
  underlying: address,
  rewardsContract: address,
});

export const MaplePoolV2Schema = CommonAssetSchema.extend({
  type: z.literal(AssetType.MAPLE_V2),
  underlying: address,
});

export const EnzymeVaultSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.ENZYME_VAULT),
});

export const ERC4626Schema = CommonAssetSchema.extend({
  type: z.literal(AssetType.ERC_4626),
  protocol: z.nativeEnum(Erc4626Protocol),
  underlying: address,
});

export const CurvePoolGaugeSchema = CommonAssetSchema.extend({
  lp: address,
  pool: address,
  template: z.nativeEnum(CurvePoolTemplate),
  type: z.literal(AssetType.CURVE_POOL_GAUGE),
  underlyings: z.array(address).min(1),
});

export const CurvePoolLpSchema = CommonAssetSchema.extend({
  gauge: address.optional(),
  pool: address,
  staking: z.array(z.object({ token: address, type: z.nativeEnum(CurveStakingType) })),
  template: z.nativeEnum(CurvePoolTemplate),
  type: z.literal(AssetType.CURVE_POOL_LP),
  underlyings: z.array(address).min(1),
});

export const PendleV2PtSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.PENDLE_V2_PT),
  underlying: address,
  markets: z.array(address).min(1),
});

export const PendleV2LpSchema = CommonAssetSchema.extend({
  type: z.literal(AssetType.PENDLE_V2_LP),
  underlying: address,
});

export const AssetSchema = z.union([
  PrimitiveSchema,
  StaderSchema,
  SynthetixSchema,
  AaveSchema,
  AaveV3Schema,
  CompoundSchema,
  IdleSchema,
  YearnVaultV2Schema,
  UniswapV2PoolSchema,
  CurvePoolGaugeSchema,
  CurvePoolLpSchema,
  ERC4626Schema,
  PendleV2PtSchema,
]);

function error(result: z.SafeParseReturnType<any, any>) {
  if (!result.success) {
    return JSON.stringify((result as z.SafeParseError<any>).error.issues, undefined, 4);
  }

  return undefined;
}

export function validate<T>(schema: z.ZodSchema<T>, asset: any): asset is T {
  const parsed = schema.safeParse(asset);

  expect(parsed.success, error(parsed)).toBeTruthy();

  return true;
}
