// @generated by protoc-gen-es v1.5.1 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/asset_item.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * AssetItem contains details about an individual asset 
 *
 * @generated from message enzyme.enzyme.v1.AssetItem
 */
export class AssetItem extends Message<AssetItem> {
  /**
   * Asset address
   *
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * Asset symbol
   *
   * @generated from field: string symbol = 2;
   */
  symbol = "";

  /**
   * Asset name
   *
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * Current asset price
   *
   * @generated from field: float price = 4;
   */
  price = 0;

  /**
   * Is the current asset price valid?
   *
   * @generated from field: bool price_is_valid = 5;
   */
  priceIsValid = false;

  /**
   * Enzyme Protocol releases for which the asset is registered
   *
   * @generated from field: repeated string releases = 6;
   */
  releases: string[] = [];

  constructor(data?: PartialMessage<AssetItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.AssetItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "symbol", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "price", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "price_is_valid", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "releases", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AssetItem {
    return new AssetItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AssetItem {
    return new AssetItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AssetItem {
    return new AssetItem().fromJsonString(jsonString, options);
  }

  static equals(a: AssetItem | PlainMessage<AssetItem> | undefined, b: AssetItem | PlainMessage<AssetItem> | undefined): boolean {
    return proto3.util.equals(AssetItem, a, b);
  }
}

