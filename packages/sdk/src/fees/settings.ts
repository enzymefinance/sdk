import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address, Hex } from "viem";

export const feeSettingsAbi = [
  {
    type: "address[]",
    name: "feeAddresses",
  },
  {
    type: "bytes[]",
    name: "feeSettings",
  },
] as const;

export interface FeeSettings {
  address: Address;
  settings: Hex;
}

export function encodeFeeSettings(fees: FeeSettings[]): Hex {
  const addresses = fees.map(({ address }) => address);
  const settings = fees.map(({ settings }) => settings);

  return encodeAbiParameters(feeSettingsAbi, [addresses, settings]);
}

export function decodeFeeSettings(encoded: Hex): FeeSettings[] {
  const [addresses, settings] = decodeAbiParameters(feeSettingsAbi, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected fee addresses and settings to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
