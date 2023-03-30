import { encodeAbiParameters } from "viem";
import { Address, Bytes } from "../types.js";

export function encodeFeeSettings(
  fees: {
    address: Address;
    settings: Bytes;
  }[],
) {
  const addresses = fees.map(({ address }) => address);
  const settings = fees.map(({ settings }) => settings);

  return encodeAbiParameters(
    [
      {
        type: "address[]",
        name: "feeAddresses",
      },
      {
        type: "bytes[]",
        name: "feeSettings",
      },
    ],
    [addresses, settings],
  );
}
