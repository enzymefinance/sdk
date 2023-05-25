// TODO: Move these to their respective directories once we have a better idea of how to organize them.

export type RateAsset = typeof RateAsset[keyof typeof RateAsset];
export const RateAsset = {
  ETH: 0,
  USD: 1,
} as const;

export type VaultAction = typeof VaultAction[keyof typeof VaultAction];
export const VaultAction = {
  None: 0,
  // Shares management
  BurnShares: 1,
  MintShares: 2,
  TransferShares: 3,
  // Asset management
  AddTrackedAsset: 4,
  ApproveAssetSpender: 5,
  RemoveTrackedAsset: 6,
  WithdrawAssetTo: 7,
  // External position management
  AddExternalPosition: 8,
  CallOnExternalPosition: 9,
  RemoveExternalPosition: 10,
} as const;

export type ListUpdateType = typeof ListUpdateType[keyof typeof ListUpdateType];
export const ListUpdateType = {
  None: 0,
  AddOnly: 1,
  RemoveOnly: 2,
  AddAndRemove: 3,
} as const;

export type MigrationOutHook = typeof MigrationOutHook[keyof typeof MigrationOutHook];
export const MigrationOutHook = {
  PreSignal: 0,
  PostSignal: 1,
  PreMigrate: 2,
  PostMigrate: 3,
  PostCancel: 4,
} as const;
