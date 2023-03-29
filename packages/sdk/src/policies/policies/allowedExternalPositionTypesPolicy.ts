import { encodeAbiParameters } from "viem";

export function encodeAllowedExternalPositionTypesPolicyConfig({
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
