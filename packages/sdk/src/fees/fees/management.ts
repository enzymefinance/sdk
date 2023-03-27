import { encodePacked } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";
import { calculateAmountDueForScaledPerSecondRate, convertRateToScaledPerSecondRate } from "../../utils/rates.js";

export function encodeManagementFeeConfigArgs({
  scaledPerSecondRate,
  feeRecipient = ZERO_ADDRESS,
}: {
  scaledPerSecondRate: bigint;
  feeRecipient?: Address;
}) {
  return encodePacked(["uint256", "address"], [scaledPerSecondRate, feeRecipient]);
}

export function convertManagementFeeRateToScalederSecondRate(feeRate: bigint) {
  return convertRateToScaledPerSecondRate({
    scaledPerAnnumRate: feeRate,
    adjustInflation: true,
  });
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
