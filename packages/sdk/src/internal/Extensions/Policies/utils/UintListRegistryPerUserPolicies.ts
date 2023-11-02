import {
  type UintListRegistryPolicySettings,
  decodeUintListRegistryPolicySettings,
  encodeUintListRegistryPolicySettings,
} from "@enzymefinance/sdk/internal/Extensions/Policies/utils/UintListRegistryPolicies";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

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

export interface UintListRegistryPerUserPolicySettings {
  users: ReadonlyArray<Address>;
  listsData: ReadonlyArray<UintListRegistryPolicySettings>;
}

export function encodeUintListRegistryPerUserPolicySettings({
  users = [],
  listsData = [],
}: UintListRegistryPerUserPolicySettings): Hex {
  return encodeAbiParameters(settingsEncoding, [
    users,
    listsData.map(({ existingListIds, newListsArgs }) =>
      encodeUintListRegistryPolicySettings({ existingListIds, newListsArgs }),
    ),
  ]);
}

export function decodeUintListRegistryPerUserPolicySettings(encoded: Hex): UintListRegistryPerUserPolicySettings {
  const [users, listsDataEncoded] = decodeAbiParameters(settingsEncoding, encoded);

  const listsData = listsDataEncoded.map((listEncoded) => decodeUintListRegistryPolicySettings(listEncoded));

  return {
    users,
    listsData,
  };
}
