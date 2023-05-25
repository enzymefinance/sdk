export type FeeHook = typeof FeeHook[keyof typeof FeeHook];
export const FeeHook = {
  Continuous: 0n,
  PreBuyShares: 1n,
  PostBuyShares: 2n,
  PreRedeemShares: 3n,
} as const;

export type FeeManagerAction = typeof FeeManagerAction[keyof typeof FeeManagerAction];
export const FeeManagerAction = {
  InvokeContinuousHook: 0n,
  PayoutSharesOutstandingForFees: 1n,
} as const;

export type FeeSettlementType = typeof FeeSettlementType[keyof typeof FeeSettlementType];
export const FeeSettlementType = {
  /**
   * No fees are being paid.
   */
  None: 0n,
  /**
   * The fee is paid by transfering vault shares from the depositor to the fee recipient.
   */
  Direct: 1n,
  /**
   * The fee is paid by minting new vault shares for the fee recipient.
   */
  Mint: 2n,
  /**
   * The fee is paid by burning vault shares of the depositor.
   */
  Burn: 3n,
  /**
   * The fee is paid by minting new vault shares and transferring them to the vault itself.
   *
   * @deprecated This settlement type is only used in v2 and v3.
   */
  MintSharesOutstanding: 4n,
  /**
   * The fee is paid by burning vault shares held by the vault itself.
   *
   * @deprecated This settlement type is only used in v2 and v3.
   */
  BurnSharesOutstanding: 5n,
} as const;
