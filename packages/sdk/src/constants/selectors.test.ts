import { encodePacked, getFunctionSelector, keccak256 } from "viem/utils";
import { expect, test } from "vitest";

import {
  AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR,
  CURVE_MINTER_MINT_MANY_SELECTOR,
  CURVE_MINTER_MINT_SELECTOR,
  CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR,
  PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR,
  REGISTRY_ADD_TO_LIST_SELECTOR,
  REGISTRY_ATTEST_LISTS_SELECTOR,
  REGISTRY_CREATE_LIST_SELECTOR,
  REGISTRY_REMOVE_FROM_LIST_SELECTOR,
  REGISTRY_SET_LIST_OWNER_SELECTOR,
  REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR,
  SETTLE_CONTINUOUS_FEES_SELECTOR,
  SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR,
  VAULT_CALL_ANY_DATA_HASH,
} from "./selectors.js";

test("AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR is correct", () => {
  const expected = getFunctionSelector("claimRewardsToSelf(address[], uint256)");
  expect(AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR).toBe(expected);
});

test("REGISTRY_ADD_TO_LIST_SELECTOR is correct", () => {
  const expected = getFunctionSelector("addToList(uint256,address[])");
  expect(REGISTRY_ADD_TO_LIST_SELECTOR).toBe(expected);
});

test("REGISTRY_ATTEST_LISTS_SELECTOR is correct", () => {
  const expected = getFunctionSelector("attestLists(uint256[],string[])");
  expect(REGISTRY_ATTEST_LISTS_SELECTOR).toBe(expected);
});

test("REGISTRY_CREATE_LIST_SELECTOR is correct", () => {
  const expected = getFunctionSelector("createList(address,uint8,address[])");
  expect(REGISTRY_CREATE_LIST_SELECTOR).toBe(expected);
});

test("REGISTRY_REMOVE_FROM_LIST_SELECTOR is correct", () => {
  const expected = getFunctionSelector("removeFromList(uint256,address[])");
  expect(REGISTRY_REMOVE_FROM_LIST_SELECTOR).toBe(expected);
});

test("REGISTRY_SET_LIST_OWNER_SELECTOR is correct", () => {
  const expected = getFunctionSelector("setListOwner(uint256,address)");
  expect(REGISTRY_SET_LIST_OWNER_SELECTOR).toBe(expected);
});

test("REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR is correct", () => {
  const expected = getFunctionSelector("setListUpdateType(uint256,uint8)");
  expect(REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR).toBe(expected);
});

test("CURVE_MINTER_MINT_SELECTOR is correct", () => {
  const expected = getFunctionSelector("mint(address)");
  expect(CURVE_MINTER_MINT_SELECTOR).toBe(expected);
});

test("CURVE_MINTER_MINT_MANY_SELECTOR is correct", () => {
  const expected = getFunctionSelector("mint_many(address[8])");
  expect(CURVE_MINTER_MINT_MANY_SELECTOR).toBe(expected);
});

test("CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR is correct", () => {
  const expected = getFunctionSelector("toggle_approve_mint(address)");
  expect(CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR).toBe(expected);
});

test("PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR is correct", () => {
  const expected = getFunctionSelector("startAssetBypassTimelock(address)");
  expect(PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR).toBe(expected);
});

test("SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR is correct", () => {
  const expected = getFunctionSelector("approveExchangeOnBehalf(address)");
  expect(SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR).toBe(expected);
});

test("SETTLE_CONTINUOUS_FEES_SELECTOR is correct", () => {
  const expected = getFunctionSelector("settleContinuousFees(address,bytes)");
  expect(SETTLE_CONTINUOUS_FEES_SELECTOR).toBe(expected);
});

test("VAULT_CALL_ANY_DATA_HASH is correct", () => {
  const expected = keccak256(encodePacked(["string"], ["mln.vaultCall.any"]));
  expect(VAULT_CALL_ANY_DATA_HASH).toBe(expected);
});
