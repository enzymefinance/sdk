import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";
import { calculateAmountDueForScaledPerSecondRate, convertRateToScaledPerSecondRate } from "../../utils/rates.js";

export const managementFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // scaled per second
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export interface ManagementFeeSettings {
  scaledPerSecondRate: bigint;
  feeRecipient: Address;
}

export type EncodeManagementFeeSettingsArgs = {
  feeRecipient?: Address;
} & (
  | {
      perAnnumRateInBps?: never;
      scaledPerSecondRate: bigint;
    }
  | {
      perAnnumRateInBps: bigint;
      scaledPerSecondRate?: never;
    }
);

export function encodeManagementFeeSettings({
  scaledPerSecondRate,
  perAnnumRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: EncodeManagementFeeSettingsArgs): Hex {
  const fee: bigint =
    scaledPerSecondRate !== undefined
      ? scaledPerSecondRate
      : convertRateToScaledPerSecondRate({
          perAnnumRateInBps,
          adjustInflation: true,
        });

  return encodeAbiParameters(managementFeeSettingsEncoding, [fee, feeRecipient]);
}

export function decodeManagementFeeSettings(settings: Hex): ManagementFeeSettings {
  const [scaledPerSecondRate, feeRecipient] = decodeAbiParameters(managementFeeSettingsEncoding, settings);

  return { scaledPerSecondRate, feeRecipient };
}

export interface CalculateManagementFeeSharesDueArgs {
  scaledPerSecondRate: bigint;
  sharesSupply: bigint;
  secondsSinceLastSettled: bigint;
}

export function calculateManagementFeeSharesDue({
  scaledPerSecondRate,
  sharesSupply,
  secondsSinceLastSettled,
}: CalculateManagementFeeSharesDueArgs) {
  return calculateAmountDueForScaledPerSecondRate({
    scaledPerSecondRate,
    totalAmount: sharesSupply,
    secondsSinceLastSettled,
  });
}
