import { encodeAbiParameters } from "viem";
import type { Address } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodePerformanceFeeSettings({
  feeRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: {
  feeRateInBps: bigint;
  feeRecipient?: Address;
}) {
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "feeRate",
      },
      {
        type: "address",
        name: "feeRecipient",
      },
    ],
    [feeRateInBps, feeRecipient],
  );
}
