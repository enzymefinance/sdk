import { never } from "../../utils/assertions.js";
import type { Prettify } from "../../utils/types.js";
import { ExternalPositionManagerActionId, prepareCallOnExtensionParams } from "../callOnExtension.js";
import { ExternalPosition, type ExternalPositionArgs } from "./externalPositionTypes.js";
import {
  encodeAaveV2DebtAddCollateralArgs,
  encodeAaveV2DebtBorrowArgs,
  encodeAaveV2DebtRemoveCollateralArgs,
  encodeAaveV2DebtRepayBorrowArgs,
} from "./instances/aaveV2Debt.js";
import {
  encodeArbitraryLoanCallOnAccountingModuleArgs,
  encodeArbitraryLoanCloseLoanArgs,
  encodeArbitraryLoanConfigureLoanArgs,
  encodeArbitraryLoanReconcileArgs,
  encodeArbitraryLoanUpdateBorrowableAmountArgs,
} from "./instances/arbitraryLoan.js";
import {
  encodeCompoundV2DebtAddCollateralArgs,
  encodeCompoundV2DebtBorrowArgs,
  encodeCompoundV2DebtClaimCompArgs,
  encodeCompoundV2DebtRemoveCollateralArgs,
  encodeCompoundV2DebtRepayBorrowArgs,
} from "./instances/compoundV2Debt.js";
import {
  encodeConvexVotingClaimRewardsArgs,
  encodeConvexVotingDelegateArgs,
  encodeConvexVotingLockArgs,
  encodeConvexVotingRelockArgs,
  encodeConvexVotingWithdrawArgs,
} from "./instances/convexVoting.js";
import {
  encodeKilnClaimFeesArgs,
  encodeKilnPausePositionValueArgs,
  encodeKilnStakeArgs,
  encodeKilnSweepEthArgs,
  encodeKilnUnpausePositionValueArgs,
  encodeKilnUnstakeArgs,
} from "./instances/kiln.js";
import {
  encodeLiquityDebtPositionAddCollateralArgs,
  encodeLiquityDebtPositionBorrowArgs,
  encodeLiquityDebtPositionOpenTroveArgs,
  encodeLiquityDebtPositionRemoveCollateralArgs,
  encodeLiquityDebtPositionRepayBorrowArgs,
} from "./instances/liquity.js";
import {
  encodeMapleLiquidityCancelRedeemV2Args,
  encodeMapleLiquidityClaimRewardsV1Args,
  encodeMapleLiquidityLendV2Args,
  encodeMapleLiquidityRedeemV2Args,
  encodeMapleLiquidityRequestRedeemV2Args,
} from "./instances/mapleLiquidity.js";
import {
  encodeTheGraphDelegationDelegateArgs,
  encodeTheGraphDelegationUndelegateArgs,
  encodeTheGraphDelegationWithdrawArgs,
} from "./instances/theGraphDelegation.js";
import {
  encodeUniswapV3LiquidityAddLiquidityArgs,
  encodeUniswapV3LiquidityCollectArgs,
  encodeUniswapV3LiquidityMintArgs,
  encodeUniswapV3LiquidityPurgeArgs,
  encodeUniswapV3LiquidityRemoveLiquidityArgs,
} from "./instances/uniswapV3Liquidity.js";
import type { Address } from "viem";

export type TypedExternalPositionCallArgs = {
  [TKey in keyof ExternalPositionArgs]: Prettify<{ type: TKey } & ExternalPositionArgs[TKey]>;
}[keyof ExternalPositionArgs];

export type PrepareUseExternalPositionParams = {
  /**
   * The address of the `externalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The trade to prepare.
   */
  callArgs: TypedExternalPositionCallArgs;
};

export function prepareUseExternalPosition({ callArgs, externalPositionManager }: PrepareUseExternalPositionParams) {
  return prepareCallOnExtensionParams({
    extension: externalPositionManager,
    actionId: ExternalPositionManagerActionId.CallOnExternalPosition,
    callArgs: encodeExternalPositionCallArgs(callArgs),
  });
}

