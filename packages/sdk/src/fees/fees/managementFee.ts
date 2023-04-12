import { encodeAbiParameters } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";
import { calculateAmountDueForScaledPerSecondRate, convertRateToScaledPerSecondRate } from "../../utils/rates.js";

export const managementFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate",
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type ManagementFeeSettings = {
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
}: ManagementFeeSettings) {
  const fee: bigint =
    scaledPerSecondRate !== undefined
      ? scaledPerSecondRate
      : convertRateToScaledPerSecondRate({
          perAnnumRateInBps,
          adjustInflation: true,
        });

  return encodeAbiParameters(managementFeeSettingsEncoding, [fee, feeRecipient]);
}

export function calculateManagementFeeSharesDue({
  scaledPerSecondRate,
  sharesSupply,
  secondsSinceLastSettled,
}: {
  scaledPerSecondRate: bigint;
  sharesSupply: bigint;
  secondsSinceLastSettled: bigint;
}) {
  return calculateAmountDueForScaledPerSecondRate({
    scaledPerSecondRate,
    totalAmount: sharesSupply,
    secondsSinceLastSettled,
  });
}
