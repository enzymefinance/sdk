import { Assertion } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    type: "address[]",
    name: "policyAddresses",
  },
  {
    type: "bytes[]",
    name: "policySettings",
  },
] as const;

export type Settings = ReadonlyArray<{
  /**
   * The address of the policy contract.
   *
   * @remarks
   *
   * This is the address of the policy contract, e.g. `MinMaxInvestmentPolicy`, `AllowedAdaptersPolicy`, etc. that the
   * provided settings belong to.
   */
  address: Address;
  /**
   * The encoded policy settings.
   */
  settings: Hex;
}>;

/**
 * Encode policy settings for a set of policies.
 *
 * @returns The encoded policy settings.
 */
export function encodeSettings(policies: Settings): Hex {
  const addresses = policies.map(({ address }) => address);
  const settings = policies.map(({ settings }) => settings);

  return encodeAbiParameters(settingsEncoding, [addresses, settings]);
}

/**
 * Decode policy settings from a hex string.
 *
 * @returns The decoded policy settings.
 */
export function decodeSettings(encoded: Hex): Settings {
  const [addresses, settings] = decodeAbiParameters(settingsEncoding, encoded);
  Assertion.invariant(
    addresses.length === settings.length,
    "Expected policy addresses and settings to have the same length",
  );

  // biome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
