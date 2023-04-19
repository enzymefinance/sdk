import { encodePacked } from "viem";
import { Address, Bytes } from "../types.js";

export function encodePolicyManagerConfigArgs({ policies, settings }: { policies: Address[]; settings: Bytes[] }) {
  return encodePacked(["address[]", "bytes[]"], [policies, settings]);
}
