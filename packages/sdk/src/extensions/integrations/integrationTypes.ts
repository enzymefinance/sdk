import type { AaveV2LendArgs, AaveV2RedeemArgs } from "./instances/aaveV2.js";

export type Integration = typeof Integration[keyof typeof Integration];
export const Integration = {
  AaveV2Lend: "AaveV2Lend",
  AaveV2Redeem: "AaveV2Redeem",
} as const;

export type IntegrationArgs = {
  AaveV2Lend: AaveV2LendArgs;
  AaveV2Redeem: AaveV2RedeemArgs;
};