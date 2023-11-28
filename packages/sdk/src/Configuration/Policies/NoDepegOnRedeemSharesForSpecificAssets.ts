import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion } from "../../Utils.js";

const settingsEncoding = [
  {
    type: "address[]",
    name: "assets",
  },
  {
    type: "address[]",
    name: "referenceAssets",
  },
  {
    type: "uint16[]",
    name: "deviationTolerancesInBps",
  },
] as const;

export type Settings = {
  assetConfigs: ReadonlyArray<{
    /**
     * The asset that is pegged to the reference asset.
     */
    asset: Address;
    /**
     * The reference asset that the asset is pegged to.
     */
    referenceAsset: Address;
    /**
     * The deviation tolerance in basis points between the pegged asset and its reference asset.
     */
    deviationToleranceInBps: number;
  }>;
};

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: Settings): Hex {
  const assets: Address[] = [];
  const referenceAssets: Address[] = [];
  const deviationTolerancesInBps: number[] = [];

  for (const value of args.assetConfigs) {
    assets.push(value.asset);
    referenceAssets.push(value.referenceAsset);
    deviationTolerancesInBps.push(value.deviationToleranceInBps);
  }

  return encodeAbiParameters(settingsEncoding, [assets, referenceAssets, deviationTolerancesInBps]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): Settings {
  const [assets, referenceAssets, deviationTolerancesInBps] = decodeAbiParameters(settingsEncoding, encoded);

  return {
    assetConfigs: assets.map((asset, i) => {
      const referenceAsset = referenceAssets[i];
      const deviationToleranceInBps = deviationTolerancesInBps[i];
      Assertion.invariant(referenceAsset !== undefined, "Expected referenceAssets and assets to have the same length");
      Assertion.invariant(
        deviationToleranceInBps !== undefined,
        "Expected deviationToleranceInBpss and assets to have the same length",
      );

      return { asset, referenceAsset, deviationToleranceInBps };
    }),
  };
}
