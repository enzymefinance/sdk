import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const minAssetBalancesPostRedemptionPolicySettingsEncoding = [
  {
    type: "address[]",
    name: "assets",
  },
  {
    type: "uint256[]",
    name: "limits",
  },
] as const;

export type MinAssetBalancesPostRedemptionPolicySettings = {
  /**
   * The asset that should be limited.
   */
  asset: Address;
  /**
   * The minimum balance that should be maintained.
   *
   * @remarks
   *
   * If the vault's balance of this asset would fall below the specified limit as a result
   * of the redeption, the transaction will revert.
   */
  limit: bigint;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeMinAssetBalancesPostRedemptionPolicySettings(
  policies: MinAssetBalancesPostRedemptionPolicySettings[],
): Hex {
  const assets = policies.map(({ asset }) => asset);
  const limits = policies.map(({ limit }) => limit);

  return encodeAbiParameters(minAssetBalancesPostRedemptionPolicySettingsEncoding, [assets, limits]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeMinAssetBalancesPostRedemptionPolicySettings(
  encoded: Hex,
): MinAssetBalancesPostRedemptionPolicySettings[] {
  const [assets, limits] = decodeAbiParameters(minAssetBalancesPostRedemptionPolicySettingsEncoding, encoded);
  if (assets.length !== limits.length) {
    throw new Error("Expected limits and assets to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return assets.map((asset, i) => ({ asset, limit: limits[i]! }));
}
