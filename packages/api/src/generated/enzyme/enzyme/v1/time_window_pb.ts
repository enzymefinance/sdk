// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/time_window.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * TimeWindow describes a time window for time series data. 
 *
 * @generated from message enzyme.enzyme.v1.TimeWindow
 */
export class TimeWindow extends Message<TimeWindow> {
  /**
   * From timestamp
   *
   * @generated from field: google.protobuf.Timestamp from = 1;
   */
  from?: Timestamp;

  /**
   * To timestamp
   *
   * @generated from field: google.protobuf.Timestamp to = 2;
   */
  to?: Timestamp;

  constructor(data?: PartialMessage<TimeWindow>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "enzyme.enzyme.v1.TimeWindow";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "from", kind: "message", T: Timestamp },
    { no: 2, name: "to", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TimeWindow {
    return new TimeWindow().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TimeWindow {
    return new TimeWindow().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TimeWindow {
    return new TimeWindow().fromJsonString(jsonString, options);
  }

  static equals(a: TimeWindow | PlainMessage<TimeWindow> | undefined, b: TimeWindow | PlainMessage<TimeWindow> | undefined): boolean {
    return proto3.util.equals(TimeWindow, a, b);
  }
}

