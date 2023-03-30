import { decodeAbiParameters, encodeAbiParameters } from "viem";
import { Address, Bytes } from "../types.js";

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
    settings: Bytes;
  }[],
) {
  const addresses = fees.map(({ address }) => address);
  const settings = fees.map(({ settings }) => settings);

  return encodeAbiParameters(feeSettingsAbi, [addresses, settings]);
}

export function decodeFeeSettings(encoded: Bytes) {
  const [addresses, settings] = decodeAbiParameters(feeSettingsAbi, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected fee addresses and settings to have the same length");
  }

  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
