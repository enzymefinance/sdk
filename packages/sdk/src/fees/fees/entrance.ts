import { encodeAbiParameters } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodeEntranceRateBurnFeeConfigArgs({ feeRate }: { feeRate: bigint }) {
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "feeRate",
      },
    ],
    [feeRate],
  );
}

export function encodeEntranceRateDirectFeeConfigArgs({
  feeRate,
  feeRecipient = ZERO_ADDRESS,
}: { feeRate: bigint; feeRecipient?: Address }) {
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
    [feeRate, feeRecipient],
  );
}

export function calculateEntranceRateFeeSharesDue({
  feeRate,
  sharesBought,
}: { feeRate: bigint; sharesBought: bigint }) {
  return (sharesBought * feeRate) / 10000n;
}
