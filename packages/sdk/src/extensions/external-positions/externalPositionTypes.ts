import type {
  AaveV2DebtAddCollateralArgs,
  AaveV2DebtBorrowArgs,
  AaveV2DebtRemoveCollateralArgs,
  AaveV2DebtRepayBorrowArgs,
} from "./instances/aaveV2Debt.js";
import type { KilnStakeArgs } from "./instances/kiln.js";

export type ExternalPosition = typeof ExternalPosition[keyof typeof ExternalPosition];
export const ExternalPosition = {
  KilnStake: "KilnStake",
  AaveV2DebtAddCollateral: "AaveV2DebtAddCollateral",
  AaveV2DebtRemoveCollateral: "AaveV2DebtRemoveCollateral",
  AaveV2DebtBorrow: "AaveV2DebtBorrow",
  AaveV2DebtRepayBorrow: "AaveV2DebtRepayBorrow",
} as const;

export type ExternalPositionArgs = {
  [ExternalPosition.KilnStake]: KilnStakeArgs;
  [ExternalPosition.AaveV2DebtAddCollateral]: AaveV2DebtAddCollateralArgs;
  [ExternalPosition.AaveV2DebtRemoveCollateral]: AaveV2DebtRemoveCollateralArgs;
  [ExternalPosition.AaveV2DebtBorrow]: AaveV2DebtBorrowArgs;
  [ExternalPosition.AaveV2DebtRepayBorrow]: AaveV2DebtRepayBorrowArgs;
};
