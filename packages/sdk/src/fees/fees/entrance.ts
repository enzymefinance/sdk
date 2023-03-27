import { encodePacked } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodeEntranceRateBurnFeeConfigArgs({ feeRate }: { feeRate: bigint }) {
  return encodePacked(["uint256"], [feeRate]);
}

export function encodeEntranceRateDirectFeeConfigArgs({
  feeRate,
  feeRecipient = ZERO_ADDRESS,
}: { feeRate: bigint; feeRecipient?: Address }) {
  return encodePacked(["uint256", "address"], [feeRate, feeRecipient]);
}

export function calculateEntranceRateFeeSharesDue({
  feeRate,
  sharesBought,
}: { feeRate: bigint; sharesBought: bigint }) {
  return (sharesBought * feeRate) / 10000n;
}
