import { encodeAbiParameters } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";
import { calculateAmountDueForScaledPerSecondRate, convertRateToScaledPerSecondRate } from "../../utils/rates.js";

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
  let feeRate: bigint;
  if (scaledPerSecondRate !== undefined) {
    feeRate = scaledPerSecondRate;
  } else {
    feeRate = convertRateToScaledPerSecondRate({
      perAnnumRateInBps,
      adjustInflation: true,
    });
  }

  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "feeRate",
      },
      {
        type: "address",
        name: "feeRecipient",
      },
    ],
    [feeRate, feeRecipient],
  );
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
