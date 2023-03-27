import { encodeAbiParameters } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodeExitRateBurnFeeConfigArgs({
  inKindRate = 0n,
  specificAssetsRate = 0n,
}: {
  inKindRate?: bigint;
  specificAssetsRate?: bigint;
}) {
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "inKindRate",
      },
      {
        type: "uint256",
        name: "specificAssetsRate",
      },
    ],
    [inKindRate, specificAssetsRate],
  );
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
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "inKindRate",
      },
      {
        type: "uint256",
        name: "specificAssetsRate",
      },
      {
        type: "address",
        name: "feeRecipient",
      },
    ],
    [inKindRate, specificAssetsRate, feeRecipient],
  );
}

export function calculateExitRateFeeSharesDue({
  feeRate,
  sharesRedeemed,
}: { feeRate: bigint; sharesRedeemed: bigint }) {
  return (sharesRedeemed * feeRate) / 10000n;
}
