// @generated by protoc-gen-es v1.4.1 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/external_position_item.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { AssetValue } from "./asset_value_pb.js";
import { AssetBalance } from "./asset_balance_pb.js";

/**
 * @generated from message enzyme.enzyme.v1.ExternalPositionItem
 */
export class ExternalPositionItem extends Message<ExternalPositionItem> {
  /**
   * The address of the external position
   *
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * The type of the external position
   *
   * @generated from field: string type = 2;
   */
  type = "";

  /**
   * The current value of the external position
   *
   * @generated from field: float value = 3;
   */
  value = 0;

  /**
   * The type id of the external position
   *
   * @generated from field: int32 type_id = 4;
   */
  typeId = 0;

  /**
   * The active status of the external position
   *
   * @generated from field: bool active = 5;
   */
  active = false;

  /**
   * The list of managed assets held by the external position
   *
   * @generated from field: repeated enzyme.enzyme.v1.AssetValue managed_assets = 6;
   */
  managedAssets: AssetValue[] = [];

  /**
   * The list of managed assets held by the external position
   *
   * @generated from field: repeated enzyme.enzyme.v1.AssetValue debt_assets = 7;
   */
  debtAssets: AssetValue[] = [];

  /**
   * Additional info about explicit external position type
   *
   * @generated from field: enzyme.enzyme.v1.ExternalPositionAdditionalInfo additional_info = 8;
   */
  additionalInfo?: ExternalPositionAdditionalInfo;

