import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    type: "uint256",
    name: "tolerance",
  },
] as const;

export type Settings = {
  /**
   * The allowed cumulative slippage tolerance.
   *
   * @remarks
   *
   * This is the maximum amount of slippage that the vault is allowed to accumulate over time.
   * If the vault's cumulative slippage exceeds this amount, the trade will revert. The allowed
   * slippage replenishes over time.
   */
  slippageTolerance: bigint;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: Settings): Hex {
  return encodeAbiParameters(settingsEncoding, [args.slippageTolerance]);
}

export function decodeSettings(settings: Hex): Settings {
  const [slippageTolerance] = decodeAbiParameters(settingsEncoding, settings);

  return {
    slippageTolerance,
  };
}
