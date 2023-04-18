import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address, Hex } from "viem";

export const policySettingsAbi = [
  {
    type: "address[]",
    name: "policyAddresses",
  },
  {
    type: "bytes[]",
    name: "policySettings",
  },
] as const;

export interface PolicySettings {
  address: Address;
  settings: Hex;
}

export function encodePolicySettings(policies: PolicySettings[]): Hex {
  const addresses = policies.map(({ address }) => address);
  const settings = policies.map(({ settings }) => settings);

  return encodeAbiParameters(policySettingsAbi, [addresses, settings]);
}

export function decodePolicySettings(encoded: Hex): PolicySettings[] {
  const [addresses, settings] = decodeAbiParameters(policySettingsAbi, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected policy addresses and settings to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
