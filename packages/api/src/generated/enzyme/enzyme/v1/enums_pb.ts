// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/enums.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * Release describes a specific Enzyme Protocol release. 
 *
 * @generated from enum enzyme.enzyme.v1.Release
 */
export enum Release {
  /**
   * Unspecified release: this will use the latest release
   *
   * @generated from enum value: RELEASE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Phoenix release (v2)
   *
   * @generated from enum value: RELEASE_PHOENIX = 1;
   */
  PHOENIX = 1,

  /**
   * Encore release (v3)
   *
   * @generated from enum value: RELEASE_ENCORE = 2;
   */
  ENCORE = 2,

  /**
   * Sulu release (v4)
   *
   * @generated from enum value: RELEASE_SULU = 3;
   */
  SULU = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Release)
proto3.util.setEnumType(Release, "enzyme.enzyme.v1.Release", [
  { no: 0, name: "RELEASE_UNSPECIFIED" },
  { no: 1, name: "RELEASE_PHOENIX" },
  { no: 2, name: "RELEASE_ENCORE" },
  { no: 3, name: "RELEASE_SULU" },
]);

/**
 * Network describes a network on which the Enzyme Protocol has been deployed. 
 *
 * @generated from enum enzyme.enzyme.v1.Network
 */
export enum Network {
  /**
   * Unspecified network: this will use the Ethereum network
   *
   * @generated from enum value: NETWORK_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Ethereum network
   *
   * @generated from enum value: NETWORK_ETHEREUM = 1;
   */
  ETHEREUM = 1,

  /**
   * Polygon network
   *
   * @generated from enum value: NETWORK_POLYGON = 2;
   */
  POLYGON = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Network)
proto3.util.setEnumType(Network, "enzyme.enzyme.v1.Network", [
  { no: 0, name: "NETWORK_UNSPECIFIED" },
  { no: 1, name: "NETWORK_ETHEREUM" },
  { no: 2, name: "NETWORK_POLYGON" },
]);

/**
 * Deployment describes a specific deployment of the Enzyme Protocol. 
 *
 * @generated from enum enzyme.enzyme.v1.Deployment
 */
export enum Deployment {
  /**
   * Unspecified deployment: this will use the Ethereum deployment
   *
   * @generated from enum value: DEPLOYMENT_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Ethereum production deployment
   *
   * @generated from enum value: DEPLOYMENT_ETHEREUM = 1;
   */
  ETHEREUM = 1,

  /**
   * Polygon production deployment
   *
   * @generated from enum value: DEPLOYMENT_POLYGON = 2;
   */
  POLYGON = 2,

  /**
   * Testnet deployment on Polygon
   *
   * @generated from enum value: DEPLOYMENT_TESTNET = 3;
   */
  TESTNET = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Deployment)
proto3.util.setEnumType(Deployment, "enzyme.enzyme.v1.Deployment", [
  { no: 0, name: "DEPLOYMENT_UNSPECIFIED" },
  { no: 1, name: "DEPLOYMENT_ETHEREUM" },
  { no: 2, name: "DEPLOYMENT_POLYGON" },
  { no: 3, name: "DEPLOYMENT_TESTNET" },
]);

/**
 * Resolution describes the time resolution for time series data. 
 *
 * @generated from enum enzyme.enzyme.v1.Resolution
 */
export enum Resolution {
  /**
   * Unspecified resolution: this will default to one day
   *
   * @generated from enum value: RESOLUTION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Five minutes resolution
   *
   * @generated from enum value: RESOLUTION_FIVE_MINUTES = 1;
   */
  FIVE_MINUTES = 1,

  /**
   * Ten minutes resolution
   *
   * @generated from enum value: RESOLUTION_TEN_MINUTES = 2;
   */
  TEN_MINUTES = 2,

  /**
   * Thirty minutes resolution
   *
   * @generated from enum value: RESOLUTION_THIRTY_MINUTES = 3;
   */
  THIRTY_MINUTES = 3,

