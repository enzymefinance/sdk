import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const allowedExternalPositionTypesPolicySettingsEncoding = [
  {
    type: "uint256[]",
    name: "externalPositionTypeIds",
  },
] as const;

export type AllowedExternalPositionTypesPolicySettings = {
  /**
   * The external position types that should be allowed.
   */
  externalPositionTypeIds: readonly bigint[];
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeAllowedExternalPositionTypesPolicySettings({
  externalPositionTypeIds,
}: AllowedExternalPositionTypesPolicySettings): Hex {
  return encodeAbiParameters(allowedExternalPositionTypesPolicySettingsEncoding, [externalPositionTypeIds]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeAllowedExternalPositionTypesPolicySettings(
  encoded: Hex,
): AllowedExternalPositionTypesPolicySettings {
  const [externalPositionTypeIds] = decodeAbiParameters(allowedExternalPositionTypesPolicySettingsEncoding, encoded);

  return {
    externalPositionTypeIds,
  };
}
