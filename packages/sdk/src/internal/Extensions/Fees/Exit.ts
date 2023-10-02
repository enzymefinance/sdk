import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";

//--------------------------------------------------------------------------------------------
// CALCULATIONS
//--------------------------------------------------------------------------------------------

export type CalculateFeeSharesDueParams = {
  feeRate: bigint;
  sharesRedeemed: bigint;
};

export function calculateFeeSharesDue({ feeRate, sharesRedeemed }: CalculateFeeSharesDueParams) {
  return (sharesRedeemed * feeRate) / 10000n;
}

//--------------------------------------------------------------------------------------------
// BURN FEE SETTINGS
//--------------------------------------------------------------------------------------------

const burnFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "inKindRate", // bps
  },
  {
    type: "uint256",
    name: "specificAssetsRate",
  },
] as const;

export type BurnFeeSettings = {
  inKindRateInBps: bigint;
  specificAssetsRate: bigint;
};

export function encodeBurnFeeSettings({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
}: Partial<BurnFeeSettings>): Hex {
  return encodeAbiParameters(burnFeeSettingsEncoding, [inKindRateInBps, specificAssetsRate]);
}

export function decodeBurnFeeSettings(settings: Hex): BurnFeeSettings {
  const [inKindRateInBps, specificAssetsRate] = decodeAbiParameters(burnFeeSettingsEncoding, settings);

  return { inKindRateInBps, specificAssetsRate };
}

//--------------------------------------------------------------------------------------------
// DIRECT FEE SETTINGS
//--------------------------------------------------------------------------------------------

const directFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "inKindRate",
  },
  {
    type: "uint256",
    name: "specificAssetsRate",
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type DirectFeeSettings = {
  inKindRateInBps: bigint;
  specificAssetsRate: bigint;
  feeRecipient: Address;
};

export function encodeDirectFeeSettings({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
  feeRecipient = zeroAddress,
}: Partial<DirectFeeSettings>): Hex {
  return encodeAbiParameters(directFeeSettingsEncoding, [inKindRateInBps, specificAssetsRate, feeRecipient]);
}

export function decodeDirectFeeSettings(settings: Hex): DirectFeeSettings {
  const [inKindRateInBps, specificAssetsRate, feeRecipient] = decodeAbiParameters(directFeeSettingsEncoding, settings);

  return { inKindRateInBps, specificAssetsRate, feeRecipient };
}
