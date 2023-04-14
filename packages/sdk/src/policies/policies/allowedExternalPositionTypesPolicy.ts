import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";

export const allowedExternalPositionTypesPolicySettingsEncoding = [
  {
    type: "uint256[]",
    name: "externalPositionTypeIds",
  },
] as const;

export interface AllowedExternalPositionTypesPolicySettings {
  externalPositionTypeIds: readonly bigint[];
}

export function encodeAllowedExternalPositionTypesPolicySettings({
  externalPositionTypeIds,
}: AllowedExternalPositionTypesPolicySettings): Hex {
  return encodeAbiParameters(allowedExternalPositionTypesPolicySettingsEncoding, [externalPositionTypeIds]);
}

export function decodeAllowedExternalPositionTypesPolicySettings(
  encoded: Hex,
): AllowedExternalPositionTypesPolicySettings {
  const [externalPositionTypeIds] = decodeAbiParameters(allowedExternalPositionTypesPolicySettingsEncoding, encoded);

  return {
    externalPositionTypeIds,
  };
}
