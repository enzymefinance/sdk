import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export const exitRateBurnFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "inKindRate", // bps
  },
  {
    type: "uint256",
    name: "specificAssetsRate",
  },
] as const;

export interface ExitRateBurnFeeSettings {
  inKindRateInBps: bigint;
  specificAssetsRate: bigint;
}

export type EncodeExitRateBurnFeeSettingsArgs = Partial<ExitRateBurnFeeSettings>;

export function encodeExitRateBurnFeeSettings({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
}: EncodeExitRateBurnFeeSettingsArgs): Hex {
  return encodeAbiParameters(exitRateBurnFeeSettingsEncoding, [inKindRateInBps, specificAssetsRate]);
}

export function decodeExitRateBurnFeeSettings(settings: Hex): ExitRateBurnFeeSettings {
  const [inKindRateInBps, specificAssetsRate] = decodeAbiParameters(exitRateBurnFeeSettingsEncoding, settings);

  return { inKindRateInBps, specificAssetsRate };
}

export const exitRateDirectFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "inKindRate",
  },
  {
    type: "uint256",
    name: "specificAssetsRate",
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export interface ExitRateDirectFeeSettings {
  inKindRateInBps: bigint;
  specificAssetsRate: bigint;
  feeRecipient: Address;
}

export type EncodeExitRateDirectFeeSettingsArgs = Partial<ExitRateDirectFeeSettings>;

export function encodeExitRateDirectFeeSettings({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
  feeRecipient = ZERO_ADDRESS,
}: EncodeExitRateDirectFeeSettingsArgs): Hex {
  return encodeAbiParameters(exitRateDirectFeeSettingsEncoding, [inKindRateInBps, specificAssetsRate, feeRecipient]);
}

export function decodeExitRateDirectFeeSettings(settings: Hex): ExitRateDirectFeeSettings {
  const [inKindRateInBps, specificAssetsRate, feeRecipient] = decodeAbiParameters(
    exitRateDirectFeeSettingsEncoding,
    settings,
  );

  return { inKindRateInBps, specificAssetsRate, feeRecipient };
}

export interface CalculateExitRateFeeSharesDueArgs {
  feeRate: bigint;
  sharesRedeemed: bigint;
}

export function calculateExitRateFeeSharesDue({ feeRate, sharesRedeemed }: CalculateExitRateFeeSharesDueArgs): bigint {
  return (sharesRedeemed * feeRate) / 10000n;
}
