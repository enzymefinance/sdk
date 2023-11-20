export type Action = typeof Action[keyof typeof Action];
export const Action = {
  CallOnIntegration: 0n,
  AddTrackedAssets: 1n,
  RemoveTrackedAssets: 2n,
} as const;

export const Selector = {
  lend: "0x099f7515", // lend(address,bytes,bytes)
  takeOrder: "0x03e38a2b", // takeOrder(address,bytes,bytes)
} as const;
