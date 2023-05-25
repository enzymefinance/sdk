import { ZERO_ADDRESS } from "../../../constants/misc.js";
import { calculateAmountDueForScaledPerSecondRate, convertRateToScaledPerSecondRate } from "../../../utils/rates.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

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

export type ManagementFeeSettings = {
  scaledPerSecondRate: bigint;
  feeRecipient: Address;
};

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

export type CalculateManagementFeeSharesDueArgs = {
  scaledPerSecondRate: bigint;
  sharesSupply: bigint;
  secondsSinceLastSettled: bigint;
};

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
