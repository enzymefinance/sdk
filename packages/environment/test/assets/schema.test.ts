import { expect, suite, test } from "vitest";

import { Assertion } from "@enzymefinance/sdk/Utils";
import { AssetType } from "../../src/index.js";
import { environment } from "../utils/fixtures.js";
import {
  AaveSchema,
  AaveV3Schema,
  BalancerPoolGaugeSchema,
  BalancerPoolSchema,
  CommonAssetSchema,
  CompoundSchema,
  CompoundV3Schema,
  CurvePoolGaugeSchema,
  CurvePoolLpSchema,
  ERC4626Schema,
  IdleSchema,
  MaplePoolV1Schema,
  MaplePoolV2Schema,
  PendleV2PtSchema,
  PrimitiveSchema,
  StaderSchema,
  SynthetixSchema,
  UniswapV2PoolSchema,
  YearnVaultV2Schema,
  validate,
} from "../utils/schema.js";

const assets = environment.getAssets();

suite.each(assets)("$symbol ($name): $id", (asset) => {
  test("definition matches schema", () => {
    if (validate(CommonAssetSchema, asset)) {
      switch (asset.type) {
        case AssetType.AAVE_V2: {
          validate(AaveSchema, asset);
          break;
        }
        case AssetType.AAVE_V3: {
          validate(AaveV3Schema, asset);
          break;
        }
        case AssetType.PRIMITIVE: {
          validate(PrimitiveSchema, asset);
          break;
        }
        case AssetType.STADER: {
          validate(StaderSchema, asset);
          break;
        }
        case AssetType.SYNTHETIX: {
          validate(SynthetixSchema, asset);
          break;
        }
        case AssetType.BALANCER_POOL: {
          validate(BalancerPoolSchema, asset);
          break;
        }
        case AssetType.BALANCER_POOL_GAUGE: {
          validate(BalancerPoolGaugeSchema, asset);
          break;
        }
        case AssetType.COMPOUND_V2: {
          validate(CompoundSchema, asset);
          break;
        }
        case AssetType.COMPOUND_V3: {
          validate(CompoundV3Schema, asset);
          break;
        }
        case AssetType.CURVE_POOL_GAUGE: {
          validate(CurvePoolGaugeSchema, asset);
          break;
        }
        case AssetType.CURVE_POOL_LP: {
          validate(CurvePoolLpSchema, asset);
          break;
        }
        case AssetType.YEARN_VAULT_V2: {
          validate(YearnVaultV2Schema, asset);
          break;
        }
        case AssetType.IDLE: {
          validate(IdleSchema, asset);
          break;
        }
        case AssetType.UNISWAP_V2_POOL: {
          validate(UniswapV2PoolSchema, asset);
          break;
        }
        case AssetType.MAPLE_V1: {
          validate(MaplePoolV1Schema, asset);
          break;
        }
        case AssetType.MAPLE_V2: {
          validate(MaplePoolV2Schema, asset);
          break;
        }
        case AssetType.ERC_4626: {
          validate(ERC4626Schema, asset);
          break;
        }
        case AssetType.PENDLE_V2_PT: {
          validate(PendleV2PtSchema, asset);
          break;
        }
        case AssetType.PENDLE_V2_LP: {
          validate(PendleV2PtSchema, asset);
          break;
        }
        default:
          Assertion.never(asset, "Unknown asset type.");
      }
    }
  });

  test("no duplicates", () => {
    expect(assets.filter((item) => item.id === asset.id).length).toBe(1);
  });
});
