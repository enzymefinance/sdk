import { encodeAbiParameters } from "viem";

export function encodeAllowedExternalPositionTypesPolicySettings({
  externalPositionTypeIds,
}: {
  externalPositionTypeIds: bigint[];
}) {
  return encodeAbiParameters(
    [
      {
        type: "uint256[]",
        name: "externalPositionTypeIds",
      },
    ],
    [externalPositionTypeIds],
  );
}
