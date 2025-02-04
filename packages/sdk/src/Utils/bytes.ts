import type { ByteArray } from "viem";

export function removeTrailingZeros(input: ByteArray): ByteArray {
  let length = input.length;
  for (let i = length - 1; i >= 0; i--) {
    if (input[i] !== 0) {
      break;
    }
    length = i;
  }

  return input.length !== length ? input.slice(0, length) : input;
}
