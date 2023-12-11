import * as Abis from "@enzymefinance/abis";
import {
  type Address,
  Chain,
  type Hex,
  type PublicClient,
  Transport,
  decodeAbiParameters,
  encodeAbiParameters,
  zeroAddress,
} from "viem";
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

//--------------------------------------------------------------------------------------------
// READ - BOTH TYPES
//--------------------------------------------------------------------------------------------

export async function getInKindRate<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    exitRateFee: Address;
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IExitRateBurnFee,
    functionName: "getInKindRateForFund",
    args: [args.comptrollerProxy],
    address: args.exitRateFee,
  });
}

export async function getSpecificAssetsRate<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    exitRateFee: Address;
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IExitRateBurnFee,
    functionName: "getSpecificAssetsRateForFund",
    args: [args.comptrollerProxy],
    address: args.exitRateFee,
  });
}
