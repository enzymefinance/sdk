import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const cumulativeSlippageTolerancePolicyEncoding = [
  {
    type: "uint256",
    name: "tolerance",
  },
] as const;

export type CumulativeSlippageTolerancePolicySettings = {
  /**
   * The allowed cumulative slippage tolerance.
   *
   * @remarks
   *
   * This is the maximum amount of slippage that the vault is allowed to accumulate over time.
   * If the vault's cumulative slippage exceeds this amount, the trade will revert. The allowed
   * slippage replenishes over time.
   */
  tolerance: bigint;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
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
