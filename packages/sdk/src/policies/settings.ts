import { Address, Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

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
    settings: Hex;
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

export function decodePolicySettings(encoded: Hex) {
  const [addresses, settings] = decodeAbiParameters(policySettingsAbi, encoded);
  if (addresses.length !== settings.length) {
    throw new Error("Expected policy addresses and settings to have the same length");
  }

  // rome-ignore lint/style/noNonNullAssertion: length is checked above
  return addresses.map((address, i) => ({ address, settings: settings[i]! }));
}
