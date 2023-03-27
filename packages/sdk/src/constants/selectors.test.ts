import { getFunctionSelector, encodePacked, keccak256 } from "viem/utils";
import { expect, it } from "vitest";

import {
  AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR,
  REGISTRY_ADD_TO_LIST_SELECTOR,
  REGISTRY_ATTEST_LISTS_SELECTOR,
  REGISTRY_CREATE_LIST_SELECTOR,
  REGISTRY_REMOVE_FROM_LIST_SELECTOR,
  REGISTRY_SET_LIST_OWNER_SELECTOR,
  REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR,
  CURVE_MINTER_MINT_SELECTOR,
  CURVE_MINTER_MINT_MANY_SELECTOR,
  CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR,
  PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR,
  SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR,
  VAULT_CALL_ANY_DATA_HASH,
} from "./selectors.js";

it("AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR is correct", () => {
  const expected = getFunctionSelector("claimRewardsToSelf(address[], uint256)");
  expect(AAVE_V2_CLAIM_REWARDS_TO_SELF_SELECTOR).toBe(expected);
});

it("REGISTRY_ADD_TO_LIST_SELECTOR is correct", () => {
  const expected = getFunctionSelector("addToList(uint256,address[])");
  expect(REGISTRY_ADD_TO_LIST_SELECTOR).toBe(expected);
});

it("REGISTRY_ATTEST_LISTS_SELECTOR is correct", () => {
  const expected = getFunctionSelector("attestLists(uint256[],string[])");
  expect(REGISTRY_ATTEST_LISTS_SELECTOR).toBe(expected);
});

it("REGISTRY_CREATE_LIST_SELECTOR is correct", () => {
  const expected = getFunctionSelector("createList(address,uint8,address[])");
  expect(REGISTRY_CREATE_LIST_SELECTOR).toBe(expected);
});

it("REGISTRY_REMOVE_FROM_LIST_SELECTOR is correct", () => {
  const expected = getFunctionSelector("removeFromList(uint256,address[])");
  expect(REGISTRY_REMOVE_FROM_LIST_SELECTOR).toBe(expected);
});

it("REGISTRY_SET_LIST_OWNER_SELECTOR is correct", () => {
  const expected = getFunctionSelector("setListOwner(uint256,address)");
  expect(REGISTRY_SET_LIST_OWNER_SELECTOR).toBe(expected);
});

it("REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR is correct", () => {
  const expected = getFunctionSelector("setListUpdateType(uint256,uint8)");
  expect(REGISTRY_SET_LIST_UPDATE_TYPE_SELECTOR).toBe(expected);
});

it("CURVE_MINTER_MINT_SELECTOR is correct", () => {
  const expected = getFunctionSelector("mint(address)");
  expect(CURVE_MINTER_MINT_SELECTOR).toBe(expected);
});

it("CURVE_MINTER_MINT_MANY_SELECTOR is correct", () => {
  const expected = getFunctionSelector("mint_many(address[8])");
  expect(CURVE_MINTER_MINT_MANY_SELECTOR).toBe(expected);
});

it("CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR is correct", () => {
  const expected = getFunctionSelector("toggle_approve_mint(address)");
  expect(CURVE_MINTER_TOGGLE_APPROVE_MINT_SELECTOR).toBe(expected);
});

it("PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR is correct", () => {
  const expected = getFunctionSelector("startAssetBypassTimelock(address)");
  expect(PRICELESS_ASSET_BYPASS_START_ASSET_BYPASS_TIMELOCK_SELECTOR).toBe(expected);
});

it("SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR is correct", () => {
  const expected = getFunctionSelector("approveExchangeOnBehalf(address)");
  expect(SYNTHETIX_ASSIGN_EXCHANGE_DELEGATE_SELECTOR).toBe(expected);
});

it("VAULT_CALL_ANY_DATA_HASH is correct", () => {
  const expected = keccak256(encodePacked(["string"], ["mln.vaultCall.any"]));
  expect(VAULT_CALL_ANY_DATA_HASH).toBe(expected);
});
