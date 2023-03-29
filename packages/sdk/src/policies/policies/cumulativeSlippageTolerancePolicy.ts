import { encodeAbiParameters } from "viem";

export function encodeCumulativeSlippageTolerancePolicyConfig({
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
