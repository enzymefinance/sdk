// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/enums.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc } from "@bufbuild/protobuf/codegenv1";

/**
 * Describes the file enzyme/enzyme/v1/enums.proto.
 */
export const file_enzyme_enzyme_v1_enums: GenFile = /*@__PURE__*/
  fileDesc("Chxlbnp5bWUvZW56eW1lL3YxL2VudW1zLnByb3RvEhBlbnp5bWUuZW56eW1lLnYxKl0KB1JlbGVhc2USFwoTUkVMRUFTRV9VTlNQRUNJRklFRBAAEhMKD1JFTEVBU0VfUEhPRU5JWBABEhIKDlJFTEVBU0VfRU5DT1JFEAISEAoMUkVMRUFTRV9TVUxVEAMqTQoHTmV0d29yaxIXChNORVRXT1JLX1VOU1BFQ0lGSUVEEAASFAoQTkVUV09SS19FVEhFUkVVTRABEhMKD05FVFdPUktfUE9MWUdPThACKnEKCkRlcGxveW1lbnQSGgoWREVQTE9ZTUVOVF9VTlNQRUNJRklFRBAAEhcKE0RFUExPWU1FTlRfRVRIRVJFVU0QARIWChJERVBMT1lNRU5UX1BPTFlHT04QAhIWChJERVBMT1lNRU5UX1RFU1RORVQQAyqxAQoKUmVzb2x1dGlvbhIaChZSRVNPTFVUSU9OX1VOU1BFQ0lGSUVEEAASGwoXUkVTT0xVVElPTl9GSVZFX01JTlVURVMQARIaChZSRVNPTFVUSU9OX1RFTl9NSU5VVEVTEAISHQoZUkVTT0xVVElPTl9USElSVFlfTUlOVVRFUxADEhcKE1JFU09MVVRJT05fT05FX0hPVVIQBBIWChJSRVNPTFVUSU9OX09ORV9EQVkQBSq0AQoIQ3VycmVuY3kSGAoUQ1VSUkVOQ1lfVU5TUEVDSUZJRUQQABIQCgxDVVJSRU5DWV9BVUQQARIQCgxDVVJSRU5DWV9CVEMQAhIQCgxDVVJSRU5DWV9DSEYQAxIQCgxDVVJSRU5DWV9FVEgQBBIQCgxDVVJSRU5DWV9FVVIQBRIQCgxDVVJSRU5DWV9HQlAQBhIQCgxDVVJSRU5DWV9KUFkQBxIQCgxDVVJSRU5DWV9VU0QQCCriAQoVQWRkcmVzc0xpc3RVcGRhdGVUeXBlEigKJEFERFJFU1NfTElTVF9VUERBVEVfVFlQRV9VTlNQRUNJRklFRBAAEiEKHUFERFJFU1NfTElTVF9VUERBVEVfVFlQRV9OT05FEAESJQohQUREUkVTU19MSVNUX1VQREFURV9UWVBFX0FERF9PTkxZEAISKAokQUREUkVTU19MSVNUX1VQREFURV9UWVBFX1JFTU9WRV9PTkxZEAMSKwonQUREUkVTU19MSVNUX1VQREFURV9UWVBFX0FERF9BTkRfUkVNT1ZFEAQq0AEKElVpbnRMaXN0VXBkYXRlVHlwZRIlCiFVSU5UX0xJU1RfVVBEQVRFX1RZUEVfVU5TUEVDSUZJRUQQABIeChpVSU5UX0xJU1RfVVBEQVRFX1RZUEVfTk9ORRABEiIKHlVJTlRfTElTVF9VUERBVEVfVFlQRV9BRERfT05MWRACEiUKIVVJTlRfTElTVF9VUERBVEVfVFlQRV9SRU1PVkVfT05MWRADEigKJFVJTlRfTElTVF9VUERBVEVfVFlQRV9BRERfQU5EX1JFTU9WRRAEKnsKDEFjdGl2aXR5VHlwZRIUChBERVBPU0lUT1JfU0hBUkVTEAASDgoKRkVFX1NIQVJFUxABEhQKEE5FVFdPUktfU0VUVElOR1MQAhIQCgxQUk9UT0NPTF9GRUUQAxIJCgVUUkFERRAEEhIKDlZBVUxUX1NFVFRJTkdTEAUqbwoQQWN0aXZpdHlDYXRlZ29yeRIfChtBQ1RJVklUWV9DQVRFR09SWV9ERVBPU0lUT1IQABIdChlBQ1RJVklUWV9DQVRFR09SWV9ORVRXT1JLEAESGwoXQUNUSVZJVFlfQ0FURUdPUllfVkFVTFQQAiqyAwoJVHJhZGVUeXBlEiEKHVRSQURFX1RZUEVfQUREX1RSQUNLRURfQVNTRVRTEAASHQoZVFJBREVfVFlQRV9BUFBST1ZFX0FTU0VUUxABEhwKGFRSQURFX1RZUEVfQ0xBSU1fUkVXQVJEUxACEikKJVRSQURFX1RZUEVfQ0xBSU1fUkVXQVJEU19BTkRfUkVJTlZFU1QQAxIlCiFUUkFERV9UWVBFX0NMQUlNX1JFV0FSRFNfQU5EX1NXQVAQBBITCg9UUkFERV9UWVBFX0xFTkQQBRIdChlUUkFERV9UWVBFX0xFTkRfQU5EX1NUQUtFEAYSFQoRVFJBREVfVFlQRV9SRURFRU0QBxIkCiBUUkFERV9UWVBFX1JFTU9WRV9UUkFDS0VEX0FTU0VUUxAIEhQKEFRSQURFX1RZUEVfU1RBS0UQCRIZChVUUkFERV9UWVBFX1RBS0VfT1JERVIQChIWChJUUkFERV9UWVBFX1VOS05PV04QCxIWChJUUkFERV9UWVBFX1VOU1RBS0UQDBIhCh1UUkFERV9UWVBFX1VOU1RBS0VfQU5EX1JFREVFTRANKpMCChpBYXZlRGVidFBvc2l0aW9uQ2hhbmdlVHlwZRIxCi1BQVZFX0RFQlRfUE9TSVRJT05fQ0hBTkdFX1RZUEVfQUREX0NPTExBVEVSQUwQABI0CjBBQVZFX0RFQlRfUE9TSVRJT05fQ0hBTkdFX1RZUEVfUkVNT1ZFX0NPTExBVEVSQUwQARIpCiVBQVZFX0RFQlRfUE9TSVRJT05fQ0hBTkdFX1RZUEVfQk9SUk9XEAISLworQUFWRV9ERUJUX1BPU0lUSU9OX0NIQU5HRV9UWVBFX1JFUEFZX0JPUlJPVxADEjAKLEFBVkVfREVCVF9QT1NJVElPTl9DSEFOR0VfVFlQRV9DTEFJTV9SRVdBUkRTEAQq5QIKHEFhdmVWM0RlYnRQb3NpdGlvbkNoYW5nZVR5cGUSNAowQUFWRV9WM19ERUJUX1BPU0lUSU9OX0NIQU5HRV9UWVBFX0FERF9DT0xMQVRFUkFMEAASNwozQUFWRV9WM19ERUJUX1BPU0lUSU9OX0NIQU5HRV9UWVBFX1JFTU9WRV9DT0xMQVRFUkFMEAESLAooQUFWRV9WM19ERUJUX1BPU0lUSU9OX0NIQU5HRV9UWVBFX0JPUlJPVxACEjIKLkFBVkVfVjNfREVCVF9QT1NJVElPTl9DSEFOR0VfVFlQRV9SRVBBWV9CT1JST1cQAxIwCixBQVZFX1YzX0RFQlRfUE9TSVRJT05fQ0hBTkdFX1RZUEVfU0VUX0VfTU9ERRAEEkIKPkFBVkVfVjNfREVCVF9QT1NJVElPTl9DSEFOR0VfVFlQRV9TRVRfVVNFX1JFU0VSVkVBU19DT0xMQVRFUkFMEAVChAEKFGNvbS5lbnp5bWUuZW56eW1lLnYxQgpFbnVtc1Byb3RvUAGiAgNFRViqAhBFbnp5bWUuRW56eW1lLlYxygIQRW56eW1lXEVuenltZVxWMeICHEVuenltZVxFbnp5bWVcVjFcR1BCTWV0YWRhdGHqAhJFbnp5bWU6OkVuenltZTo6VjFiBnByb3RvMw");

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

