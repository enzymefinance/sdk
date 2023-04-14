import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";

export const cumulativeSlippageTolerancePolicyEncoding = [
  {
    type: "uint256",
    name: "tolerance",
  },
] as const;

export function encodeCumulativeSlippageTolerancePolicySettings({
  tolerance,
}: {
  tolerance: bigint;
}) {
  return encodeAbiParameters(cumulativeSlippageTolerancePolicyEncoding, [tolerance]);
}

export function decodeCumulativeSlippageTolerancePolicySettings(settings: Hex) {
  const [tolerance] = decodeAbiParameters(cumulativeSlippageTolerancePolicyEncoding, settings);

  return {
    tolerance,
  };
}
