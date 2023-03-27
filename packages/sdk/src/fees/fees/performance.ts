import { encodePacked } from "viem";
import { Address } from "../../types.js";
import { ZERO_ADDRESS } from "../../constants/misc.js";

export function encodePerformanceFeeConfigArgs({
  feeRate,
  feeRecipient = ZERO_ADDRESS,
}: {
  feeRate: bigint;
  feeRecipient?: Address;
}) {
  return encodePacked(["uint256", "address"], [feeRate, feeRecipient]);
}
