// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/asset_value.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1.AssetValue
 */
export class AssetValue extends Message<AssetValue> {
  /**
   * The address of the asset
   *
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * The vault's current balance in the asset
   *
   * @generated from field: float balance = 2;
   */
  balance = 0;

  /**
   * The current price for one unit of the asset
   *
   * @generated from field: float price = 3;
   */
  price = 0;

  /**
   * The current value of the asset
   *
   * @generated from field: float value = 4;
   */
  value = 0;

  /**
   * Is the current price valid?
   *
   * @generated from field: bool price_is_valid = 5;
   */
  priceIsValid = false;

  constructor(data?: PartialMessage<AssetValue>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.AssetValue";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "balance", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "price", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "price_is_valid", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AssetValue {
    return new AssetValue().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AssetValue {
    return new AssetValue().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AssetValue {
    return new AssetValue().fromJsonString(jsonString, options);
  }

  static equals(a: AssetValue | PlainMessage<AssetValue> | undefined, b: AssetValue | PlainMessage<AssetValue> | undefined): boolean {
    return proto3.util.equals(AssetValue, a, b);
  }
}

