import { Constants, type Types } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

//----------------------------------------------------------------------------------
// SETTINGS
//----------------------------------------------------------------------------------

const performanceFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate", // bps
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export type PerformanceFeeSettings = {
  feeRateInBps: bigint;
  feeRecipient: Address;
};

export function encodePerformanceFeeSettings({
  feeRateInBps,
  feeRecipient = Constants.ZeroAddress,
}: Types.PartialPick<PerformanceFeeSettings, "feeRecipient">): Hex {
  return encodeAbiParameters(performanceFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}

export function decodePerformanceFeeSettings(settings: Hex): PerformanceFeeSettings {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(performanceFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}