/**
 * Describes the enum enzyme.enzyme.v1.Release.
 */
export const ReleaseSchema: GenEnum<Release> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 0);

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

/**
 * Describes the enum enzyme.enzyme.v1.Network.
 */
export const NetworkSchema: GenEnum<Network> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 1);

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

/**
 * Describes the enum enzyme.enzyme.v1.Deployment.
 */
export const DeploymentSchema: GenEnum<Deployment> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 2);

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

/**
 * Describes the enum enzyme.enzyme.v1.Resolution.
 */
export const ResolutionSchema: GenEnum<Resolution> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 3);

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

/**
 * Describes the enum enzyme.enzyme.v1.Currency.
 */
export const CurrencySchema: GenEnum<Currency> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 4);

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

/**
 * Describes the enum enzyme.enzyme.v1.AddressListUpdateType.
 */
export const AddressListUpdateTypeSchema: GenEnum<AddressListUpdateType> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 5);

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

/**
 * Describes the enum enzyme.enzyme.v1.UintListUpdateType.
 */
export const UintListUpdateTypeSchema: GenEnum<UintListUpdateType> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 6);

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

/**
 * Describes the enum enzyme.enzyme.v1.ActivityType.
 */
export const ActivityTypeSchema: GenEnum<ActivityType> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 7);

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

/**
 * Describes the enum enzyme.enzyme.v1.ActivityCategory.
 */
export const ActivityCategorySchema: GenEnum<ActivityCategory> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 8);

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

/**
 * Describes the enum enzyme.enzyme.v1.TradeType.
 */
export const TradeTypeSchema: GenEnum<TradeType> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 9);

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

/**
 * Describes the enum enzyme.enzyme.v1.AaveDebtPositionChangeType.
 */
export const AaveDebtPositionChangeTypeSchema: GenEnum<AaveDebtPositionChangeType> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 10);

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

/**
 * Describes the enum enzyme.enzyme.v1.AaveV3DebtPositionChangeType.
 */
export const AaveV3DebtPositionChangeTypeSchema: GenEnum<AaveV3DebtPositionChangeType> = /*@__PURE__*/
  enumDesc(file_enzyme_enzyme_v1_enums, 11);