export function encodeExternalPositionCallArgs(callArgs: TypedExternalPositionCallArgs) {
  switch (callArgs.type) {
    case ExternalPosition.KilnClaimFees:
      return encodeKilnClaimFeesArgs(callArgs);
    case ExternalPosition.KilnStake:
      return encodeKilnStakeArgs(callArgs);
    case ExternalPosition.KilnUnstake:
      return encodeKilnUnstakeArgs(callArgs);
    case ExternalPosition.KilnSweepEth:
      return encodeKilnSweepEthArgs(callArgs);
    case ExternalPosition.KilnPausePositionValue:
      return encodeKilnPausePositionValueArgs(callArgs);
    case ExternalPosition.KilnUnpausePositionValue:
      return encodeKilnUnpausePositionValueArgs(callArgs);
    case ExternalPosition.AaveV2DebtAddCollateral:
      return encodeAaveV2DebtAddCollateralArgs(callArgs);
    case ExternalPosition.AaveV2DebtRemoveCollateral:
      return encodeAaveV2DebtRemoveCollateralArgs(callArgs);
    case ExternalPosition.AaveV2DebtBorrow:
      return encodeAaveV2DebtBorrowArgs(callArgs);
    case ExternalPosition.AaveV2DebtRepayBorrow:
      return encodeAaveV2DebtRepayBorrowArgs(callArgs);
    case ExternalPosition.ArbitraryLoanConfigureLoan:
      return encodeArbitraryLoanConfigureLoanArgs(callArgs);
    case ExternalPosition.ArbitraryLoanUpdateBorrowableAmount:
      return encodeArbitraryLoanUpdateBorrowableAmountArgs(callArgs);
    case ExternalPosition.ArbitraryLoanCallOnAccountingModule:
      return encodeArbitraryLoanCallOnAccountingModuleArgs(callArgs);
    case ExternalPosition.ArbitraryLoanReconcile:
      return encodeArbitraryLoanReconcileArgs(callArgs);
    case ExternalPosition.ArbitraryLoanCloseLoan:
      return encodeArbitraryLoanCloseLoanArgs(callArgs);
    case ExternalPosition.CompoundV2DebtAddCollateral:
      return encodeCompoundV2DebtAddCollateralArgs(callArgs);
    case ExternalPosition.CompoundV2DebtClaimComp:
      return encodeCompoundV2DebtClaimCompArgs(callArgs);
    case ExternalPosition.CompoundV2DebtRemoveCollateral:
      return encodeCompoundV2DebtRemoveCollateralArgs(callArgs);
    case ExternalPosition.CompoundV2DebtBorrow:
      return encodeCompoundV2DebtBorrowArgs(callArgs);
    case ExternalPosition.CompoundV2DebtRepayBorrow:
      return encodeCompoundV2DebtRepayBorrowArgs(callArgs);
    case ExternalPosition.ConvexVotingLock:
      return encodeConvexVotingLockArgs(callArgs);
    case ExternalPosition.ConvexVotingRelock:
      return encodeConvexVotingRelockArgs(callArgs);
    case ExternalPosition.ConvexVotingWithdraw:
      return encodeConvexVotingWithdrawArgs(callArgs);
    case ExternalPosition.ConvexVotingClaimRewards:
      return encodeConvexVotingClaimRewardsArgs(callArgs);
    case ExternalPosition.ConvexVotingDelegate:
      return encodeConvexVotingDelegateArgs(callArgs);
    case ExternalPosition.LiquityDebtPositionAddCollateral:
      return encodeLiquityDebtPositionAddCollateralArgs(callArgs);
    case ExternalPosition.LiquityDebtPositionBorrow:
      return encodeLiquityDebtPositionBorrowArgs(callArgs);
    case ExternalPosition.LiquityDebtPositionOpenTrove:
      return encodeLiquityDebtPositionOpenTroveArgs(callArgs);
    case ExternalPosition.LiquityDebtPositionRemoveCollateral:
      return encodeLiquityDebtPositionRemoveCollateralArgs(callArgs);
    case ExternalPosition.LiquityDebtPositionRepayBorrow:
      return encodeLiquityDebtPositionRepayBorrowArgs(callArgs);
    case ExternalPosition.TheGraphDelegationDelegate:
      return encodeTheGraphDelegationDelegateArgs(callArgs);
    case ExternalPosition.TheGraphDelegationUndelegate:
      return encodeTheGraphDelegationUndelegateArgs(callArgs);
    case ExternalPosition.TheGraphDelegationWithdraw:
      return encodeTheGraphDelegationWithdrawArgs(callArgs);
    case ExternalPosition.MapleLiquidityClaimRewardsV1:
      return encodeMapleLiquidityClaimRewardsV1Args(callArgs);
    case ExternalPosition.MapleLiquidityLendV2:
      return encodeMapleLiquidityLendV2Args(callArgs);
    case ExternalPosition.MapleLiquidityRequestRedeemV2:
      return encodeMapleLiquidityRequestRedeemV2Args(callArgs);
    case ExternalPosition.MapleLiquidityRedeemV2:
      return encodeMapleLiquidityRedeemV2Args(callArgs);
    case ExternalPosition.MapleLiquidityCancelRedeemV2:
      return encodeMapleLiquidityCancelRedeemV2Args(callArgs);
    case ExternalPosition.UniswapV3LiquidityMint:
      return encodeUniswapV3LiquidityMintArgs(callArgs);
    case ExternalPosition.UniswapV3LiquidityAddLiquidity:
      return encodeUniswapV3LiquidityAddLiquidityArgs(callArgs);
    case ExternalPosition.UniswapV3LiquidityRemoveLiquidity:
      return encodeUniswapV3LiquidityRemoveLiquidityArgs(callArgs);
    case ExternalPosition.UniswapV3LiquidityCollect:
      return encodeUniswapV3LiquidityCollectArgs(callArgs);
    case ExternalPosition.UniswapV3LiquidityPurge:
      return encodeUniswapV3LiquidityPurgeArgs(callArgs);
    default: {
      never(callArgs, "Unknown external position type");
    }
  }
}
