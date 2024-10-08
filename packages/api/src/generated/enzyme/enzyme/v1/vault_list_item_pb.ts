// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/vault_list_item.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1.VaultListItem
 */
export class VaultListItem extends Message<VaultListItem> {
  /**
   * Vault address
   *
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * Inception timestamp of the vault
   *
   * @generated from field: google.protobuf.Timestamp inception = 2;
   */
  inception?: Timestamp;

  /**
   * Current number of shares
   *
   * @generated from field: float number_of_shares = 3;
   */
  numberOfShares = 0;

  /**
   * Current gross asset value (i.e. total value of all assets held by the vault)
   *
   * @generated from field: float gross_asset_value = 4;
   */
  grossAssetValue = 0;

  /**
   * Current share price
   *
   * @generated from field: float share_price = 5;
   */
  sharePrice = 0;

  /**
   * Is the current share price valid
   *
   * @generated from field: bool share_price_valid = 6;
   */
  sharePriceValid = false;

  /**
   * The vault performance in the last 24 hours
   *
   * @generated from field: float performance_24h = 7;
   */
  performance24h = 0;

  /**
   * The vault performance since the beginning of this month
   *
   * @generated from field: float performance_this_month = 8;
   */
  performanceThisMonth = 0;

  /**
   * The vault performance since inception
   *
   * @generated from field: float performance_since_inception = 9;
   */
  performanceSinceInception = 0;

  /**
   * The number of assets held by the vault
   *
   * @generated from field: float number_of_assets = 10;
   */
  numberOfAssets = 0;

  /**
   * The addresses of the top 5 assets held by the vault
   *
   * @generated from field: repeated string assets = 11;
   */
  assets: string[] = [];

  /**
   * The percentages of the top assets held by the vault
   *
   * @generated from field: repeated float asset_percentages = 12;
   */
  assetPercentages: number[] = [];

  /**
   * The number of depositors of the vault
   *
   * @generated from field: float number_of_depositors = 13;
   */
  numberOfDepositors = 0;

  constructor(data?: PartialMessage<VaultListItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.VaultListItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "inception", kind: "message", T: Timestamp },
    { no: 3, name: "number_of_shares", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "gross_asset_value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "share_price", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 6, name: "share_price_valid", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 7, name: "performance_24h", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 8, name: "performance_this_month", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 9, name: "performance_since_inception", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 10, name: "number_of_assets", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 11, name: "assets", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 12, name: "asset_percentages", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
    { no: 13, name: "number_of_depositors", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): VaultListItem {
    return new VaultListItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): VaultListItem {
    return new VaultListItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): VaultListItem {
    return new VaultListItem().fromJsonString(jsonString, options);
  }

  static equals(a: VaultListItem | PlainMessage<VaultListItem> | undefined, b: VaultListItem | PlainMessage<VaultListItem> | undefined): boolean {
    return proto3.util.equals(VaultListItem, a, b);
  }
}

