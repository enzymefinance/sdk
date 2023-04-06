import type { Hex } from "viem";
import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export const entraceRateBurnFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate",
  },
] as const;

export function decodeEntranceRateBurnFeeSettings(settings: Hex) {
  const [feeRateInBps] = decodeAbiParameters(entraceRateBurnFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
  };
}

export function encodeEntranceRateBurnFeeSettings({ feeRateInBps }: { feeRateInBps: bigint }) {
  return encodeAbiParameters(entraceRateBurnFeeSettingsEncoding, [feeRateInBps]);
}

export const entraceRateDirectFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate",
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export function decodeEntranceRateDirectFeeSettings(settings: Hex) {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(entraceRateDirectFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}

export function encodeEntranceRateDirectFeeSettings({
  feeRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: { feeRateInBps: bigint; feeRecipient?: Address }) {
  return encodeAbiParameters(entraceRateDirectFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}

export function calculateEntranceRateFeeSharesDue({
  feeRateInBps,
  sharesBought,
}: {
  feeRateInBps: bigint;
  sharesBought: bigint;
}) {
  return (sharesBought * feeRateInBps) / 10000n;
}
