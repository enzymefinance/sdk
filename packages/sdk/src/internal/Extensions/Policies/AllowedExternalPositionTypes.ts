import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    type: "uint256[]",
    name: "externalPositionTypeIds",
  },
] as const;

export type Settings = {
  /**
   * The external position types that should be allowed.
   */
  externalPositionTypeIds: ReadonlyArray<bigint>;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: Settings): Hex {
  return encodeAbiParameters(settingsEncoding, [args.externalPositionTypeIds]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): Settings {
  const [externalPositionTypeIds] = decodeAbiParameters(settingsEncoding, encoded);

  return {
    externalPositionTypeIds,
  };
}
