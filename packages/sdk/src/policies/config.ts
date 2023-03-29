import { encodeAbiParameters } from "viem";
import { Address, Bytes } from "../types.js";

export function encodePolicyManagerConfig(
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
