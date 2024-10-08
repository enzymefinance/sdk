// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/asset_amount.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1.AssetAmount
 */
export class AssetAmount extends Message<AssetAmount> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string asset = 2;
   */
  asset = "";

  /**
   * @generated from field: string amount = 3;
   */
  amount = "";

  /**
   * @generated from field: string currency_value = 4;
   */
  currencyValue = "";

  /**
   * @generated from field: float timestamp = 5;
   */
  timestamp = 0;

  constructor(data?: PartialMessage<AssetAmount>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.AssetAmount";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "asset", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "amount", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "currency_value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "timestamp", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AssetAmount {
    return new AssetAmount().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AssetAmount {
    return new AssetAmount().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AssetAmount {
    return new AssetAmount().fromJsonString(jsonString, options);
  }

  static equals(a: AssetAmount | PlainMessage<AssetAmount> | undefined, b: AssetAmount | PlainMessage<AssetAmount> | undefined): boolean {
    return proto3.util.equals(AssetAmount, a, b);
  }
}