  /**
   * One hour resolution
   *
   * @generated from enum value: RESOLUTION_ONE_HOUR = 4;
   */
  ONE_HOUR = 4,

  /**
   * One day resolution
   *
   * @generated from enum value: RESOLUTION_ONE_DAY = 5;
   */
  ONE_DAY = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(Resolution)
proto3.util.setEnumType(Resolution, "enzyme.enzyme.v1.Resolution", [
  { no: 0, name: "RESOLUTION_UNSPECIFIED" },
  { no: 1, name: "RESOLUTION_FIVE_MINUTES" },
  { no: 2, name: "RESOLUTION_TEN_MINUTES" },
  { no: 3, name: "RESOLUTION_THIRTY_MINUTES" },
  { no: 4, name: "RESOLUTION_ONE_HOUR" },
  { no: 5, name: "RESOLUTION_ONE_DAY" },
]);

/**
 * Currency describes the currency that is used for all amounts and prices. 
 *
 * @generated from enum enzyme.enzyme.v1.Currency
 */
export enum Currency {
  /**
   * Unspecified currency: this will default to USD
   *
   * @generated from enum value: CURRENCY_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Australian Dollar
   *
   * @generated from enum value: CURRENCY_AUD = 1;
   */
  AUD = 1,

  /**
   * Bitcoin
   *
   * @generated from enum value: CURRENCY_BTC = 2;
   */
  BTC = 2,

  /**
   * Swiss Franc
   *
   * @generated from enum value: CURRENCY_CHF = 3;
   */
  CHF = 3,

  /**
   * Ether
   *
   * @generated from enum value: CURRENCY_ETH = 4;
   */
  ETH = 4,

  /**
   * Euro
   *
   * @generated from enum value: CURRENCY_EUR = 5;
   */
  EUR = 5,

  /**
   * British Pound
   *
   * @generated from enum value: CURRENCY_GBP = 6;
   */
  GBP = 6,

  /**
   * Japanese Yen
   *
   * @generated from enum value: CURRENCY_JPY = 7;
   */
  JPY = 7,

