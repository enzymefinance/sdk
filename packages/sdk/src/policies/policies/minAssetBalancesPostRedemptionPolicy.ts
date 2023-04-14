import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address, Hex } from "viem";

export const minAssetBalancesPostRedemptionPolicySettingsEncoding = [
  {
    type: "address[]",
    name: "assets",
  },
  {
    type: "uint256[]",
    name: "minBalances",
  },
] as const;

export function encodeMinAssetBalancesPostRedemptionPolicySettings(
  settings: {
    assets: Address;
    minBalances: bigint;
  }[],
) {
  const assets = settings.map(({ assets }) => assets);
  const minBalances = settings.map(({ minBalances }) => minBalances);

  return encodeAbiParameters(minAssetBalancesPostRedemptionPolicySettingsEncoding, [assets, minBalances]);
}

export function decodeMinAssetBalancesPostRedemptionPolicySettings(encoded: Hex) {
  const [assets, minBalances] = decodeAbiParameters(minAssetBalancesPostRedemptionPolicySettingsEncoding, encoded);
  if (assets.length !== minBalances.length) {
    throw new Error("Expected minBalances and assets to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return assets.map((asset, i) => ({ asset, minBalance: minBalances[i]! }));
}
