import type { Hex } from "viem";
import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export const performanceFeeSettingsEncoding = [
  {
    type: "uint256",
    name: "feeRate",
  },
  {
    type: "address",
    name: "feeRecipient",
  },
] as const;

export function decodePerformanceFeeSettings(settings: Hex) {
  const [feeRateInBps, feeRecipient] = decodeAbiParameters(performanceFeeSettingsEncoding, settings);

  return {
    feeRateInBps,
    feeRecipient,
  };
}

export function encodePerformanceFeeSettings({
  feeRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: {
  feeRateInBps: bigint;
  feeRecipient?: Address;
}) {
  return encodeAbiParameters(performanceFeeSettingsEncoding, [feeRateInBps, feeRecipient]);
}
