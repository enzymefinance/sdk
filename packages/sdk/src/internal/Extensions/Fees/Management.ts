import { Constants, Rates } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

//----------------------------------------------------------------------------------
// CALCULATIONS
//----------------------------------------------------------------------------------

export type CalculateSharesDueParams = {
  scaledPerSecondRate: bigint;
  sharesSupply: bigint;
  secondsSinceLastSettled: bigint;
};

export function calculateSharesDue({
  scaledPerSecondRate,
  sharesSupply,
  secondsSinceLastSettled,
}: CalculateSharesDueParams) {
  return Rates.calculateAmountDueForScaledPerSecondRate({
    scaledPerSecondRate,
    totalAmount: sharesSupply,
    secondsSinceLastSettled,
  });
}

//----------------------------------------------------------------------------------
// SETTINGS
//----------------------------------------------------------------------------------

const SettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // scaled per second
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type Settings = {
  scaledPerSecondRate: bigint;
  feeRecipient: Address;
};

export type EncodeSettingsParams = {
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

export function encodeSettings({
  scaledPerSecondRate,
  perAnnumRateInBps,
  feeRecipient = Constants.ZeroAddress,
}: EncodeSettingsParams): Hex {
  const fee: bigint =
    scaledPerSecondRate !== undefined
      ? scaledPerSecondRate
      : Rates.convertRateToScaledPerSecondRate({
          perAnnumRateInBps,
          adjustInflation: true,
        });

  return encodeAbiParameters(SettingsEncoding, [fee, feeRecipient]);
}

export function decodeSettings(settings: Hex): Settings {
  const [scaledPerSecondRate, feeRecipient] = decodeAbiParameters(SettingsEncoding, settings);

  return { scaledPerSecondRate, feeRecipient };
}
