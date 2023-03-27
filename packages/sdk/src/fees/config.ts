import { encodePacked } from "viem";
import { Address, Bytes } from "../types.js";

export function encodeFeeManagerConfigArgs(fees: Address[], settings: Bytes[]) {
  return encodePacked(["address[]", "bytes[]"], [fees, settings]);
}

export function encodePayoutSharesOutstandingForFeesArgs(fees: Address[]) {
  return encodePacked(["address[]"], [fees]);
}
