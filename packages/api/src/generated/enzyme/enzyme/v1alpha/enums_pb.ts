// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1alpha/enums.proto (package enzyme.enzyme.v1alpha, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * Release describes a specific Enzyme Protocol release. 
 *
 * @generated from enum enzyme.enzyme.v1alpha.Release
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
proto3.util.setEnumType(Release, "enzyme.enzyme.v1alpha.Release", [
  { no: 0, name: "RELEASE_UNSPECIFIED" },
  { no: 1, name: "RELEASE_PHOENIX" },
  { no: 2, name: "RELEASE_ENCORE" },
  { no: 3, name: "RELEASE_SULU" },
]);

/**
 * Network describes a network on which the Enzyme Protocol has been deployed. 
 *
 * @generated from enum enzyme.enzyme.v1alpha.Network
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
proto3.util.setEnumType(Network, "enzyme.enzyme.v1alpha.Network", [
  { no: 0, name: "NETWORK_UNSPECIFIED" },
  { no: 1, name: "NETWORK_ETHEREUM" },
  { no: 2, name: "NETWORK_POLYGON" },
]);

/**
 * Deployment describes a specific deployment of the Enzyme Protocol. 
 *
 * @generated from enum enzyme.enzyme.v1alpha.Deployment
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
proto3.util.setEnumType(Deployment, "enzyme.enzyme.v1alpha.Deployment", [
  { no: 0, name: "DEPLOYMENT_UNSPECIFIED" },
  { no: 1, name: "DEPLOYMENT_ETHEREUM" },
  { no: 2, name: "DEPLOYMENT_POLYGON" },
  { no: 3, name: "DEPLOYMENT_TESTNET" },
]);

/**
 * Resolution describes the time resolution for time series data. 
 *
 * @generated from enum enzyme.enzyme.v1alpha.Resolution
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
proto3.util.setEnumType(Resolution, "enzyme.enzyme.v1alpha.Resolution", [
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
 * @generated from enum enzyme.enzyme.v1alpha.Currency
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
proto3.util.setEnumType(Currency, "enzyme.enzyme.v1alpha.Currency", [
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
 * @generated from enum enzyme.enzyme.v1alpha.AddressListUpdateType
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
proto3.util.setEnumType(AddressListUpdateType, "enzyme.enzyme.v1alpha.AddressListUpdateType", [
  { no: 0, name: "ADDRESS_LIST_UPDATE_TYPE_UNSPECIFIED" },
  { no: 1, name: "ADDRESS_LIST_UPDATE_TYPE_NONE" },
  { no: 2, name: "ADDRESS_LIST_UPDATE_TYPE_ADD_ONLY" },
  { no: 3, name: "ADDRESS_LIST_UPDATE_TYPE_REMOVE_ONLY" },
  { no: 4, name: "ADDRESS_LIST_UPDATE_TYPE_ADD_AND_REMOVE" },
]);

/**
 * @generated from enum enzyme.enzyme.v1alpha.UintListUpdateType
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
proto3.util.setEnumType(UintListUpdateType, "enzyme.enzyme.v1alpha.UintListUpdateType", [
  { no: 0, name: "UINT_LIST_UPDATE_TYPE_UNSPECIFIED" },
  { no: 1, name: "UINT_LIST_UPDATE_TYPE_NONE" },
  { no: 2, name: "UINT_LIST_UPDATE_TYPE_ADD_ONLY" },
  { no: 3, name: "UINT_LIST_UPDATE_TYPE_REMOVE_ONLY" },
  { no: 4, name: "UINT_LIST_UPDATE_TYPE_ADD_AND_REMOVE" },
]);

