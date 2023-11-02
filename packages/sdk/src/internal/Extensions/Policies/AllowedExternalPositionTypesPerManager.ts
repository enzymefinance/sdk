import {
  type UintListRegistryPerUserPolicySettings,
  decodeUintListRegistryPerUserPolicySettings,
  encodeUintListRegistryPerUserPolicySettings,
} from "@enzymefinance/sdk/internal/Extensions/Policies/utils/UintListRegistryPerUserPolicies";
import type { Hex } from "viem";

export type Settings = UintListRegistryPerUserPolicySettings;

/**
 * Encodes the given settings into a hex string.
 *
 * @returns The encoded settings.
 */
export function encodeSettings(args: UintListRegistryPerUserPolicySettings): Hex {
  return encodeUintListRegistryPerUserPolicySettings(args);
}

/**
 * Decodes the given settings from a hex string.
 *
 * @returns The decoded settings.
 */
export function decodeSettings(encoded: Hex): UintListRegistryPerUserPolicySettings {
  return decodeUintListRegistryPerUserPolicySettings(encoded);
}
