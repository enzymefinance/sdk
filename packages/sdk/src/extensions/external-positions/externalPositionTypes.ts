import type {
  AaveV2DebtAddCollateralArgs,
  AaveV2DebtBorrowArgs,
  AaveV2DebtRemoveCollateralArgs,
  AaveV2DebtRepayBorrowArgs,
} from "./instances/aaveV2Debt.js";
import type {
  CompoundV2DebtAddCollateralArgs,
  CompoundV2DebtBorrowArgs,
  CompoundV2DebtClaimCompArgs,
  CompoundV2DebtRemoveCollateralArgs,
  CompoundV2DebtRepayBorrowArgs,
} from "./instances/compoundV2Debt.js";
import type {
  ConvexVotingClaimRewardsArgs,
  ConvexVotingDelegateArgs,
  ConvexVotingLockArgs,
  ConvexVotingRelockArgs,
  ConvexVotingWithdrawArgs,
} from "./instances/convexVoting.js";
import type { KilnStakeArgs } from "./instances/kiln.js";
import type {
  LiquityDebtPositionAddCollateralArgs,
  LiquityDebtPositionBorrowArgs,
  LiquityDebtPositionOpenTroveArgs,
  LiquityDebtPositionRemoveCollateralArgs,
  LiquityDebtPositionRepayBorrowArgs,
} from "./instances/liquity.js";
import type {
  MapleLiquidityCancelRedeemV2Args,
  MapleLiquidityClaimRewardsV1Args,
  MapleLiquidityLendV2Args,
  MapleLiquidityRedeemV2Args,
  MapleLiquidityRequestRedeemV2Args,
} from "./instances/mapleLiquidity.js";
import type {
  TheGraphDelegationDelegateArgs,
  TheGraphDelegationUndelegateArgs,
  TheGraphDelegationWithdrawArgs,
} from "./instances/theGraphDelegation.js";

export type ExternalPosition = typeof ExternalPosition[keyof typeof ExternalPosition];
export const ExternalPosition = {
  KilnStake: "KilnStake",
  AaveV2DebtAddCollateral: "AaveV2DebtAddCollateral",
  AaveV2DebtRemoveCollateral: "AaveV2DebtRemoveCollateral",
  AaveV2DebtBorrow: "AaveV2DebtBorrow",
  AaveV2DebtRepayBorrow: "AaveV2DebtRepayBorrow",
  CompoundV2DebtAddCollateral: "CompoundV2DebtAddCollateral",
  CompoundV2DebtClaimComp: "CompoundV2DebtClaimComp",
  CompoundV2DebtRemoveCollateral: "CompoundV2DebtRemoveCollateral",
  CompoundV2DebtBorrow: "CompoundV2DebtBorrow",
  CompoundV2DebtRepayBorrow: "CompoundV2DebtRepayBorrow",
  ConvexVotingLock: "ConvexVotingLock",
  ConvexVotingRelock: "ConvexVotingRelock",
  ConvexVotingWithdraw: "ConvexVotingWithdraw",
  ConvexVotingClaimRewards: "ConvexVotingClaimRewards",
  ConvexVotingDelegate: "ConvexVotingDelegate",
  LiquityDebtPositionAddCollateral: "LiquityDebtAddCollateral",
  LiquityDebtPositionBorrow: "LiquityDebtBorrow",
  LiquityDebtPositionOpenTrove: "LiquityDebtOpenTrove",
  LiquityDebtPositionRemoveCollateral: "LiquityDebtRemoveCollateral",
  LiquityDebtPositionRepayBorrow: "LiquityDebtRepayBorrow",
  TheGraphDelegationDelegate: "TheGraphDelegationDelegate",
  TheGraphDelegationUndelegate: "TheGraphDelegationUndelegate",
  TheGraphDelegationWithdraw: "TheGraphDelegationWithdraw",
  MapleLiquidityLendV2: "MapleLiquidityLendV2",
  MapleLiquidityRedeemV2: "MapleLiquidityRedeemV2",
  MapleLiquidityRequestRedeemV2: "MapleLiquidityRequestRedeemV2",
  MapleLiquidityCancelRedeemV2: "MapleLiquidityCancelRedeemV2",
  MapleLiquidityClaimRewardsV1: "MapleLiquidityClaimRewardsV1",
} as const;

export type ExternalPositionArgs = {
  [ExternalPosition.KilnStake]: KilnStakeArgs;
  [ExternalPosition.AaveV2DebtAddCollateral]: AaveV2DebtAddCollateralArgs;
  [ExternalPosition.AaveV2DebtRemoveCollateral]: AaveV2DebtRemoveCollateralArgs;
  [ExternalPosition.AaveV2DebtBorrow]: AaveV2DebtBorrowArgs;
  [ExternalPosition.AaveV2DebtRepayBorrow]: AaveV2DebtRepayBorrowArgs;
  [ExternalPosition.CompoundV2DebtAddCollateral]: CompoundV2DebtAddCollateralArgs;
  [ExternalPosition.CompoundV2DebtClaimComp]: CompoundV2DebtClaimCompArgs;
  [ExternalPosition.CompoundV2DebtRemoveCollateral]: CompoundV2DebtRemoveCollateralArgs;
  [ExternalPosition.CompoundV2DebtBorrow]: CompoundV2DebtBorrowArgs;
  [ExternalPosition.CompoundV2DebtRepayBorrow]: CompoundV2DebtRepayBorrowArgs;
  [ExternalPosition.ConvexVotingLock]: ConvexVotingLockArgs;
  [ExternalPosition.ConvexVotingRelock]: ConvexVotingRelockArgs;
  [ExternalPosition.ConvexVotingWithdraw]: ConvexVotingWithdrawArgs;
  [ExternalPosition.ConvexVotingClaimRewards]: ConvexVotingClaimRewardsArgs;
  [ExternalPosition.ConvexVotingDelegate]: ConvexVotingDelegateArgs;
  [ExternalPosition.LiquityDebtPositionOpenTrove]: LiquityDebtPositionOpenTroveArgs;
  [ExternalPosition.LiquityDebtPositionAddCollateral]: LiquityDebtPositionAddCollateralArgs;
  [ExternalPosition.LiquityDebtPositionBorrow]: LiquityDebtPositionBorrowArgs;
  [ExternalPosition.LiquityDebtPositionRemoveCollateral]: LiquityDebtPositionRemoveCollateralArgs;
  [ExternalPosition.LiquityDebtPositionRepayBorrow]: LiquityDebtPositionRepayBorrowArgs;
  [ExternalPosition.TheGraphDelegationDelegate]: TheGraphDelegationDelegateArgs;
  [ExternalPosition.TheGraphDelegationUndelegate]: TheGraphDelegationUndelegateArgs;
  [ExternalPosition.TheGraphDelegationWithdraw]: TheGraphDelegationWithdrawArgs;
  [ExternalPosition.MapleLiquidityLendV2]: MapleLiquidityLendV2Args;
  [ExternalPosition.MapleLiquidityRedeemV2]: MapleLiquidityRedeemV2Args;
  [ExternalPosition.MapleLiquidityRequestRedeemV2]: MapleLiquidityRequestRedeemV2Args;
  [ExternalPosition.MapleLiquidityCancelRedeemV2]: MapleLiquidityCancelRedeemV2Args;
  [ExternalPosition.MapleLiquidityClaimRewardsV1]: MapleLiquidityClaimRewardsV1Args;
};
