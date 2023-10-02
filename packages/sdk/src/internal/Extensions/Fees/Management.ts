import * as Abis from "@enzymefinance/abis";
import { Rates, Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";

//--------------------------------------------------------------------------------------------
// CALCULATIONS
//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------
// SETTINGS
//--------------------------------------------------------------------------------------------

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
  feeRecipient = zeroAddress,
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

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export async function getInfo(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    performanceFee: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IManagementFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.performanceFee,
  });
}
