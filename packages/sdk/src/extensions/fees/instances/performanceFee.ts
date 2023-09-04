import { ZERO_ADDRESS } from "../../../constants/misc.js";
import type { PartialPick } from "../../../utils/types.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

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
