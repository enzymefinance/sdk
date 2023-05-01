import { ZERO_ADDRESS } from "../../constants/misc.js";
import type { PartialPick } from "../../utils/types.js";
import type { Hex } from "viem";
import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address } from "viem";

export const entranceRateBurnFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
] as const;

export type EntranceRateBurnFeeSettings = {
  feeRateInBps: bigint;
};

export function encodeEntranceRateBurnFeeSettings({ feeRateInBps }: EntranceRateBurnFeeSettings): Hex {
  return encodeAbiParameters(entranceRateBurnFeeSettingsEncoding, [feeRateInBps]);
}

export function decodeEntranceRateBurnFeeSettings(settings: Hex): EntranceRateBurnFeeSettings {
  const [feeRateInBps] = decodeAbiParameters(entranceRateBurnFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
  };
}

export const entranceRateDirectFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type EntranceRateDirectFeeSettings = {
  feeRateInBps: bigint;
  feeRecipient: Address;
};

export type EncodeEntranceRateDirectFeeSettingsArgs = PartialPick<EntranceRateDirectFeeSettings, "feeRecipient">;

export function encodeEntranceRateDirectFeeSettings({
  feeRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: EncodeEntranceRateDirectFeeSettingsArgs): Hex {
  return encodeAbiParameters(entranceRateDirectFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}

export function decodeEntranceRateDirectFeeSettings(settings: Hex): EntranceRateDirectFeeSettings {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(entranceRateDirectFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}

export type CalculateEntranceRateFeeSharesDueArgs = {
  feeRateInBps: bigint;
  sharesBought: bigint;
};

export function calculateEntranceRateFeeSharesDue({
  feeRateInBps,
  sharesBought,
}: CalculateEntranceRateFeeSharesDueArgs) {
  return (sharesBought * feeRateInBps) / 10000n;
}
