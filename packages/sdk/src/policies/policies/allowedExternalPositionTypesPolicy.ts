import { encodeAbiParameters } from "viem";

export function encodeAllowedExternalPositionTypesPolicy({
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
