import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    type: "uint256[]",
    name: "existingListIds",
  },
  {
    type: "bytes[]",
    name: "newListsArgs",
  },
] as const;

const newAddressListArgsEncoding = [
  {
    type: "uint256",
    name: "updateType",
  },
  {
    type: "address[]",
    name: "initialItems",
  },
] as const;

export interface AddressListRegistryPolicySettings {
  existingListIds: readonly bigint[];
  newListsArgs: ReadonlyArray<{
    updateType: bigint;
    initialItems: readonly Address[];
  }>;
}

export function encodeAddressListRegistryPolicySettings({
  existingListIds = [],
  newListsArgs = [],
}: AddressListRegistryPolicySettings): Hex {
  return encodeAbiParameters(settingsEncoding, [
    existingListIds,
    newListsArgs.map(({ updateType, initialItems }) =>
      encodeAbiParameters(newAddressListArgsEncoding, [updateType, initialItems]),
    ),
  ]);
}

export function decodeAddressListRegistryPolicySettings(encoded: Hex): AddressListRegistryPolicySettings {
  const [existingListIds, newListsEncoded] = decodeAbiParameters(settingsEncoding, encoded);

  const newListsArgs = newListsEncoded
    .map((args) => decodeAbiParameters(newAddressListArgsEncoding, args))
    .map((args) => ({ updateType: args[0], initialItems: args[1] }));

  return {
    existingListIds,
    newListsArgs,
  };
}
