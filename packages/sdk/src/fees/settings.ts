import { decodeAbiParameters, encodeAbiParameters } from "viem";
import type { Address, Hex } from "viem";

const feeSettingsAbi = [
  {
    type: "address[]",
    name: "feeAddresses",
  },
  {
    type: "bytes[]",
    name: "feeSettings",
  },
] as const;

export function encodeFeeSettings(
  fees: {
    address: Address;
    settings: Hex;
  }[],
) {
  const addresses = fees.map(({ address }) => address);
  const settings = fees.map(({ settings }) => settings);

  return encodeAbiParameters(feeSettingsAbi, [addresses, settings]);
}

export function decodeFeeSettings(encoded: Hex) {
  const [addresses, settings] = decodeAbiParameters(feeSettingsAbi, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected fee addresses and settings to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
