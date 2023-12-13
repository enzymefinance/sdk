// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1alpha/fee_configuration.proto (package enzyme.enzyme.v1alpha, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1alpha.FeeConfiguration
 */
export class FeeConfiguration extends Message<FeeConfiguration> {
  /**
   * @generated from oneof enzyme.enzyme.v1alpha.FeeConfiguration.fee
   */
  fee: {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.ManagementFeeConfiguration management_fee = 1;
     */
    value: ManagementFeeConfiguration;
    case: "managementFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.PerformanceFeeConfiguration performance_fee = 2;
     */
    value: PerformanceFeeConfiguration;
    case: "performanceFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.EntranceRateBurnFeeConfiguration entrance_rate_burn_fee = 3;
     */
    value: EntranceRateBurnFeeConfiguration;
    case: "entranceRateBurnFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.EntranceRateDirectFeeConfiguration entrance_rate_direct_fee = 4;
     */
    value: EntranceRateDirectFeeConfiguration;
    case: "entranceRateDirectFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.ExitRateBurnFeeConfiguration exit_rate_burn_fee = 5;
     */
    value: ExitRateBurnFeeConfiguration;
    case: "exitRateBurnFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.ExitRateDirectFeeConfiguration exit_rate_direct_fee = 6;
     */
    value: ExitRateDirectFeeConfiguration;
    case: "exitRateDirectFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.MinSharesSupplyFeeConfiguration min_shares_supply_fee = 7;
     */
    value: MinSharesSupplyFeeConfiguration;
    case: "minSharesSupplyFee";
  } | {
    /**
     * @generated from field: enzyme.enzyme.v1alpha.UnknownFeeConfiguration unknown_fee = 999;
     */
    value: UnknownFeeConfiguration;
    case: "unknownFee";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<FeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.FeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "management_fee", kind: "message", T: ManagementFeeConfiguration, oneof: "fee" },
    { no: 2, name: "performance_fee", kind: "message", T: PerformanceFeeConfiguration, oneof: "fee" },
    { no: 3, name: "entrance_rate_burn_fee", kind: "message", T: EntranceRateBurnFeeConfiguration, oneof: "fee" },
    { no: 4, name: "entrance_rate_direct_fee", kind: "message", T: EntranceRateDirectFeeConfiguration, oneof: "fee" },
    { no: 5, name: "exit_rate_burn_fee", kind: "message", T: ExitRateBurnFeeConfiguration, oneof: "fee" },
    { no: 6, name: "exit_rate_direct_fee", kind: "message", T: ExitRateDirectFeeConfiguration, oneof: "fee" },
    { no: 7, name: "min_shares_supply_fee", kind: "message", T: MinSharesSupplyFeeConfiguration, oneof: "fee" },
    { no: 999, name: "unknown_fee", kind: "message", T: UnknownFeeConfiguration, oneof: "fee" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FeeConfiguration {
    return new FeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FeeConfiguration {
    return new FeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FeeConfiguration {
    return new FeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: FeeConfiguration | PlainMessage<FeeConfiguration> | undefined, b: FeeConfiguration | PlainMessage<FeeConfiguration> | undefined): boolean {
    return proto3.util.equals(FeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.ManagementFeeConfiguration
 */
export class ManagementFeeConfiguration extends Message<ManagementFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: float rate = 2;
   */
  rate = 0;

  /**
   * @generated from field: string recipient = 3;
   */
  recipient = "";

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 4;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<ManagementFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.ManagementFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "recipient", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ManagementFeeConfiguration {
    return new ManagementFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ManagementFeeConfiguration {
    return new ManagementFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ManagementFeeConfiguration {
    return new ManagementFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: ManagementFeeConfiguration | PlainMessage<ManagementFeeConfiguration> | undefined, b: ManagementFeeConfiguration | PlainMessage<ManagementFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(ManagementFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.PerformanceFeeConfiguration
 */
export class PerformanceFeeConfiguration extends Message<PerformanceFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: float rate = 2;
   */
  rate = 0;

  /**
   * @generated from field: string recipient = 3;
   */
  recipient = "";

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 4;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<PerformanceFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.PerformanceFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "recipient", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PerformanceFeeConfiguration {
    return new PerformanceFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PerformanceFeeConfiguration {
    return new PerformanceFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PerformanceFeeConfiguration {
    return new PerformanceFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: PerformanceFeeConfiguration | PlainMessage<PerformanceFeeConfiguration> | undefined, b: PerformanceFeeConfiguration | PlainMessage<PerformanceFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(PerformanceFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.EntranceRateBurnFeeConfiguration
 */
export class EntranceRateBurnFeeConfiguration extends Message<EntranceRateBurnFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: float rate = 2;
   */
  rate = 0;

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 3;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<EntranceRateBurnFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.EntranceRateBurnFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EntranceRateBurnFeeConfiguration {
    return new EntranceRateBurnFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EntranceRateBurnFeeConfiguration {
    return new EntranceRateBurnFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EntranceRateBurnFeeConfiguration {
    return new EntranceRateBurnFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: EntranceRateBurnFeeConfiguration | PlainMessage<EntranceRateBurnFeeConfiguration> | undefined, b: EntranceRateBurnFeeConfiguration | PlainMessage<EntranceRateBurnFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(EntranceRateBurnFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.EntranceRateDirectFeeConfiguration
 */
export class EntranceRateDirectFeeConfiguration extends Message<EntranceRateDirectFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: float rate = 2;
   */
  rate = 0;

  /**
   * @generated from field: string recipient = 3;
   */
  recipient = "";

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 4;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<EntranceRateDirectFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.EntranceRateDirectFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "recipient", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EntranceRateDirectFeeConfiguration {
    return new EntranceRateDirectFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EntranceRateDirectFeeConfiguration {
    return new EntranceRateDirectFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EntranceRateDirectFeeConfiguration {
    return new EntranceRateDirectFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: EntranceRateDirectFeeConfiguration | PlainMessage<EntranceRateDirectFeeConfiguration> | undefined, b: EntranceRateDirectFeeConfiguration | PlainMessage<EntranceRateDirectFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(EntranceRateDirectFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.ExitRateBurnFeeConfiguration
 */
export class ExitRateBurnFeeConfiguration extends Message<ExitRateBurnFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: float in_kind_rate = 2;
   */
  inKindRate = 0;

  /**
   * @generated from field: float specific_assets_rate = 3;
   */
  specificAssetsRate = 0;

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 4;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<ExitRateBurnFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.ExitRateBurnFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "in_kind_rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "specific_assets_rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExitRateBurnFeeConfiguration {
    return new ExitRateBurnFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExitRateBurnFeeConfiguration {
    return new ExitRateBurnFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExitRateBurnFeeConfiguration {
    return new ExitRateBurnFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: ExitRateBurnFeeConfiguration | PlainMessage<ExitRateBurnFeeConfiguration> | undefined, b: ExitRateBurnFeeConfiguration | PlainMessage<ExitRateBurnFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(ExitRateBurnFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.ExitRateDirectFeeConfiguration
 */
export class ExitRateDirectFeeConfiguration extends Message<ExitRateDirectFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: float in_kind_rate = 2;
   */
  inKindRate = 0;

  /**
   * @generated from field: float specific_assets_rate = 3;
   */
  specificAssetsRate = 0;

  /**
   * @generated from field: string recipient = 4;
   */
  recipient = "";

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 5;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<ExitRateDirectFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.ExitRateDirectFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "in_kind_rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "specific_assets_rate", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "recipient", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExitRateDirectFeeConfiguration {
    return new ExitRateDirectFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExitRateDirectFeeConfiguration {
    return new ExitRateDirectFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExitRateDirectFeeConfiguration {
    return new ExitRateDirectFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: ExitRateDirectFeeConfiguration | PlainMessage<ExitRateDirectFeeConfiguration> | undefined, b: ExitRateDirectFeeConfiguration | PlainMessage<ExitRateDirectFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(ExitRateDirectFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.MinSharesSupplyFeeConfiguration
 */
export class MinSharesSupplyFeeConfiguration extends Message<MinSharesSupplyFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 2;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<MinSharesSupplyFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.MinSharesSupplyFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MinSharesSupplyFeeConfiguration {
    return new MinSharesSupplyFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MinSharesSupplyFeeConfiguration {
    return new MinSharesSupplyFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MinSharesSupplyFeeConfiguration {
    return new MinSharesSupplyFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: MinSharesSupplyFeeConfiguration | PlainMessage<MinSharesSupplyFeeConfiguration> | undefined, b: MinSharesSupplyFeeConfiguration | PlainMessage<MinSharesSupplyFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(MinSharesSupplyFeeConfiguration, a, b);
  }
}

/**
 * @generated from message enzyme.enzyme.v1alpha.UnknownFeeConfiguration
 */
export class UnknownFeeConfiguration extends Message<UnknownFeeConfiguration> {
  /**
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * @generated from field: google.protobuf.Timestamp last_settled = 2;
   */
  lastSettled?: Timestamp;

  constructor(data?: PartialMessage<UnknownFeeConfiguration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.UnknownFeeConfiguration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "last_settled", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UnknownFeeConfiguration {
    return new UnknownFeeConfiguration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UnknownFeeConfiguration {
    return new UnknownFeeConfiguration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UnknownFeeConfiguration {
    return new UnknownFeeConfiguration().fromJsonString(jsonString, options);
  }

  static equals(a: UnknownFeeConfiguration | PlainMessage<UnknownFeeConfiguration> | undefined, b: UnknownFeeConfiguration | PlainMessage<UnknownFeeConfiguration> | undefined): boolean {
    return proto3.util.equals(UnknownFeeConfiguration, a, b);
  }
}

