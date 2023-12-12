import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";
import { Rates, Viem } from "../../Utils.js";

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
      perAnnumRate?: never;
      scaledPerSecondRate: bigint;
    }
  | {
      perAnnumRate: bigint;
      scaledPerSecondRate?: never;
    }
);

export function encodeSettings({
  scaledPerSecondRate,
  perAnnumRate,
  recipient = zeroAddress,
}: EncodeSettingsParams): Hex {
  const fee: bigint =
    scaledPerSecondRate !== undefined
      ? scaledPerSecondRate
      : Rates.convertRateToScaledPerSecondRate({
          perAnnumRate,
          adjustInflation: true,
        });

  return encodeAbiParameters(SettingsEncoding, [fee, recipient]);
}

export function decodeSettings(settings: Hex): Settings {
  const [scaledPerSecondRate, recipient] = decodeAbiParameters(SettingsEncoding, settings);

  return { scaledPerSecondRate, recipient };
}

export type SetRecipientParams = {
  comptrollerProxy: Address;
  fee: Address;
  recipient: Address;
};

export function setRecipient(args: SetRecipientParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IManagementFee,
    functionName: "setRecipientForFund",
    address: args.fee,
    args: [args.comptrollerProxy, args.recipient],
  });
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
