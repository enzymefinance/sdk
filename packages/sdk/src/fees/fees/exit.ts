import { encodePacked } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodeExitRateBurnFeeConfigArgs({
  inKindRate = 0n,
  specificAssetsRate = 0n,
}: {
  inKindRate?: bigint;
  specificAssetsRate?: bigint;
}) {
  return encodePacked(["uint256", "uint256"], [inKindRate, specificAssetsRate]);
}

export function encodeExitRateDirectFeeConfigArgs({
  inKindRate = 0n,
  specificAssetsRate = 0n,
  feeRecipient = ZERO_ADDRESS,
}: {
  inKindRate?: bigint;
  specificAssetsRate?: bigint;
  feeRecipient?: Address;
}) {
  return encodePacked(["uint256", "uint256", "address"], [inKindRate, specificAssetsRate, feeRecipient]);
}

export function calculateExitRateFeeSharesDue({
  feeRate,
  sharesRedeemed,
}: { feeRate: bigint; sharesRedeemed: bigint }) {
  return (sharesRedeemed * feeRate) / 10000n;
}
