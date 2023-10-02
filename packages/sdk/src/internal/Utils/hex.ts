import { type Hex, isHex } from "viem";

export function asHex(input: string): Hex {
  const hex = input.toLowerCase();

  if (isHex(hex)) {
    return hex;
  }

  throw new Error("Invalid hex string");
}
