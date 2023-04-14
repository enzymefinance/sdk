import { decodeAbiParameters, encodeAbiParameters, type Hex } from "viem";

export const allowedExternalPositionTypesPolicySettingsEncoding = [
  {
    type: "uint256[]",
    name: "externalPositionTypeIds",
  },
] as const;

export function encodeAllowedExternalPositionTypesPolicySettings({
  externalPositionTypeIds,
}: {
  externalPositionTypeIds: bigint[];
}) {
  return encodeAbiParameters(allowedExternalPositionTypesPolicySettingsEncoding, [externalPositionTypeIds]);
}

export function decodeAllowedExternalPositionTypesPolicySettings(encoded: Hex) {
  const [externalPositionTypeIds] = decodeAbiParameters(allowedExternalPositionTypesPolicySettingsEncoding, encoded);

  return {
    externalPositionTypeIds,
  };
}
