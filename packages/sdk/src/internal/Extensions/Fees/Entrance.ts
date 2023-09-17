import { Constants, type Types } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

//----------------------------------------------------------------------------------
// CALCULATIONS
//----------------------------------------------------------------------------------

export type CalculateFeeSharesDueParams = {
  feeRateInBps: bigint;
  sharesBought: bigint;
};

export function calculateFeeSharesDue({ feeRateInBps, sharesBought }: CalculateFeeSharesDueParams) {
  return (sharesBought * feeRateInBps) / 10000n;
}

//----------------------------------------------------------------------------------
// BURN FEE SETTINGS
//----------------------------------------------------------------------------------

const burnFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
] as const;

export type BurnFeeSettings = {
  feeRateInBps: bigint;
};

export function encodeBurnFeeSettings({ feeRateInBps }: BurnFeeSettings): Hex {
  return encodeAbiParameters(burnFeeSettingsEncoding, [feeRateInBps]);
}

export function decodeBurnFeeSettings(settings: Hex): BurnFeeSettings {
  const [feeRateInBps] = decodeAbiParameters(burnFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
  };
}

//----------------------------------------------------------------------------------
// DIRECT FEE SETTINGS
//----------------------------------------------------------------------------------

const directFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type DirectFeeSettings = {
  feeRateInBps: bigint;
  feeRecipient: Address;
};

export function encodeDirectFeeSettings({
  feeRateInBps,
  feeRecipient = Constants.ZeroAddress,
}: Types.PartialPick<DirectFeeSettings, "feeRecipient">): Hex {
  return encodeAbiParameters(directFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}

export function decodeDirectFeeSettings(settings: Hex): DirectFeeSettings {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(directFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}