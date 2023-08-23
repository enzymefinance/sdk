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
import type { KilnStakeArgs } from "./instances/kiln.js";

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
};
