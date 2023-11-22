import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import {
  type AddressListRegistryPolicySettings,
  decodeAddressListRegistryPolicySettings,
  encodeAddressListRegistryPolicySettings,
} from "./AddressListRegistryPolicies.js";

const settingsEncoding = [
  {
    type: "address[]",
    name: "users",
  },
  {
    type: "bytes[]",
    name: "listsData",
  },
] as const;

export interface AddressListRegistryPerUserPolicySettings {
  users: ReadonlyArray<Address>;
  listsData: ReadonlyArray<AddressListRegistryPolicySettings>;
}

export function encodeAddressListRegistryPerUserPolicySettings({
  users = [],
  listsData = [],
}: AddressListRegistryPerUserPolicySettings): Hex {
  return encodeAbiParameters(settingsEncoding, [
    users,
    listsData.map(({ existingListIds, newListsArgs }) =>
      encodeAddressListRegistryPolicySettings({ existingListIds, newListsArgs }),
    ),
  ]);
}

export function decodeAddressListRegistryPerUserPolicySettings(encoded: Hex): AddressListRegistryPerUserPolicySettings {
  const [users, listsDataEncoded] = decodeAbiParameters(settingsEncoding, encoded);

  const listsData = listsDataEncoded.map((listEncoded) => decodeAddressListRegistryPolicySettings(listEncoded));

  return {
    users,
    listsData,
  };
}
