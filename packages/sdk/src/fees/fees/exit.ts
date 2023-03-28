import { encodeAbiParameters } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodeExitRateBurnFeeConfigArgs({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
}: {
  inKindRateInBps?: bigint;
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
    [inKindRateInBps, specificAssetsRate],
  );
}

export function encodeExitRateDirectFeeConfigArgs({
  inKindRateInBps = 0n,
  specificAssetsRate = 0n,
  feeRecipient = ZERO_ADDRESS,
}: {
  inKindRateInBps?: bigint;
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
    [inKindRateInBps, specificAssetsRate, feeRecipient],
  );
}

export function calculateExitRateFeeSharesDue({
  feeRate,
  sharesRedeemed,
}: { feeRate: bigint; sharesRedeemed: bigint }) {
  return (sharesRedeemed * feeRate) / 10000n;
}
