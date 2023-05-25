import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const policySettingsEncoding = [
  {
    type: "address[]",
    name: "policyAddresses",
  },
  {
    type: "bytes[]",
    name: "policySettings",
  },
] as const;

export type PolicySettings = {
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
};

/**
 * Encode policy settings for a set of policies.
 *
 * @returns The encoded policy settings.
 */
export function encodePolicySettings(policies: PolicySettings[]): Hex {
  const addresses = policies.map(({ address }) => address);
  const settings = policies.map(({ settings }) => settings);

  return encodeAbiParameters(policySettingsEncoding, [addresses, settings]);
}

/**
 * Decode policy settings from a hex string.
 *
 * @returns The decoded policy settings.
 */
export function decodePolicySettings(encoded: Hex): PolicySettings[] {
  const [addresses, settings] = decodeAbiParameters(policySettingsEncoding, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected policy addresses and settings to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