  /**
   * US Dollar
   *
   * @generated from enum value: CURRENCY_USD = 8;
   */
  USD = 8,
}
// Retrieve enum metadata with: proto3.getEnumType(Currency)
proto3.util.setEnumType(Currency, "enzyme.enzyme.v1.Currency", [
  { no: 0, name: "CURRENCY_UNSPECIFIED" },
  { no: 1, name: "CURRENCY_AUD" },
  { no: 2, name: "CURRENCY_BTC" },
  { no: 3, name: "CURRENCY_CHF" },
  { no: 4, name: "CURRENCY_ETH" },
  { no: 5, name: "CURRENCY_EUR" },
  { no: 6, name: "CURRENCY_GBP" },
  { no: 7, name: "CURRENCY_JPY" },
  { no: 8, name: "CURRENCY_USD" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.AddressListUpdateType
 */
export enum AddressListUpdateType {
  /**
   * @generated from enum value: ADDRESS_LIST_UPDATE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ADDRESS_LIST_UPDATE_TYPE_NONE = 1;
   */
  NONE = 1,

  /**
   * @generated from enum value: ADDRESS_LIST_UPDATE_TYPE_ADD_ONLY = 2;
   */
  ADD_ONLY = 2,

  /**
   * @generated from enum value: ADDRESS_LIST_UPDATE_TYPE_REMOVE_ONLY = 3;
   */
  REMOVE_ONLY = 3,

  /**
   * @generated from enum value: ADDRESS_LIST_UPDATE_TYPE_ADD_AND_REMOVE = 4;
   */
  ADD_AND_REMOVE = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(AddressListUpdateType)
proto3.util.setEnumType(AddressListUpdateType, "enzyme.enzyme.v1.AddressListUpdateType", [
  { no: 0, name: "ADDRESS_LIST_UPDATE_TYPE_UNSPECIFIED" },
  { no: 1, name: "ADDRESS_LIST_UPDATE_TYPE_NONE" },
  { no: 2, name: "ADDRESS_LIST_UPDATE_TYPE_ADD_ONLY" },
  { no: 3, name: "ADDRESS_LIST_UPDATE_TYPE_REMOVE_ONLY" },
  { no: 4, name: "ADDRESS_LIST_UPDATE_TYPE_ADD_AND_REMOVE" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.UintListUpdateType
 */
export enum UintListUpdateType {
  /**
   * @generated from enum value: UINT_LIST_UPDATE_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: UINT_LIST_UPDATE_TYPE_NONE = 1;
   */
  NONE = 1,

  /**
   * @generated from enum value: UINT_LIST_UPDATE_TYPE_ADD_ONLY = 2;
   */
  ADD_ONLY = 2,

  /**
   * @generated from enum value: UINT_LIST_UPDATE_TYPE_REMOVE_ONLY = 3;
   */
  REMOVE_ONLY = 3,

  /**
   * @generated from enum value: UINT_LIST_UPDATE_TYPE_ADD_AND_REMOVE = 4;
   */
  ADD_AND_REMOVE = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(UintListUpdateType)
proto3.util.setEnumType(UintListUpdateType, "enzyme.enzyme.v1.UintListUpdateType", [
  { no: 0, name: "UINT_LIST_UPDATE_TYPE_UNSPECIFIED" },
  { no: 1, name: "UINT_LIST_UPDATE_TYPE_NONE" },
  { no: 2, name: "UINT_LIST_UPDATE_TYPE_ADD_ONLY" },
  { no: 3, name: "UINT_LIST_UPDATE_TYPE_REMOVE_ONLY" },
  { no: 4, name: "UINT_LIST_UPDATE_TYPE_ADD_AND_REMOVE" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.ActivityType
 */
export enum ActivityType {
  /**
   * @generated from enum value: DEPOSITOR_SHARES = 0;
   */
  DEPOSITOR_SHARES = 0,

  /**
   * @generated from enum value: FEE_SHARES = 1;
   */
  FEE_SHARES = 1,

  /**
   * @generated from enum value: NETWORK_SETTINGS = 2;
   */
  NETWORK_SETTINGS = 2,

  /**
   * @generated from enum value: PROTOCOL_FEE = 3;
   */
  PROTOCOL_FEE = 3,

  /**
   * @generated from enum value: TRADE = 4;
   */
  TRADE = 4,

  /**
   * @generated from enum value: VAULT_SETTINGS = 5;
   */
  VAULT_SETTINGS = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(ActivityType)
proto3.util.setEnumType(ActivityType, "enzyme.enzyme.v1.ActivityType", [
  { no: 0, name: "DEPOSITOR_SHARES" },
  { no: 1, name: "FEE_SHARES" },
  { no: 2, name: "NETWORK_SETTINGS" },
  { no: 3, name: "PROTOCOL_FEE" },
  { no: 4, name: "TRADE" },
  { no: 5, name: "VAULT_SETTINGS" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.ActivityCategory
 */
export enum ActivityCategory {
  /**
   * @generated from enum value: ACTIVITY_CATEGORY_DEPOSITOR = 0;
   */
  DEPOSITOR = 0,

  /**
   * @generated from enum value: ACTIVITY_CATEGORY_NETWORK = 1;
   */
  NETWORK = 1,

  /**
   * @generated from enum value: ACTIVITY_CATEGORY_VAULT = 2;
   */
  VAULT = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(ActivityCategory)
proto3.util.setEnumType(ActivityCategory, "enzyme.enzyme.v1.ActivityCategory", [
  { no: 0, name: "ACTIVITY_CATEGORY_DEPOSITOR" },
  { no: 1, name: "ACTIVITY_CATEGORY_NETWORK" },
  { no: 2, name: "ACTIVITY_CATEGORY_VAULT" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.TradeType
 */
export enum TradeType {
  /**
   * @generated from enum value: TRADE_TYPE_ADD_TRACKED_ASSETS = 0;
   */
  ADD_TRACKED_ASSETS = 0,

  /**
   * @generated from enum value: TRADE_TYPE_APPROVE_ASSETS = 1;
   */
  APPROVE_ASSETS = 1,

  /**
   * @generated from enum value: TRADE_TYPE_CLAIM_REWARDS = 2;
   */
  CLAIM_REWARDS = 2,

  /**
   * @generated from enum value: TRADE_TYPE_CLAIM_REWARDS_AND_REINVEST = 3;
   */
  CLAIM_REWARDS_AND_REINVEST = 3,

  /**
   * @generated from enum value: TRADE_TYPE_CLAIM_REWARDS_AND_SWAP = 4;
   */
  CLAIM_REWARDS_AND_SWAP = 4,

  /**
   * @generated from enum value: TRADE_TYPE_LEND = 5;
   */
  LEND = 5,

  /**
   * @generated from enum value: TRADE_TYPE_LEND_AND_STAKE = 6;
   */
  LEND_AND_STAKE = 6,

  /**
   * @generated from enum value: TRADE_TYPE_REDEEM = 7;
   */
  REDEEM = 7,

  /**
   * @generated from enum value: TRADE_TYPE_REMOVE_TRACKED_ASSETS = 8;
   */
  REMOVE_TRACKED_ASSETS = 8,

  /**
   * @generated from enum value: TRADE_TYPE_STAKE = 9;
   */
  STAKE = 9,

  /**
   * @generated from enum value: TRADE_TYPE_TAKE_ORDER = 10;
   */
  TAKE_ORDER = 10,

  /**
   * @generated from enum value: TRADE_TYPE_UNKNOWN = 11;
   */
  UNKNOWN = 11,

  /**
   * @generated from enum value: TRADE_TYPE_UNSTAKE = 12;
   */
  UNSTAKE = 12,

  /**
   * @generated from enum value: TRADE_TYPE_UNSTAKE_AND_REDEEM = 13;
   */
  UNSTAKE_AND_REDEEM = 13,
}
// Retrieve enum metadata with: proto3.getEnumType(TradeType)
proto3.util.setEnumType(TradeType, "enzyme.enzyme.v1.TradeType", [
  { no: 0, name: "TRADE_TYPE_ADD_TRACKED_ASSETS" },
  { no: 1, name: "TRADE_TYPE_APPROVE_ASSETS" },
  { no: 2, name: "TRADE_TYPE_CLAIM_REWARDS" },
  { no: 3, name: "TRADE_TYPE_CLAIM_REWARDS_AND_REINVEST" },
  { no: 4, name: "TRADE_TYPE_CLAIM_REWARDS_AND_SWAP" },
  { no: 5, name: "TRADE_TYPE_LEND" },
  { no: 6, name: "TRADE_TYPE_LEND_AND_STAKE" },
  { no: 7, name: "TRADE_TYPE_REDEEM" },
  { no: 8, name: "TRADE_TYPE_REMOVE_TRACKED_ASSETS" },
  { no: 9, name: "TRADE_TYPE_STAKE" },
  { no: 10, name: "TRADE_TYPE_TAKE_ORDER" },
  { no: 11, name: "TRADE_TYPE_UNKNOWN" },
  { no: 12, name: "TRADE_TYPE_UNSTAKE" },
  { no: 13, name: "TRADE_TYPE_UNSTAKE_AND_REDEEM" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.AaveDebtPositionChangeType
 */
export enum AaveDebtPositionChangeType {
  /**
   * @generated from enum value: AAVE_DEBT_POSITION_CHANGE_TYPE_ADD_COLLATERAL = 0;
   */
  ADD_COLLATERAL = 0,

  /**
   * @generated from enum value: AAVE_DEBT_POSITION_CHANGE_TYPE_REMOVE_COLLATERAL = 1;
   */
  REMOVE_COLLATERAL = 1,

  /**
   * @generated from enum value: AAVE_DEBT_POSITION_CHANGE_TYPE_BORROW = 2;
   */
  BORROW = 2,

  /**
   * @generated from enum value: AAVE_DEBT_POSITION_CHANGE_TYPE_REPAY_BORROW = 3;
   */
  REPAY_BORROW = 3,

  /**
   * @generated from enum value: AAVE_DEBT_POSITION_CHANGE_TYPE_CLAIM_REWARDS = 4;
   */
  CLAIM_REWARDS = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(AaveDebtPositionChangeType)
proto3.util.setEnumType(AaveDebtPositionChangeType, "enzyme.enzyme.v1.AaveDebtPositionChangeType", [
  { no: 0, name: "AAVE_DEBT_POSITION_CHANGE_TYPE_ADD_COLLATERAL" },
  { no: 1, name: "AAVE_DEBT_POSITION_CHANGE_TYPE_REMOVE_COLLATERAL" },
  { no: 2, name: "AAVE_DEBT_POSITION_CHANGE_TYPE_BORROW" },
  { no: 3, name: "AAVE_DEBT_POSITION_CHANGE_TYPE_REPAY_BORROW" },
  { no: 4, name: "AAVE_DEBT_POSITION_CHANGE_TYPE_CLAIM_REWARDS" },
]);

/**
 * @generated from enum enzyme.enzyme.v1.AaveV3DebtPositionChangeType
 */
export enum AaveV3DebtPositionChangeType {
  /**
   * @generated from enum value: AAVE_V3_DEBT_POSITION_CHANGE_TYPE_ADD_COLLATERAL = 0;
   */
  ADD_COLLATERAL = 0,

  /**
   * @generated from enum value: AAVE_V3_DEBT_POSITION_CHANGE_TYPE_REMOVE_COLLATERAL = 1;
   */
  REMOVE_COLLATERAL = 1,

  /**
   * @generated from enum value: AAVE_V3_DEBT_POSITION_CHANGE_TYPE_BORROW = 2;
   */
  BORROW = 2,

  /**
   * @generated from enum value: AAVE_V3_DEBT_POSITION_CHANGE_TYPE_REPAY_BORROW = 3;
   */
  REPAY_BORROW = 3,

  /**
   * @generated from enum value: AAVE_V3_DEBT_POSITION_CHANGE_TYPE_SET_E_MODE = 4;
   */
  SET_E_MODE = 4,

  /**
   * @generated from enum value: AAVE_V3_DEBT_POSITION_CHANGE_TYPE_SET_USE_RESERVEAS_COLLATERAL = 5;
   */
  SET_USE_RESERVEAS_COLLATERAL = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(AaveV3DebtPositionChangeType)
proto3.util.setEnumType(AaveV3DebtPositionChangeType, "enzyme.enzyme.v1.AaveV3DebtPositionChangeType", [
  { no: 0, name: "AAVE_V3_DEBT_POSITION_CHANGE_TYPE_ADD_COLLATERAL" },
  { no: 1, name: "AAVE_V3_DEBT_POSITION_CHANGE_TYPE_REMOVE_COLLATERAL" },
  { no: 2, name: "AAVE_V3_DEBT_POSITION_CHANGE_TYPE_BORROW" },
  { no: 3, name: "AAVE_V3_DEBT_POSITION_CHANGE_TYPE_REPAY_BORROW" },
  { no: 4, name: "AAVE_V3_DEBT_POSITION_CHANGE_TYPE_SET_E_MODE" },
  { no: 5, name: "AAVE_V3_DEBT_POSITION_CHANGE_TYPE_SET_USE_RESERVEAS_COLLATERAL" },
]);

