import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const feeSettingsEncoding = [
  {
    type: "address[]",
    name: "feeAddresses",
  },
  {
    type: "bytes[]",
    name: "feeSettings",
  },
] as const;

export type FeeSettings = {
  /**
   * The address of the fee contract.
   *
   * @remarks
   *
   * This is the address of the fee contract, e.g. `PerformanceFee`, `ManagementFee`, etc. that the
   * provided settings belong to.
   */
  address: Address;
  /**
   * The encoded fee settings.
   */
  settings: Hex;
};

/**
 * Encode fee settings for a set of fees.
 *
 * @returns The encoded fee settings.
 */
export function encodeFeeSettings(fees: FeeSettings[]): Hex {
  const addresses = fees.map(({ address }) => address);
  const settings = fees.map(({ settings }) => settings);

  return encodeAbiParameters(feeSettingsEncoding, [addresses, settings]);
}

/**
 * Decode fee settings from a hex string.
 *
 * @returns The decoded fee settings.
 */
export function decodeFeeSettings(encoded: Hex): FeeSettings[] {
  const [addresses, settings] = decodeAbiParameters(feeSettingsEncoding, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected fee addresses and settings to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
