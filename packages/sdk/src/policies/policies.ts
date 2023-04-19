import { encodePacked } from "viem";
import { Address } from "../types.js";
import type { ListUpdateType } from "../enums.js";

interface AddressListData {
  existingListIds?: bigint[];
  newListsArgs?: {
    updateType: ListUpdateType;
    initialItems: Address[];
  }[];
}

interface UintListData {
  existingListIds?: bigint[];
  newListsArgs?: {
    updateType: ListUpdateType;
    initialItems: bigint[];
  }[];
}

export function addressListRegistryPolicyArgs({
  existingListIds = [],
  newListsArgs = [],
}: {
  existingListIds?: bigint[];
  newListsArgs?: {
    updateType: ListUpdateType;
    initialItems: Address[];
  }[];
}) {
  return encodePacked(
    ["uint256[]", "bytes[]"],
    [
      existingListIds,
      newListsArgs.map(({ updateType, initialItems }) =>
        encodePacked(["uint256", "address[]"], [BigInt(updateType), initialItems]),
      ),
    ],
  );
}

export function addressListRegistryPerUserPolicyArgs({
  users = [],
  listsData = [],
}: {
  users?: Address[];
  listsData?: AddressListData[];
}) {
  return encodePacked(
    ["address[]", "bytes[]"],
    [
      users,
      listsData.map(({ existingListIds, newListsArgs }) =>
        addressListRegistryPolicyArgs({ existingListIds, newListsArgs }),
      ),
    ],
  );
}

export function uintListRegistryPerUserPolicyArgs({
  users = [],
  listsData = [],
}: {
  users?: Address[];
  listsData?: UintListData[];
}) {
  return encodePacked(
    ["address[]", "bytes[]"],
    [
      users,
      listsData.map(({ existingListIds, newListsArgs }) =>
        uintListRegistryPolicyArgs({ existingListIds, newListsArgs }),
      ),
    ],
  );
}

export function uintListRegistryPolicyArgs({
  existingListIds = [],
  newListsArgs = [],
}: {
  existingListIds?: bigint[];
  newListsArgs?: {
    updateType: UintListUpdateType;
    initialItems: bigint[];
  }[];
}) {
  return encodePacked(
    ["uint256[]", "bytes[]"],
    [
      existingListIds,
      newListsArgs.map(({ updateType, initialItems }) =>
        encodePacked(["uint256", "uint256[]"], [updateType, initialItems]),
      ),
    ],
  );
}

export function allowedExternalPositionTypesPolicyArgs({
  externalPositionTypeIds,
}: {
  externalPositionTypeIds: bigint[];
}) {
  return encodePacked(["uint256[]"], [externalPositionTypeIds]);
}

export function cumulativeSlippageTolerancePolicyArgs({ tolerance }: { tolerance: bigint }) {
  return encodePacked(["uint256"], [tolerance]);
}

export function minAssetBalancesPostRedemptionPolicyArgs({
  assets,
  minBalances,
}: {
  assets: Address[];
  minBalances: bigint[];
}) {
  return encodePacked(["address[]", "uint256[]"], [assets, minBalances]);
}

export function minMaxInvestmentPolicyArgs({
  minInvestmentAmount,
  maxInvestmentAmount,
}: {
  minInvestmentAmount: bigint;
  maxInvestmentAmount: bigint;
}) {
  return encodePacked(["uint256", "uint256"], [minInvestmentAmount, maxInvestmentAmount]);
}
