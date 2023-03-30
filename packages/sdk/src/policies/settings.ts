import { decodeAbiParameters, encodeAbiParameters } from "viem";
import { Address, Bytes } from "../types.js";

const policySettingsAbi = [
  {
    type: "address[]",
    name: "policyAddresses",
  },
  {
    type: "bytes[]",
    name: "policySettings",
  },
] as const;

export function encodePolicySettings(
  policies: {
    address: Address;
    settings: Bytes;
  }[],
) {
  const addresses = policies.map(({ address }) => address);
  const settings = policies.map(({ settings }) => settings);

  return encodeAbiParameters(
    [
      {
        type: "address[]",
        name: "policyAddresses",
      },
      {
        type: "bytes[]",
        name: "policySettings",
      },
    ],
    [addresses, settings],
  );
}

export function decodePolicySettings(encoded: Bytes) {
  const [addresses, settings] = decodeAbiParameters(policySettingsAbi, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected policy addresses and settings to have the same length");
  }

  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
