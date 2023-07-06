// @generated by protoc-gen-es v1.2.1 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/vault_time_series_item.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1.VaultTimeSeriesItem
 */
export class VaultTimeSeriesItem extends Message<VaultTimeSeriesItem> {
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
   * The net share value at the timestamp
   *
   * @generated from field: float net_share_value = 3;
   */
  netShareValue = 0;

  /**
   * The number of shares at the timestamp
   *
   * @generated from field: float number_of_shares = 4;
   */
  numberOfShares = 0;

  /**
   * Is the price valid at the timestamp?
   *
   * @generated from field: bool price_is_valid = 5;
   */
  priceIsValid = false;

  constructor(data?: PartialMessage<VaultTimeSeriesItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.VaultTimeSeriesItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "timestamp", kind: "message", T: Timestamp },
    { no: 2, name: "gross_asset_value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "net_share_value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "number_of_shares", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "price_is_valid", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VaultTimeSeriesItem {
    return new VaultTimeSeriesItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VaultTimeSeriesItem {
    return new VaultTimeSeriesItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VaultTimeSeriesItem {
    return new VaultTimeSeriesItem().fromJsonString(jsonString, options);
  }

  static equals(a: VaultTimeSeriesItem | PlainMessage<VaultTimeSeriesItem> | undefined, b: VaultTimeSeriesItem | PlainMessage<VaultTimeSeriesItem> | undefined): boolean {
    return proto3.util.equals(VaultTimeSeriesItem, a, b);
  }
}
