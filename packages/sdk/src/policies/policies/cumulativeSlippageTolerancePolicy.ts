import { encodeAbiParameters } from "viem";

export function encodeCumulativeSlippageTolerancePolicySettings({
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
