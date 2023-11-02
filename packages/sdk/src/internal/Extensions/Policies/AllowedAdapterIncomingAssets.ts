import type { Hex } from "viem";
import {
  type AddressListRegistryPolicySettings,
  decodeAddressListRegistryPolicySettings,
  encodeAddressListRegistryPolicySettings,
} from "./utils/AddressListRegistryPolicies";

export type Settings = AddressListRegistryPolicySettings;

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: AddressListRegistryPolicySettings): Hex {
  return encodeAddressListRegistryPolicySettings(args);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): AddressListRegistryPolicySettings {
  return decodeAddressListRegistryPolicySettings(encoded);
}
