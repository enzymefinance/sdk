import { encodeAbiParameters } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";
import { calculateAmountDueForScaledPerSecondRate, convertRateToScaledPerSecondRate } from "../../utils/rates.js";

type ManagementFeeConfig = {
  feeRecipient?: Address;
} & (
  | {
      scaledPerAnnumRate?: never;
      scaledPerSecondRate: bigint;
    }
  | {
      scaledPerAnnumRate: bigint;
      scaledPerSecondRate?: never;
    }
);

export function encodeManagementFeeConfigArgs({
  scaledPerSecondRate,
  scaledPerAnnumRate,
  feeRecipient = ZERO_ADDRESS,
}: ManagementFeeConfig) {
  let feeRate: bigint;
  if (scaledPerSecondRate !== undefined) {
    feeRate = scaledPerSecondRate;
  } else {
    feeRate = convertRateToScaledPerSecondRate({ scaledPerAnnumRate, adjustInflation: true });
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
