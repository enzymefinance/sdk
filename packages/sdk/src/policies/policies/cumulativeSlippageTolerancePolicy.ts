import { encodeAbiParameters } from "viem";

export function encodeCumulativeSlippageTolerancePolicy({
  tolerance,
}: {
  tolerance: bigint;
}) {
  return encodeAbiParameters(
    [
      {
        type: "uint256",
        name: "tolerance",
      },
    ],
    [tolerance],
  );
}
