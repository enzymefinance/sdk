import type { AaveV2LendArgs, AaveV2RedeemArgs } from "./instances/aaveV2.js";
import type { AaveV3LendArgs, AaveV3RedeemArgs } from "./instances/aaveV3.js";
import type { CompoundV2LendArgs, CompoundV2RedeemArgs } from "./instances/compoundV2.js";
import type { CompoundV3ClaimRewardsArgs, CompoundV3LendArgs, CompoundV3RedeemArgs } from "./instances/compoundV3.js";
import type { IdleV4ClaimRewardsArgs, IdleV4LendArgs, IdleV4RedeemArgs } from "./instances/idleV4.js";
import type { UniswapV2LiquidityLendArgs, UniswapV2LiquidityRedeemArgs } from "./instances/uniswapV2Liquidity.js";
import type { YearnVaultV2LendArgs, YearnVaultV2RedeemArgs } from "./instances/yearnVaultV2.js";

export type Integration = typeof Integration[keyof typeof Integration];
export const Integration = {
  AaveV2Lend: "AaveV2Lend",
  AaveV2Redeem: "AaveV2Redeem",
  AaveV3Lend: "AaveV3Lend",
  AaveV3Redeem: "AaveV3Redeem",
  CompoundV2Lend: "CompoundV2Lend",
  CompoundV2Redeem: "CompoundV2Redeem",
  CompoundV3Lend: "CompoundV3Lend",
  CompoundV3Redeem: "CompoundV3Redeem",
  CompoundV3ClaimRewards: "CompoundV3ClaimRewards",
  UniswapV2LiquidityLend: "UniswapV2LiquidityLend",
  UniswapV2LiquidityRedeem: "UniswapV2LiquidityRedeem",
  YearnVaultV2Lend: "YearnVaultV2Lend",
  YearnVaultV2Redeem: "YearnVaultV2Redeem",
  IdleV4Lend: "IdleV4Lend",
  IdleV4Redeem: "IdleV4Redeem",
  IdleV4ClaimRewards: "IdleV4ClaimRewards",
} as const;

export type IntegrationArgs = {
  [Integration.AaveV2Lend]: AaveV2LendArgs;
  [Integration.AaveV2Redeem]: AaveV2RedeemArgs;
  [Integration.AaveV3Lend]: AaveV3LendArgs;
  [Integration.AaveV3Redeem]: AaveV3RedeemArgs;
  [Integration.CompoundV2Lend]: CompoundV2LendArgs;
  [Integration.CompoundV2Redeem]: CompoundV2RedeemArgs;
  [Integration.CompoundV3Lend]: CompoundV3LendArgs;
  [Integration.CompoundV3Redeem]: CompoundV3RedeemArgs;
  [Integration.CompoundV3ClaimRewards]: CompoundV3ClaimRewardsArgs;
  [Integration.UniswapV2LiquidityLend]: UniswapV2LiquidityLendArgs;
  [Integration.UniswapV2LiquidityRedeem]: UniswapV2LiquidityRedeemArgs;
  [Integration.YearnVaultV2Lend]: YearnVaultV2LendArgs;
  [Integration.YearnVaultV2Redeem]: YearnVaultV2RedeemArgs;
  [Integration.IdleV4Lend]: IdleV4LendArgs;
  [Integration.IdleV4Redeem]: IdleV4RedeemArgs;
  [Integration.IdleV4ClaimRewards]: IdleV4ClaimRewardsArgs;
};
