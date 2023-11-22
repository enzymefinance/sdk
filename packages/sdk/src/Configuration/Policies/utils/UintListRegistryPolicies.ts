import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const settingsEncoding = [
  {
    type: "address[]",
    name: "existingListIds",
  },
  {
    type: "bytes[]",
    name: "newListsArgs",
  },
] as const;

const newUintListArgsEncoding = [
  {
    type: "uint256",
    name: "updateType",
  },
  {
    type: "uint256[]",
    name: "initialItems",
  },
] as const;

export interface UintListRegistryPolicySettings {
  existingListIds: ReadonlyArray<Address>;
  newListsArgs: ReadonlyArray<{
    updateType: bigint;
    initialItems: ReadonlyArray<bigint>;
  }>;
}

export function encodeUintListRegistryPolicySettings({
  existingListIds = [],
  newListsArgs = [],
}: UintListRegistryPolicySettings): Hex {
  return encodeAbiParameters(settingsEncoding, [
    existingListIds,
    newListsArgs.map(({ updateType, initialItems }) =>
      encodeAbiParameters(newUintListArgsEncoding, [updateType, initialItems]),
    ),
  ]);
}

export function decodeUintListRegistryPolicySettings(encoded: Hex): UintListRegistryPolicySettings {
  const [existingListIds, newListsEncoded] = decodeAbiParameters(settingsEncoding, encoded);

  const newListsArgs = newListsEncoded
    .map((args) => decodeAbiParameters(newUintListArgsEncoding, args))
    .map((args) => ({ updateType: args[0], initialItems: args[1] }));

  return {
    existingListIds,
    newListsArgs,
  };
}
