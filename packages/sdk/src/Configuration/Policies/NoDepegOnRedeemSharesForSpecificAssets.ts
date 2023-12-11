import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    components: [
      {
        name: "asset",
        type: "address",
      },
      {
        name: "referenceAsset",
        type: "address",
      },
      {
        name: "deviationToleranceInBps",
        type: "uint16",
      },
    ],
    name: "assetConfigs_",
    type: "tuple[]",
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
  return encodeAbiParameters(settingsEncoding, [args.assetConfigs]);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): Settings["assetConfigs"] {
  const [assetConfigs] = decodeAbiParameters(settingsEncoding, encoded);

  return assetConfigs;
}
