import type { AaveV2LendArgs, AaveV2RedeemArgs } from "./instances/aaveV2.js";
import type { AaveV3LendArgs, AaveV3RedeemArgs } from "./instances/aaveV3.js";
import type { CompoundV2LendArgs, CompoundV2RedeemArgs } from "./instances/compoundV2.js";
import type { CompoundV3ClaimRewardsArgs, CompoundV3LendArgs, CompoundV3RedeemArgs } from "./instances/compoundV3.js";
import type {
  ConvexCurveLpStakingClaimRewardsArgs,
  ConvexCurveLpStakingLendAndStakeArgs,
  ConvexCurveLpStakingStakeArgs,
  ConvexCurveLpStakingUnstakeAndRedeemArgs,
  ConvexCurveLpStakingUnstakeArgs,
} from "./instances/convexCurveLpStaking.js";
import type { CurveExchangeTakeOrderArgs } from "./instances/curveExchange.js";
import type {
  CurveLiquidityClaimRewardsArgs,
  CurveLiquidityLendAndStakeArgs,
  CurveLiquidityLendArgs,
  CurveLiquidityRedeemArgs,
  CurveLiquidityStakeArgs,
  CurveLiquidityUnstakeAndRedeemArgs,
  CurveLiquidityUnstakeArgs,
} from "./instances/curveLiquidity.js";
import type { ERC4626LendArgs, ERC4626RedeemArgs } from "./instances/erc4626.js";
import type { IdleV4ClaimRewardsArgs, IdleV4LendArgs, IdleV4RedeemArgs } from "./instances/idleV4.js";
import type { ParaswapV5TakeOrderArgs } from "./instances/paraswapV5.js";
import type { UniswapV2ExchangeTakeOrderArgs } from "./instances/uniswapV2Exchange.js";
import type { UniswapV2LiquidityLendArgs, UniswapV2LiquidityRedeemArgs } from "./instances/uniswapV2Liquidity.js";
import type { UniswapV3TakeOrderArgs } from "./instances/uniswapV3.js";
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
  CurveExchangeTakeOrder: "CurveExchangeTakeOrder",
  CurveLiquidityLend: "CurveLiquidityLend",
  CurveLiquidityRedeem: "CurveLiquidityRedeem",
  CurveLiquidityLendAndStake: "CurveLiquidityLendAndStake",
  CurveLiquidityUnstakeAndRedeem: "CurveLiquidityUnstakeAndRedeem",
  CurveLiquidityClaimRewards: "CurveLiquidityClaimRewards",
  CurveLiquidityUnstake: "CurveLiquidityUnstake",
  CurveLiquidityStake: "CurveLiquidityStake",
  ConvexCurveLpStakingLendAndStake: "ConvexCurveLpStakingLendAndStake",
  ConvexCurveLpStakingUnstakeAndRedeem: "ConvexCurveLpStakingUnstakeAndRedeem",
  ConvexCurveLpStakingClaimRewards: "ConvexCurveLpStakingClaimRewards",
  ConvexCurveLpStakingUnstake: "ConvexCurveLpStakingUnstake",
  ConvexCurveLpStakingStake: "ConvexCurveLpStakingStake",
  UniswapV2LiquidityLend: "UniswapV2LiquidityLend",
  UniswapV2LiquidityRedeem: "UniswapV2LiquidityRedeem",
  UniswapV3TakeOrder: "UniswapV3TakeOrder",
  UniswapV2ExchangeTakeOrder: "UniswapV2ExchangeTakeOrder",
  YearnVaultV2Lend: "YearnVaultV2Lend",
  YearnVaultV2Redeem: "YearnVaultV2Redeem",
  IdleV4Lend: "IdleV4Lend",
  IdleV4Redeem: "IdleV4Redeem",
  IdleV4ClaimRewards: "IdleV4ClaimRewards",
  ERC4626Lend: "ERC4626Lend",
  ERC4626Redeem: "ERC4626Redeem",
  ParaswapV5TakeOrder: "ParaswapV5TakeOrder",
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
  [Integration.CurveExchangeTakeOrder]: CurveExchangeTakeOrderArgs;
  [Integration.CurveLiquidityLend]: CurveLiquidityLendArgs;
  [Integration.CurveLiquidityRedeem]: CurveLiquidityRedeemArgs;
  [Integration.CurveLiquidityClaimRewards]: CurveLiquidityClaimRewardsArgs;
  [Integration.CurveLiquidityLendAndStake]: CurveLiquidityLendAndStakeArgs;
  [Integration.CurveLiquidityUnstakeAndRedeem]: CurveLiquidityUnstakeAndRedeemArgs;
  [Integration.CurveLiquidityUnstake]: CurveLiquidityUnstakeArgs;
  [Integration.CurveLiquidityStake]: CurveLiquidityStakeArgs;
  [Integration.ConvexCurveLpStakingClaimRewards]: ConvexCurveLpStakingClaimRewardsArgs;
  [Integration.ConvexCurveLpStakingLendAndStake]: ConvexCurveLpStakingLendAndStakeArgs;
  [Integration.ConvexCurveLpStakingUnstakeAndRedeem]: ConvexCurveLpStakingUnstakeAndRedeemArgs;
  [Integration.ConvexCurveLpStakingUnstake]: ConvexCurveLpStakingUnstakeArgs;
  [Integration.ConvexCurveLpStakingStake]: ConvexCurveLpStakingStakeArgs;
  [Integration.UniswapV2LiquidityLend]: UniswapV2LiquidityLendArgs;
  [Integration.UniswapV2LiquidityRedeem]: UniswapV2LiquidityRedeemArgs;
  [Integration.UniswapV3TakeOrder]: UniswapV3TakeOrderArgs;
  [Integration.UniswapV2ExchangeTakeOrder]: UniswapV2ExchangeTakeOrderArgs;
  [Integration.YearnVaultV2Lend]: YearnVaultV2LendArgs;
  [Integration.YearnVaultV2Redeem]: YearnVaultV2RedeemArgs;
  [Integration.IdleV4Lend]: IdleV4LendArgs;
  [Integration.IdleV4Redeem]: IdleV4RedeemArgs;
  [Integration.IdleV4ClaimRewards]: IdleV4ClaimRewardsArgs;
  [Integration.ERC4626Lend]: ERC4626LendArgs;
  [Integration.ERC4626Redeem]: ERC4626RedeemArgs;
  [Integration.ParaswapV5TakeOrder]: ParaswapV5TakeOrderArgs;
};
