export type FeeHook = typeof FeeHook[keyof typeof FeeHook];
export const FeeHook = {
  Continuous: 0,
  PreBuyShares: 1,
  PostBuyShares: 2,
  PreRedeemShares: 3,
} as const;

export type FeeManagerAction = typeof FeeManagerAction[keyof typeof FeeManagerAction];
export const FeeManagerAction = {
  InvokeContinuousHook: 0,
  PayoutSharesOutstandingForFees: 1,
} as const;

export type FeeSettlementType = typeof FeeSettlementType[keyof typeof FeeSettlementType];
export const FeeSettlementType = {
  None: 0,
  Direct: 1,
  Mint: 2,
  Burn: 3,
  MintSharesOutstanding: 4,
  BurnSharesOutstanding: 5,
} as const;
