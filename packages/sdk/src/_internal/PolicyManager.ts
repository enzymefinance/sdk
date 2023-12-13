import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion, Viem } from "../Utils.js";

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

export type SettingsArgs = ReadonlyArray<{
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
export function encodeSettings(policies: SettingsArgs): Hex {
  const addresses = policies.map(({ address }) => address);
  const settings = policies.map(({ settings }) => settings);

  return encodeAbiParameters(settingsEncoding, [addresses, settings]);
}

/**
 * Decode policy settings from a hex string.
 *
 * @returns The decoded policy settings.
 */
export function decodeSettings(encoded: Hex): SettingsArgs {
  const [addresses, settings] = decodeAbiParameters(settingsEncoding, encoded);
  Assertion.invariant(
    addresses.length === settings.length,
    "Expected policy addresses and settings to have the same length",
  );

  // biome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}

export type EnableOrUpdateParams = {
  policyManager: Address;
  comptrollerProxy: Address;
  policy: Address;
  settingsData: Hex;
};

export function enable(args: EnableOrUpdateParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IPolicyManager,
    functionName: "enablePolicyForFund",
    address: args.policyManager,
    args: [args.comptrollerProxy, args.policy, args.settingsData],
  });
}

export function update(args: EnableOrUpdateParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IPolicyManager,
    functionName: "updatePolicySettingsForFund",
    address: args.policyManager,
    args: [args.comptrollerProxy, args.policy, args.settingsData],
  });
}

export type DisableParams = {
  policyManager: Address;
  comptrollerProxy: Address;
  policy: Address;
};

export function disable(args: DisableParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IPolicyManager,
    functionName: "disablePolicyForFund",
    address: args.policyManager,
    args: [args.comptrollerProxy, args.policy],
  });
}
