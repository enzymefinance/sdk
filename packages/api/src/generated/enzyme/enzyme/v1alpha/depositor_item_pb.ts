// @generated by protoc-gen-es v1.4.1 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1alpha/depositor_item.proto (package enzyme.enzyme.v1alpha, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message enzyme.enzyme.v1alpha.DepositorItem
 */
export class DepositorItem extends Message<DepositorItem> {
  /**
   * The wallet address of the depositor
   *
   * @generated from field: string address = 1;
   */
  address = "";

  /**
   * The number of shares currently held by the depositor
   *
   * @generated from field: float number_of_shares = 2;
   */
  numberOfShares = 0;

  /**
   * The current value of the depositor's shares
   *
   * @generated from field: float value = 3;
   */
  value = 0;

  /**
   * The current ownership percentage of the depositor
   *
   * @generated from field: float ownership_percentage = 4;
   */
  ownershipPercentage = 0;

  /**
   * The timestamp of the depositor's first deposit into the vault
   *
   * @generated from field: google.protobuf.Timestamp depositor_since = 5;
   */
  depositorSince?: Timestamp;

  constructor(data?: PartialMessage<DepositorItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1alpha.DepositorItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "number_of_shares", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 3, name: "value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "ownership_percentage", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 5, name: "depositor_since", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DepositorItem {
    return new DepositorItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DepositorItem {
    return new DepositorItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DepositorItem {
    return new DepositorItem().fromJsonString(jsonString, options);
  }

  static equals(a: DepositorItem | PlainMessage<DepositorItem> | undefined, b: DepositorItem | PlainMessage<DepositorItem> | undefined): boolean {
    return proto3.util.equals(DepositorItem, a, b);
  }
}

