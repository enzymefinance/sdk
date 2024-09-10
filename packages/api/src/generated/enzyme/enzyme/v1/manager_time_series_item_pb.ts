// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/manager_time_series_item.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1.ManagerTimeSeriesItem
 */
export class ManagerTimeSeriesItem extends Message<ManagerTimeSeriesItem> {
  /**
   * The timestamp of the data point
   *
   * @generated from field: google.protobuf.Timestamp timestamp = 1;
   */
  timestamp?: Timestamp;

  /**
   * The gross asset value at the timestamp
   *
   * @generated from field: float gross_asset_value = 2;
   */
  grossAssetValue = 0;

  /**
   * The number of vaults managed at the timestamp
   *
   * @generated from field: float number_of_vaults = 3;
   */
  numberOfVaults = 0;

  constructor(data?: PartialMessage<ManagerTimeSeriesItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.ManagerTimeSeriesItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "timestamp", kind: "message", T: Timestamp },
    { no: 2, name: "gross_asset_value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "number_of_vaults", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ManagerTimeSeriesItem {
    return new ManagerTimeSeriesItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ManagerTimeSeriesItem {
    return new ManagerTimeSeriesItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ManagerTimeSeriesItem {
    return new ManagerTimeSeriesItem().fromJsonString(jsonString, options);
  }

  static equals(a: ManagerTimeSeriesItem | PlainMessage<ManagerTimeSeriesItem> | undefined, b: ManagerTimeSeriesItem | PlainMessage<ManagerTimeSeriesItem> | undefined): boolean {
    return proto3.util.equals(ManagerTimeSeriesItem, a, b);
  }
}

