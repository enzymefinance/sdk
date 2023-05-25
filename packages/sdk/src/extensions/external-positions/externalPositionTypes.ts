import type { KilnStakeArgs } from "./instances/kiln.js";

export type ExternalPosition = typeof ExternalPosition[keyof typeof ExternalPosition];
export const ExternalPosition = {
  KilnStake: "KilnStake",
} as const;

export type ExternalPositionArgs = {
  KilnStake: KilnStakeArgs;
};
