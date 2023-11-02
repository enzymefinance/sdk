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
  recipient: Address;
};

export type EncodeSettingsParams = {
  recipient?: Address;
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
  recipient = zeroAddress,
}: EncodeSettingsParams): Hex {
  const fee: bigint =
    scaledPerSecondRate !== undefined
      ? scaledPerSecondRate
      : Rates.convertRateToScaledPerSecondRate({
          perAnnumRateInBps,
          adjustInflation: true,
        });

  return encodeAbiParameters(SettingsEncoding, [fee, recipient]);
}

export function decodeSettings(settings: Hex): Settings {
  const [scaledPerSecondRate, recipient] = decodeAbiParameters(SettingsEncoding, settings);

  return { scaledPerSecondRate, recipient };
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export async function getInfo(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    managementFee: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IManagementFee,
    functionName: "getFeeInfoForFund",
    args: [args.comptrollerProxy],
    address: args.managementFee,
  });
}
