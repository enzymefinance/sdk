import type { Hex } from "viem";
import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";
import type { PartialPick } from "../../utils/types.js";

export const performanceFeeSettingsEncoding = [
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

export type EncodePerformanceFeeSettingsArgs = PartialPick<PerformanceFeeSettings, "feeRecipient">;

export function encodePerformanceFeeSettings({
  feeRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: EncodePerformanceFeeSettingsArgs): Hex {
  return encodeAbiParameters(performanceFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}

export function decodePerformanceFeeSettings(settings: Hex): PerformanceFeeSettings {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(performanceFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}
