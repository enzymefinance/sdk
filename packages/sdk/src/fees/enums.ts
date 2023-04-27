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
  /**
   * No fees are being paid.
   */
  None: 0,
  /**
   * The fee is paid by transfering vault shares from the depositor to the fee recipient.
   */
  Direct: 1,
  /**
   * The fee is paid by minting new vault shares for the fee recipient.
   */
  Mint: 2,
  /**
   * The fee is paid by burning vault shares of the depositor.
   */
  Burn: 3,
  /**
   * The fee is paid by minting new vault shares and transferring them to the vault itself.
   * @remarks Only used in v2 and v3. 
   * @deprecated
   */
  MintSharesOutstanding: 4,
  /**
   * The fee is paid by burning vault shares held by the vault itself.
   * @remarks Only used in v2 and v3. 
   * @deprecated
   */
  BurnSharesOutstanding: 5,
} as const;
