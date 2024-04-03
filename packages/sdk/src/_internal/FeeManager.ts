import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion } from "../Utils.js";
import { callExtension } from "./Extensions.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  SettleContinuousFees: 0n,
  PayoutOutstandingFees: 1n,
} as const;

//--------------------------------------------------------------------------------------------
// SETTLE CONTINUOUS FEES
//--------------------------------------------------------------------------------------------

export type SettleContinuousFeesParams = {
  comptrollerProxy: Address;
  feeManager: Address;
};

export function settleContinuousFees(args: SettleContinuousFeesParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    actionId: Action.SettleContinuousFees,
    extensionManager: args.feeManager,
    callArgs: "0x",
  });
}

//--------------------------------------------------------------------------------------------
// PAYOUT OUTSTANDING FEES
//--------------------------------------------------------------------------------------------

const payoutOutstandingFeesEncoding = [
  {
    type: "address[]",
    name: "fees",
  },
] as const;

export type PayoutOutstandingFeesArgs = {
  removeAssets: ReadonlyArray<Address>;
};

export function encodePayoutOutstandingFees(args: PayoutOutstandingFeesArgs): Hex {
  return encodeAbiParameters(payoutOutstandingFeesEncoding, [args.removeAssets]);
}

export function decodePayoutOutstandingFees(encoded: Hex): PayoutOutstandingFeesArgs {
  const [removeAssets] = decodeAbiParameters(payoutOutstandingFeesEncoding, encoded);

  return {
    removeAssets,
  };
}

export type PayoutOutstandingFeesParams = {
  comptrollerProxy: Address;
  feeManager: Address;
  feeContracts: ReadonlyArray<Address>;
};

export function payoutOutstandingFees(args: PayoutOutstandingFeesParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    actionId: Action.PayoutOutstandingFees,
    extensionManager: args.feeManager,
    callArgs: "0x",
  });
}

//--------------------------------------------------------------------------------------------
// SETTINGS
//--------------------------------------------------------------------------------------------

const settingsEncoding = [
  {
    type: "address[]",
    name: "feeAddresses",
  },
  {
    type: "bytes[]",
    name: "feeSettings",
  },
] as const;

export type SettingsArgs = {
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
export function encodeSettings(fees: ReadonlyArray<SettingsArgs>): Hex {
  const addresses = fees.map(({ address }) => address);
  const settings = fees.map(({ settings }) => settings);

  return encodeAbiParameters(settingsEncoding, [addresses, settings]);
}

/**
 * Decode fee settings from a hex string.
 *
 * @returns The decoded fee settings.
 */
export function decodeSettings(encoded: Hex): ReadonlyArray<SettingsArgs> {
  const [addresses, settings] = decodeAbiParameters(settingsEncoding, encoded);
  Assertion.invariant(
    addresses.length === settings.length,
    "Expected fee addresses and settings to have the same length",
  );

  // biome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
