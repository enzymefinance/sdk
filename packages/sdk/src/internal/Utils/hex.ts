import { type Hex, isHex } from "viem";

export function toHex(input: string): Hex {
  const hex = input.toLowerCase();

  if (isHex(hex)) {
    return hex;
  }

  throw new Error("Invalid hex string");
}