  constructor(data?: PartialMessage<ExternalPositionItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.ExternalPositionItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "type_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "active", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "managed_assets", kind: "message", T: AssetValue, repeated: true },
    { no: 7, name: "debt_assets", kind: "message", T: AssetValue, repeated: true },
    { no: 8, name: "additional_info", kind: "message", T: ExternalPositionAdditionalInfo },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExternalPositionItem {
    return new ExternalPositionItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExternalPositionItem {
    return new ExternalPositionItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExternalPositionItem {
    return new ExternalPositionItem().fromJsonString(jsonString, options);
  }

  static equals(a: ExternalPositionItem | PlainMessage<ExternalPositionItem> | undefined, b: ExternalPositionItem | PlainMessage<ExternalPositionItem> | undefined): boolean {
    return proto3.util.equals(ExternalPositionItem, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.ExternalPositionAdditionalInfo
 */
export class ExternalPositionAdditionalInfo extends Message<ExternalPositionAdditionalInfo> {
  /**
   * @generated from oneof enzyme.enzyme.v1.ExternalPositionAdditionalInfo.additional_info
   */
  additionalInfo: {
    /**
     * @generated from field: enzyme.enzyme.v1.ConvexVotingAdditionalInfo convex_voting = 1;
     */
    value: ConvexVotingAdditionalInfo;
    case: "convexVoting";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1.KilnStakingAdditionalInfo kiln_staking = 2;
     */
    value: KilnStakingAdditionalInfo;
    case: "kilnStaking";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1.TheGraphDelegationAdditionalInfo the_graph_delegation = 3;
     */
    value: TheGraphDelegationAdditionalInfo;
    case: "theGraphDelegation";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1.ArbitraryLoanAdditionalInfo arbitrary_loan = 4;
     */
    value: ArbitraryLoanAdditionalInfo;
    case: "arbitraryLoan";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1.UniswapV3LiquidityAdditionalInfo uniswap_v3_liquidity = 5;
     */
    value: UniswapV3LiquidityAdditionalInfo;
    case: "uniswapV3Liquidity";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1.MapleLiquidityAdditionalInfo maple_liquidity = 6;
     */
    value: MapleLiquidityAdditionalInfo;
    case: "mapleLiquidity";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ExternalPositionAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.ExternalPositionAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "convex_voting", kind: "message", T: ConvexVotingAdditionalInfo, oneof: "additional_info" },
    { no: 2, name: "kiln_staking", kind: "message", T: KilnStakingAdditionalInfo, oneof: "additional_info" },
    { no: 3, name: "the_graph_delegation", kind: "message", T: TheGraphDelegationAdditionalInfo, oneof: "additional_info" },
    { no: 4, name: "arbitrary_loan", kind: "message", T: ArbitraryLoanAdditionalInfo, oneof: "additional_info" },
    { no: 5, name: "uniswap_v3_liquidity", kind: "message", T: UniswapV3LiquidityAdditionalInfo, oneof: "additional_info" },
    { no: 6, name: "maple_liquidity", kind: "message", T: MapleLiquidityAdditionalInfo, oneof: "additional_info" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExternalPositionAdditionalInfo {
    return new ExternalPositionAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExternalPositionAdditionalInfo {
    return new ExternalPositionAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExternalPositionAdditionalInfo {
    return new ExternalPositionAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: ExternalPositionAdditionalInfo | PlainMessage<ExternalPositionAdditionalInfo> | undefined, b: ExternalPositionAdditionalInfo | PlainMessage<ExternalPositionAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(ExternalPositionAdditionalInfo, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.ConvexVotingLock
 */
export class ConvexVotingLock extends Message<ConvexVotingLock> {
  /**
   * The amount of locked tokens
   *
   * @generated from field: float amount = 1;
   */
  amount = 0;

  /**
   * The timestamp when the lock expires
   *
   * @generated from field: google.protobuf.Timestamp unlock_time = 2;
   */
  unlockTime?: Timestamp;

  /**
   * @generated from field: int32 epochs_inside_locker = 3;
   */
  epochsInsideLocker = 0;

  /**
   * Possible statuses: LOCKED, UNLOCKED, UNLOCKED_WITH_BOUNTY
   *
   * @generated from field: string status = 4;
   */
  status = "";

  constructor(data?: PartialMessage<ConvexVotingLock>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.ConvexVotingLock";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "amount", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 2, name: "unlock_time", kind: "message", T: Timestamp },
    { no: 3, name: "epochs_inside_locker", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConvexVotingLock {
    return new ConvexVotingLock().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConvexVotingLock {
    return new ConvexVotingLock().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConvexVotingLock {
    return new ConvexVotingLock().fromJsonString(jsonString, options);
  }

  static equals(a: ConvexVotingLock | PlainMessage<ConvexVotingLock> | undefined, b: ConvexVotingLock | PlainMessage<ConvexVotingLock> | undefined): boolean {
    return proto3.util.equals(ConvexVotingLock, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.ConvexVotingAdditionalInfo
 */
export class ConvexVotingAdditionalInfo extends Message<ConvexVotingAdditionalInfo> {
  /**
   * The address of the convex voting delegate
   *
   * @generated from field: string delegate = 1;
   */
  delegate = "";

  /**
   * The list of locks
   *
   * @generated from field: repeated enzyme.enzyme.v1.ConvexVotingLock locks = 2;
   */
  locks: ConvexVotingLock[] = [];

  constructor(data?: PartialMessage<ConvexVotingAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.ConvexVotingAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "delegate", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "locks", kind: "message", T: ConvexVotingLock, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConvexVotingAdditionalInfo {
    return new ConvexVotingAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConvexVotingAdditionalInfo {
    return new ConvexVotingAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConvexVotingAdditionalInfo {
    return new ConvexVotingAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: ConvexVotingAdditionalInfo | PlainMessage<ConvexVotingAdditionalInfo> | undefined, b: ConvexVotingAdditionalInfo | PlainMessage<ConvexVotingAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(ConvexVotingAdditionalInfo, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.KilnStakingAdditionalInfo
 */
export class KilnStakingAdditionalInfo extends Message<KilnStakingAdditionalInfo> {
  /**
   * The validator count
   *
   * @generated from field: int32 validator_count = 1;
   */
  validatorCount = 0;

  /**
   * The list of validators public keys
   *
   * @generated from field: repeated string validators_public_keys = 2;
   */
  validatorsPublicKeys: string[] = [];

  constructor(data?: PartialMessage<KilnStakingAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.KilnStakingAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "validator_count", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "validators_public_keys", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): KilnStakingAdditionalInfo {
    return new KilnStakingAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): KilnStakingAdditionalInfo {
    return new KilnStakingAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): KilnStakingAdditionalInfo {
    return new KilnStakingAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: KilnStakingAdditionalInfo | PlainMessage<KilnStakingAdditionalInfo> | undefined, b: KilnStakingAdditionalInfo | PlainMessage<KilnStakingAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(KilnStakingAdditionalInfo, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.TheGraphDelegationPositionDelegation
 */
export class TheGraphDelegationPositionDelegation extends Message<TheGraphDelegationPositionDelegation> {
  /**
   * The address of indexer that the delegation is made to
   *
   * @generated from field: string indexer = 1;
   */
  indexer = "";

  /**
   * The name of indexer
   *
   * @generated from field: string indexer_name = 2;
   */
  indexerName = "";

  /**
   * The amount of indexer's shares
   *
   * @generated from field: float shares = 3;
   */
  shares = 0;

  /**
   * The amount of GRT tokens delegated to the indexer
   *
   * @generated from field: float grt_delegated = 4;
   */
  grtDelegated = 0;

  /**
   * The amount of GRT tokens locked in the delegation, in the 28-days unbouding period
   *
   * @generated from field: float grt_locked = 5;
   */
  grtLocked = 0;

  /**
   * Timestamp when the locked period ends
   *
   * @generated from field: google.protobuf.Timestamp grt_locked_until = 6;
   */
  grtLockedUntil?: Timestamp;

  /**
   * The number of GRT tokens unlocked in the delegation, that is ready to be withdrawn or re-delegated
   *
   * @generated from field: float grt_unlocked = 7;
   */
  grtUnlocked = 0;

  constructor(data?: PartialMessage<TheGraphDelegationPositionDelegation>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.TheGraphDelegationPositionDelegation";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "indexer", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "indexer_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "shares", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "grt_delegated", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "grt_locked", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 6, name: "grt_locked_until", kind: "message", T: Timestamp },
    { no: 7, name: "grt_unlocked", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TheGraphDelegationPositionDelegation {
    return new TheGraphDelegationPositionDelegation().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TheGraphDelegationPositionDelegation {
    return new TheGraphDelegationPositionDelegation().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TheGraphDelegationPositionDelegation {
    return new TheGraphDelegationPositionDelegation().fromJsonString(jsonString, options);
  }

  static equals(a: TheGraphDelegationPositionDelegation | PlainMessage<TheGraphDelegationPositionDelegation> | undefined, b: TheGraphDelegationPositionDelegation | PlainMessage<TheGraphDelegationPositionDelegation> | undefined): boolean {
    return proto3.util.equals(TheGraphDelegationPositionDelegation, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.TheGraphDelegationAdditionalInfo
 */
export class TheGraphDelegationAdditionalInfo extends Message<TheGraphDelegationAdditionalInfo> {
  /**
   * The list of delegations
   *
   * @generated from field: repeated enzyme.enzyme.v1.TheGraphDelegationPositionDelegation delegations = 1;
   */
  delegations: TheGraphDelegationPositionDelegation[] = [];

  constructor(data?: PartialMessage<TheGraphDelegationAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.TheGraphDelegationAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "delegations", kind: "message", T: TheGraphDelegationPositionDelegation, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TheGraphDelegationAdditionalInfo {
    return new TheGraphDelegationAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TheGraphDelegationAdditionalInfo {
    return new TheGraphDelegationAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TheGraphDelegationAdditionalInfo {
    return new TheGraphDelegationAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: TheGraphDelegationAdditionalInfo | PlainMessage<TheGraphDelegationAdditionalInfo> | undefined, b: TheGraphDelegationAdditionalInfo | PlainMessage<TheGraphDelegationAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(TheGraphDelegationAdditionalInfo, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.ArbitraryLoanAdditionalInfo
 */
export class ArbitraryLoanAdditionalInfo extends Message<ArbitraryLoanAdditionalInfo> {
  /**
   * The address of the loan asset
   *
   * @generated from field: string loan_asset = 1;
   */
  loanAsset = "";

  /**
   * The amount that is possible to borrow
   *
   * @generated from field: float borrowable_amount = 2;
   */
  borrowableAmount = 0;

  /**
   * Loan description
   *
   * @generated from field: string description = 3;
   */
  description = "";

  /**
   * The address of the borrower
   *
   * @generated from field: string borrower = 4;
   */
  borrower = "";

  /**
   * Whether the loan is closed
   *
   * @generated from field: bool is_closed = 5;
   */
  isClosed = false;

  /**
   * Total borrowed amount through history of the loan
   *
   * @generated from field: float total_borrowed_amount = 6;
   */
  totalBorrowedAmount = 0;

  /**
   * Total repaid amount through history of the loan
   *
   * @generated from field: float total_repaid_amount = 7;
   */
  totalRepaidAmount = 0;

  /**
   * Amount left to repay
   *
   * @generated from field: float amount_to_repay = 8;
   */
  amountToRepay = 0;

  constructor(data?: PartialMessage<ArbitraryLoanAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.ArbitraryLoanAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "loan_asset", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "borrowable_amount", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "borrower", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "is_closed", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "total_borrowed_amount", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 7, name: "total_repaid_amount", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 8, name: "amount_to_repay", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ArbitraryLoanAdditionalInfo {
    return new ArbitraryLoanAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ArbitraryLoanAdditionalInfo {
    return new ArbitraryLoanAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ArbitraryLoanAdditionalInfo {
    return new ArbitraryLoanAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: ArbitraryLoanAdditionalInfo | PlainMessage<ArbitraryLoanAdditionalInfo> | undefined, b: ArbitraryLoanAdditionalInfo | PlainMessage<ArbitraryLoanAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(ArbitraryLoanAdditionalInfo, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.UniswapV3LiquidityPosition
 */
export class UniswapV3LiquidityPosition extends Message<UniswapV3LiquidityPosition> {
  /**
   * First token of the pool
   *
   * @generated from field: string token_first = 1;
   */
  tokenFirst = "";

  /**
   * Second token of the pool
   *
   * @generated from field: string token_second = 2;
   */
  tokenSecond = "";

  /**
   * The URI of the nft
   *
   * @generated from field: string token_uri = 3;
   */
  tokenUri = "";

  /**
   * The fee collected by the pool
   *
   * @generated from field: float fee = 4;
   */
  fee = 0;

  /**
   * The address of the pool
   *
   * @generated from field: string pool_address = 5;
   */
  poolAddress = "";

  /**
   * The liquidity of the position supplied by the user
   *
   * @generated from field: float liquidity = 6;
   */
  liquidity = 0;

  /**
   * The id of the nft
   *
   * @generated from field: int32 nft_id = 7;
   */
  nftId = 0;

  /**
   * The lower tick of the position
   *
   * @generated from field: int32 tick_lower = 8;
   */
  tickLower = 0;

  /**
   * The upper tick of the position
   *
   * @generated from field: int32 tick_upper = 9;
   */
  tickUpper = 0;

  constructor(data?: PartialMessage<UniswapV3LiquidityPosition>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.UniswapV3LiquidityPosition";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "token_first", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "token_second", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "token_uri", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "fee", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "pool_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "liquidity", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 7, name: "nft_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "tick_lower", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "tick_upper", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UniswapV3LiquidityPosition {
    return new UniswapV3LiquidityPosition().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UniswapV3LiquidityPosition {
    return new UniswapV3LiquidityPosition().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UniswapV3LiquidityPosition {
    return new UniswapV3LiquidityPosition().fromJsonString(jsonString, options);
  }

  static equals(a: UniswapV3LiquidityPosition | PlainMessage<UniswapV3LiquidityPosition> | undefined, b: UniswapV3LiquidityPosition | PlainMessage<UniswapV3LiquidityPosition> | undefined): boolean {
    return proto3.util.equals(UniswapV3LiquidityPosition, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.UniswapV3LiquidityAdditionalInfo
 */
export class UniswapV3LiquidityAdditionalInfo extends Message<UniswapV3LiquidityAdditionalInfo> {
  /**
   * The list of positions represented as nfts
   *
   * @generated from field: repeated enzyme.enzyme.v1.UniswapV3LiquidityPosition positions = 1;
   */
  positions: UniswapV3LiquidityPosition[] = [];

  constructor(data?: PartialMessage<UniswapV3LiquidityAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.UniswapV3LiquidityAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "positions", kind: "message", T: UniswapV3LiquidityPosition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UniswapV3LiquidityAdditionalInfo {
    return new UniswapV3LiquidityAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UniswapV3LiquidityAdditionalInfo {
    return new UniswapV3LiquidityAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UniswapV3LiquidityAdditionalInfo {
    return new UniswapV3LiquidityAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: UniswapV3LiquidityAdditionalInfo | PlainMessage<UniswapV3LiquidityAdditionalInfo> | undefined, b: UniswapV3LiquidityAdditionalInfo | PlainMessage<UniswapV3LiquidityAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(UniswapV3LiquidityAdditionalInfo, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.MapleLiquidityPosition
 */
export class MapleLiquidityPosition extends Message<MapleLiquidityPosition> {
  /**
   * The address of the pool
   *
   * @generated from field: string pool_address = 1;
   */
  poolAddress = "";

  /**
   * The name of the pool
   *
   * @generated from field: string pool_name = 2;
   */
  poolName = "";

  /**
   * The liquidity of the position supplied by the user
   *
   * @generated from field: enzyme.enzyme.v1.AssetBalance liquidity_asset_balance = 3;
   */
  liquidityAssetBalance?: AssetBalance;

  constructor(data?: PartialMessage<MapleLiquidityPosition>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.MapleLiquidityPosition";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pool_address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "pool_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "liquidity_asset_balance", kind: "message", T: AssetBalance },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MapleLiquidityPosition {
    return new MapleLiquidityPosition().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MapleLiquidityPosition {
    return new MapleLiquidityPosition().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MapleLiquidityPosition {
    return new MapleLiquidityPosition().fromJsonString(jsonString, options);
  }

  static equals(a: MapleLiquidityPosition | PlainMessage<MapleLiquidityPosition> | undefined, b: MapleLiquidityPosition | PlainMessage<MapleLiquidityPosition> | undefined): boolean {
    return proto3.util.equals(MapleLiquidityPosition, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1.MapleLiquidityAdditionalInfo
 */
export class MapleLiquidityAdditionalInfo extends Message<MapleLiquidityAdditionalInfo> {
  /**
   * all maple pools in which the user has liquidity
   *
   * @generated from field: repeated enzyme.enzyme.v1.MapleLiquidityPosition positions = 1;
   */
  positions: MapleLiquidityPosition[] = [];

  constructor(data?: PartialMessage<MapleLiquidityAdditionalInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.MapleLiquidityAdditionalInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "positions", kind: "message", T: MapleLiquidityPosition, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MapleLiquidityAdditionalInfo {
    return new MapleLiquidityAdditionalInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MapleLiquidityAdditionalInfo {
    return new MapleLiquidityAdditionalInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MapleLiquidityAdditionalInfo {
    return new MapleLiquidityAdditionalInfo().fromJsonString(jsonString, options);
  }

  static equals(a: MapleLiquidityAdditionalInfo | PlainMessage<MapleLiquidityAdditionalInfo> | undefined, b: MapleLiquidityAdditionalInfo | PlainMessage<MapleLiquidityAdditionalInfo> | undefined): boolean {
    return proto3.util.equals(MapleLiquidityAdditionalInfo, a, b);
  }
}

