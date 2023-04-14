import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";

export const cumulativeSlippageTolerancePolicyEncoding = [
  {
    type: "uint256",
    name: "tolerance",
  },
] as const;

export interface CumulativeSlippageTolerancePolicySettings {
  tolerance: bigint;
}

export function encodeCumulativeSlippageTolerancePolicySettings({
  tolerance,
}: CumulativeSlippageTolerancePolicySettings): Hex {
  return encodeAbiParameters(cumulativeSlippageTolerancePolicyEncoding, [tolerance]);
}

export function decodeCumulativeSlippageTolerancePolicySettings(
  settings: Hex,
): CumulativeSlippageTolerancePolicySettings {
  const [tolerance] = decodeAbiParameters(cumulativeSlippageTolerancePolicyEncoding, settings);

  return {
    tolerance,
  };
}
