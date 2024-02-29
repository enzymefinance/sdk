import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

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
  recipient: Address;
};

export function encodeDirectFeeSettings({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
  recipient = zeroAddress,
}: Partial<DirectFeeSettings>): Hex {
  return encodeAbiParameters(directFeeSettingsEncoding, [inKindRateInBps, specificAssetsRate, recipient]);
}

export function decodeDirectFeeSettings(settings: Hex): DirectFeeSettings {
  const [inKindRateInBps, specificAssetsRate, recipient] = decodeAbiParameters(directFeeSettingsEncoding, settings);

  return { inKindRateInBps, specificAssetsRate, recipient };
}

export type SetRecipientParams = {
  comptrollerProxy: Address;
  fee: Address;
  recipient: Address;
};

export function setRecipient(args: SetRecipientParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IExitRateDirectFee,
    functionName: "setRecipientForFund",
    address: args.fee,
    args: [args.comptrollerProxy, args.recipient],
  });
}

//--------------------------------------------------------------------------------------------
// READ - BOTH TYPES
//--------------------------------------------------------------------------------------------

export async function getInKindRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    exitRateFee: Address;
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IExitRateBurnFee,
    functionName: "getInKindRateForFund",
    args: [args.comptrollerProxy],
    address: args.exitRateFee,
  });
}

export async function getSpecificAssetsRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    exitRateFee: Address;
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IExitRateBurnFee,
    functionName: "getSpecificAssetsRateForFund",
    args: [args.comptrollerProxy],
    address: args.exitRateFee,
  });
}
