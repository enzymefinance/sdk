import type { AaveV2LendArgs, AaveV2RedeemArgs } from "./instances/aaveV2.js";
import type { AaveV3LendArgs, AaveV3RedeemArgs } from "./instances/aaveV3.js";
import type { CompoundV2LendArgs, CompoundV2RedeemArgs } from "./instances/compoundV2.js";
import type { CompoundV3ClaimRewardsArgs, CompoundV3LendArgs, CompoundV3RedeemArgs } from "./instances/compoundV3.js";

export type Integration = typeof Integration[keyof typeof Integration];
export const Integration = {
  AaveV2Lend: "AaveV2Lend",
  AaveV2Redeem: "AaveV2Redeem",
  AaveV3Lend: "AaveV3Lend",
  AaveV3Redeem: "AaveV3Redeem",
  CompoundV2Lend: "CompoundV2Lend",
  CompoundV2Redeem: "CompoundV2Redeem",
  CompoundV3Lend: "CompoundV3Lend",
  CompoundV3Redeem: "CompoundV3Redeem",
  CompoundV3ClaimRewards: "CompoundV3ClaimRewards",
} as const;

export type IntegrationArgs = {
  [Integration.AaveV2Lend]: AaveV2LendArgs;
  [Integration.AaveV2Redeem]: AaveV2RedeemArgs;
  [Integration.AaveV3Lend]: AaveV3LendArgs;
  [Integration.AaveV3Redeem]: AaveV3RedeemArgs;
  [Integration.CompoundV2Lend]: CompoundV2LendArgs;
  [Integration.CompoundV2Redeem]: CompoundV2RedeemArgs;
  [Integration.CompoundV3Lend]: CompoundV3LendArgs;
  [Integration.CompoundV3Redeem]: CompoundV3RedeemArgs;
  [Integration.CompoundV3ClaimRewards]: CompoundV3ClaimRewardsArgs;
};
