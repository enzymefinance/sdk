import {
  CLAIM_REWARDS_SELECTOR,
  LEND_AND_STAKE_SELECTOR,
  LEND_SELECTOR,
  REDEEM_SELECTOR,
  STAKE_SELECTOR,
  TAKE_ORDER_SELECTOR,
  UNSTAKE_AND_REDEEM_SELECTOR,
  UNSTAKE_SELECTOR,
} from "../../../constants/selectors.js";
import type { Prettify } from "../../../utils/types.js";
import { IntegrationManagerActionId, prepareCallOnExtensionParams } from "../../callOnExtension.js";
import { encodeCallOnIntegrationArgs } from "../callOnIntegration/callOnIntegration.js";
import { encodeAaveV2LendArgs, encodeAaveV2RedeemArgs } from "../instances/aaveV2.js";
import { encodeAaveV3LendArgs, encodeAaveV3RedeemArgs } from "../instances/aaveV3.js";
import { encodeCompoundV2LendArgs, encodeCompoundV2RedeemArgs } from "../instances/compoundV2.js";
import {
  encodeCompoundV3ClaimRewardsArgs,
  encodeCompoundV3LendArgs,
  encodeCompoundV3RedeemArgs,
} from "../instances/compoundV3.js";
import {
  encodeCurveLiquidityClaimRewardsArgs,
  encodeCurveLiquidityLendAndStakeArgs,
  encodeCurveLiquidityLendArgs,
  encodeCurveLiquidityRedeemArgs,
  encodeCurveLiquidityStakeArgs,
  encodeCurveLiquidityUnstakeAndRedeemArgs,
  encodeCurveLiquidityUnstakeArgs,
} from "../instances/curveLiquidity.js";
import { encodeIdleV4ClaimRewardsArgs, encodeIdleV4LendArgs, encodeIdleV4RedeemArgs } from "../instances/idleV4.js";
import { encodeUniswapV2ExchangeTakeOrderArgs } from "../instances/uniswapV2Exchange.js";
import {
  encodeUniswapV2LiquidityLendArgs,
  encodeUniswapV2LiquidityRedeemArgs,
} from "../instances/uniswapV2Liquidity.js";
import { encodeUniswapV3TakeOrderArgs } from "../instances/uniswapV3.js";
import { encodeYearnVaultV2LendArgs, encodeYearnVaultV2RedeemArgs } from "../instances/yearnVaultV2.js";
import { Integration, type IntegrationArgs } from "../integrationTypes.js";
import type { Address, Hex } from "viem";

export type TypedIntegrationCallArgs = {
  [TKey in keyof IntegrationArgs]: Prettify<{ type: TKey } & IntegrationArgs[TKey]>;
}[keyof IntegrationArgs];

export type PrepareUseIntegrationParams = {
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The address of the integration adapter contract.
   */
  integrationAdapter: Address;
  /**
   * The trade to prepare.
   */
  callArgs: TypedIntegrationCallArgs;
};

/**
 * Prepare a trade to be executed via an integration adapter.
 *
 * @returns The prepared arguments to pass to the `callOnExtension` action.
 */

export function prepareUseIntegration({
  callArgs,
  integrationAdapter,
  integrationManager,
}: PrepareUseIntegrationParams) {
  const [selector, data] = encodeIntegrationCallArgs(callArgs);

  return prepareCallOnExtensionParams({
    extension: integrationManager,
    actionId: IntegrationManagerActionId.CallOnIntegration,
    callArgs: encodeCallOnIntegrationArgs({
      integrationData: data,
      adapter: integrationAdapter,
      selector,
    }),
  });
}

export function encodeIntegrationCallArgs(callArgs: TypedIntegrationCallArgs): [selector: Hex, data: Hex] {
  switch (callArgs.type) {
    case Integration.AaveV2Lend:
      return [LEND_SELECTOR, encodeAaveV2LendArgs(callArgs)];
    case Integration.AaveV2Redeem:
      return [REDEEM_SELECTOR, encodeAaveV2RedeemArgs(callArgs)];
    case Integration.AaveV3Lend:
      return [LEND_SELECTOR, encodeAaveV3LendArgs(callArgs)];
    case Integration.AaveV3Redeem:
      return [REDEEM_SELECTOR, encodeAaveV3RedeemArgs(callArgs)];
    case Integration.CompoundV2Lend:
      return [LEND_SELECTOR, encodeCompoundV2LendArgs(callArgs)];
    case Integration.CompoundV2Redeem:
      return [REDEEM_SELECTOR, encodeCompoundV2RedeemArgs(callArgs)];
    case Integration.CompoundV3Lend:
      return [LEND_SELECTOR, encodeCompoundV3LendArgs(callArgs)];
    case Integration.CompoundV3Redeem:
      return [REDEEM_SELECTOR, encodeCompoundV3RedeemArgs(callArgs)];
    case Integration.CompoundV3ClaimRewards:
      return [CLAIM_REWARDS_SELECTOR, encodeCompoundV3ClaimRewardsArgs(callArgs)];
    case Integration.CurveLiquidityLend:
      return [LEND_SELECTOR, encodeCurveLiquidityLendArgs(callArgs)];
    case Integration.CurveLiquidityRedeem:
      return [REDEEM_SELECTOR, encodeCurveLiquidityRedeemArgs(callArgs)];
    case Integration.CurveLiquidityClaimRewards:
      return [CLAIM_REWARDS_SELECTOR, encodeCurveLiquidityClaimRewardsArgs(callArgs)];
    case Integration.CurveLiquidityLendAndStake:
      return [LEND_AND_STAKE_SELECTOR, encodeCurveLiquidityLendAndStakeArgs(callArgs)];
    case Integration.CurveLiquidityUnstakeAndRedeem:
      return [UNSTAKE_AND_REDEEM_SELECTOR, encodeCurveLiquidityUnstakeAndRedeemArgs(callArgs)];
    case Integration.CurveLiquidityStake:
      return [STAKE_SELECTOR, encodeCurveLiquidityStakeArgs(callArgs)];
    case Integration.CurveLiquidityUnstake:
      return [UNSTAKE_SELECTOR, encodeCurveLiquidityUnstakeArgs(callArgs)];
    case Integration.UniswapV2LiquidityLend:
      return [LEND_SELECTOR, encodeUniswapV2LiquidityLendArgs(callArgs)];
    case Integration.UniswapV2LiquidityRedeem:
      return [REDEEM_SELECTOR, encodeUniswapV2LiquidityRedeemArgs(callArgs)];
    case Integration.UniswapV3TakeOrder:
      return [TAKE_ORDER_SELECTOR, encodeUniswapV3TakeOrderArgs(callArgs)];
    case Integration.UniswapV2ExchangeTakeOrder:
      return [TAKE_ORDER_SELECTOR, encodeUniswapV2ExchangeTakeOrderArgs(callArgs)];
    case Integration.YearnVaultV2Lend:
      return [LEND_SELECTOR, encodeYearnVaultV2LendArgs(callArgs)];
    case Integration.YearnVaultV2Redeem:
      return [REDEEM_SELECTOR, encodeYearnVaultV2RedeemArgs(callArgs)];
    case Integration.IdleV4Lend:
      return [LEND_SELECTOR, encodeIdleV4LendArgs(callArgs)];
    case Integration.IdleV4Redeem:
      return [REDEEM_SELECTOR, encodeIdleV4RedeemArgs(callArgs)];
    case Integration.IdleV4ClaimRewards:
      return [CLAIM_REWARDS_SELECTOR, encodeIdleV4ClaimRewardsArgs(callArgs)];
  }
}
