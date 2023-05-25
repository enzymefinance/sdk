export type PolicyHook = typeof PolicyHook[keyof typeof PolicyHook];
export const PolicyHook = {
  PostBuyShares: 0n,
  PostCallOnIntegration: 1n,
  PreTransferShares: 2n,
  RedeemSharesForSpecificAssets: 3n,
  AddTrackedAssets: 4n,
  RemoveTrackedAssets: 5n,
  CreateExternalPosition: 6n,
  PostCallOnExternalPosition: 7n,
  RemoveExternalPosition: 8n,
  ReactivateExternalPosition: 9n,
} as const;
