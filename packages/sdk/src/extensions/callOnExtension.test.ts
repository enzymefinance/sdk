import {
  type CallOnExtensionParams,
  ExternalPositionManagerActionId,
  decodeCallOnExtensionParams,
  prepareCallOnExtensionParams,
} from "./callOnExtension.js";
import { encodeFunctionData, getAddress, toHex } from "viem";
import { expect, test } from "vitest";

test("decode call on extension should work correctly", () => {
  const params: CallOnExtensionParams = {
    extension: getAddress("0x976EA74026E726554dB657fA54763abd0C3a0aa9"),
    actionId: ExternalPositionManagerActionId.CallOnExternalPosition,
    callArgs: toHex("a9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b"),
  };

  const prepared = prepareCallOnExtensionParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeCallOnExtensionParams(encoded);

  expect(decoded).toEqual(params);
});
