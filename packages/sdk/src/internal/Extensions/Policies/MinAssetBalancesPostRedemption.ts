import { Assertion } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    type: "address[]",
    name: "assets",
  },
  {
    type: "uint256[]",
    name: "limits",
  },
] as const;

export type Settings = {
  minAssetBalances: ReadonlyArray<{
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
    balance: bigint;
  }>;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: Settings): Hex {
  const assets = args.minAssetBalances.map(({ asset }) => asset);
  const limits = args.minAssetBalances.map(({ balance }) => balance);

  return encodeAbiParameters(settingsEncoding, [assets, limits]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): Settings {
  const [assets, limits] = decodeAbiParameters(settingsEncoding, encoded);

  return {
    minAssetBalances: assets.map((asset, i) => {
      const balance = limits[i];
      Assertion.invariant(balance, "Expected balances and assets to have the same length");

      return { asset, balance };
    }),
  };
}
