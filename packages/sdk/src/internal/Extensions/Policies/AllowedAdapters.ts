import {
  type AddressListRegistryPolicySettings,
  decodeAddressListRegistryPolicySettings,
  encodeAddressListRegistryPolicySettings,
} from "@enzymefinance/sdk/internal/Extensions/Policies/utils/AddressListRegistryPolicies";
import type { Hex } from "viem";

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
