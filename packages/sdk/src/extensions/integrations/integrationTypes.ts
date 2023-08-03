import type { AaveV2LendArgs, AaveV2RedeemArgs } from "./instances/aaveV2.js";
import type { AaveV3LendArgs, AaveV3RedeemArgs } from "./instances/aaveV3.js";
import type { CompoundV2LendArgs, CompoundV2RedeemArgs } from "./instances/compoundV2.js";

export type Integration = typeof Integration[keyof typeof Integration];
export const Integration = {
  AaveV2Lend: "AaveV2Lend",
  AaveV2Redeem: "AaveV2Redeem",
  AaveV3Lend: "AaveV3Lend",
  AaveV3Redeem: "AaveV3Redeem",
  CompoundV2Lend: "CompoundV2Lend",
  CompoundV2Redeem: "CompoundV2Redeem",
} as const;

export type IntegrationArgs = {
  [Integration.AaveV2Lend]: AaveV2LendArgs;
  [Integration.AaveV2Redeem]: AaveV2RedeemArgs;
  [Integration.AaveV3Lend]: AaveV3LendArgs;
  [Integration.AaveV3Redeem]: AaveV3RedeemArgs;
  [Integration.CompoundV2Lend]: CompoundV2LendArgs;
  [Integration.CompoundV2Redeem]: CompoundV2RedeemArgs;
};
