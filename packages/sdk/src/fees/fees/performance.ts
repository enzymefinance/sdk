import { encodeAbiParameters } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodePerformanceFeeConfigArgs({
  feeRate,
  feeRecipient = ZERO_ADDRESS,
}: {
  feeRate: bigint;
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
    [feeRate, feeRecipient],
  );
}
