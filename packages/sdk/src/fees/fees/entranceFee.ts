import { Address, encodeAbiParameters } from "viem";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodeEntranceRateBurnFeeSettings({ feeRateInBps }: { feeRateInBps: bigint }) {
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "feeRate",
      },
    ],
    [feeRateInBps],
  );
}

export function encodeEntranceRateDirectFeeSettings({
  feeRateInBps,
  feeRecipient = ZERO_ADDRESS,
}: { feeRateInBps: bigint; feeRecipient?: Address }) {
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

export function calculateEntranceRateFeeSharesDue({
  feeRateInBps,
  sharesBought,
}: {
  feeRateInBps: bigint;
  sharesBought: bigint;
}) {
  return (sharesBought * feeRateInBps) / 10000n;
}
