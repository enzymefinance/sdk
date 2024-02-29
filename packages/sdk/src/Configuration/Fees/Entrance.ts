import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { type Types, Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// CALCULATIONS
//--------------------------------------------------------------------------------------------

export type CalculateFeeSharesDueParams = {
  rateInBps: bigint;
  sharesBought: bigint;
};

export function calculateFeeSharesDue({ rateInBps, sharesBought }: CalculateFeeSharesDueParams) {
  return (sharesBought * rateInBps) / 10000n;
}

//--------------------------------------------------------------------------------------------
// BURN FEE SETTINGS
//--------------------------------------------------------------------------------------------

const burnFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
] as const;

export type BurnFeeSettings = {
  rateInBps: bigint;
};

export function encodeBurnFeeSettings({ rateInBps }: BurnFeeSettings): Hex {
  return encodeAbiParameters(burnFeeSettingsEncoding, [rateInBps]);
}

export function decodeBurnFeeSettings(settings: Hex): BurnFeeSettings {
  const [rateInBps] = decodeAbiParameters(burnFeeSettingsEncoding, settings);

  return {
    rateInBps,
  };
}

//--------------------------------------------------------------------------------------------
// DIRECT FEE SETTINGS
//--------------------------------------------------------------------------------------------

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
  rateInBps: bigint;
  recipient: Address;
};

export function encodeDirectFeeSettings({
  rateInBps,
  recipient = zeroAddress,
}: Types.PartialPick<DirectFeeSettings, "recipient">): Hex {
  return encodeAbiParameters(directFeeSettingsEncoding, [rateInBps, recipient]);
}

export function decodeDirectFeeSettings(settings: Hex): DirectFeeSettings {
  const [rateInBps, recipient] = decodeAbiParameters(directFeeSettingsEncoding, settings);

  return {
    rateInBps,
    recipient,
  };
}

export type SetRecipientParams = {
  comptrollerProxy: Address;
  fee: Address;
  recipient: Address;
};

export function setRecipient(args: SetRecipientParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IEntranceRateDirectFee,
    functionName: "setRecipientForFund",
    address: args.fee,
    args: [args.comptrollerProxy, args.recipient],
  });
}

//--------------------------------------------------------------------------------------------
// READ - BOTH TYPES
//--------------------------------------------------------------------------------------------

export async function getRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    entranceRateFee: Address;
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IEntranceRateBurnFee,
    functionName: "getRateForFund",
    args: [args.comptrollerProxy],
    address: args.entranceRateFee,
  });
}
