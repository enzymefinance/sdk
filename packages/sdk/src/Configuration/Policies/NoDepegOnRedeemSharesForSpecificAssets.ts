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
    name: "deviationToleranceInBpss",
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
  const assets = args.assetConfigs.map(({ asset }) => asset);
  const referenceAssets = args.assetConfigs.map(({ referenceAsset }) => referenceAsset);
  const deviationToleranceInBpss = args.assetConfigs.map(({ deviationToleranceInBps }) => deviationToleranceInBps);

  return encodeAbiParameters(settingsEncoding, [assets, referenceAssets, deviationToleranceInBpss]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): Settings {
  const [assets, referenceAssets, deviationToleranceInBpss] = decodeAbiParameters(settingsEncoding, encoded);

  return {
    assetConfigs: assets.map((asset, i) => {
      const referenceAsset = referenceAssets[i];
      const deviationToleranceInBps = deviationToleranceInBpss[i];
      Assertion.invariant(referenceAsset, "Expected referenceAssets and assets to have the same length");
      Assertion.invariant(
        deviationToleranceInBps,
        "Expected deviationToleranceInBpss and assets to have the same length",
      );

      return { asset, referenceAsset, deviationToleranceInBps };
    }),
  };
}
