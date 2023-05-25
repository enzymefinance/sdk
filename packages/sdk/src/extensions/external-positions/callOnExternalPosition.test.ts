import { ExternalPositionManagerActionId } from "../callOnExtension.js";
import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "./callOnExternalPosition.js";
import { getAddress, toHex } from "viem";
import { expect, test } from "vitest";

test("decode call on external position should work correctly", () => {
  const decoded = decodeCallOnExternalPositionArgs(
    "0x000000000000000000000000976ea74026e726554db657fa54763abd0c3a0aa900000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004061393035396362623261623039656232313935383366346135396135643036323361646533343664393632626364346534366231316461303437633930343962",
  );

  expect(decoded).toMatchInlineSnapshot(`
    {
      "actionArgs": "0x61393035396362623261623039656232313935383366346135396135643036323361646533343664393632626364346534366231316461303437633930343962",
      "actionId": 2n,
      "externalPositionProxy": "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
    }
  `);
});

test("encode call on external position should work corresrc/actions/setupVault.ts:1ctly", () => {
  const params = {
    externalPositionProxy: getAddress("0x976EA74026E726554dB657fA54763abd0C3a0aa9"),
    actionId: ExternalPositionManagerActionId.RemoveExternalPosition,
    actionArgs: toHex("a9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b"),
  };

  const encoded = encodeCallOnExternalPositionArgs(params);

  expect(encoded).toMatchInlineSnapshot(
    '"0x000000000000000000000000976ea74026e726554db657fa54763abd0c3a0aa900000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004061393035396362623261623039656232313935383366346135396135643036323361646533343664393632626364346534366231316461303437633930343962"',
  );
});

test("decode call on external position should be equal to encoded", () => {
  const params = {
    externalPositionProxy: getAddress("0x976EA74026E726554dB657fA54763abd0C3a0aa9"),
    actionId: ExternalPositionManagerActionId.RemoveExternalPosition,
    actionArgs: toHex("a9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b"),
  };

  const encoded = encodeCallOnExternalPositionArgs(params);
  const decoded = decodeCallOnExternalPositionArgs(encoded);

  expect(decoded).toEqual(params);
});
