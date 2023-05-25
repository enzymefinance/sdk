import {
  allowedExternalPositionTypesPolicySettingsEncoding,
  decodeAllowedExternalPositionTypesPolicySettings,
  encodeAllowedExternalPositionTypesPolicySettings,
} from "./allowedExternalPositionTypesPolicy.js";
import { expect, test } from "vitest";

test("allowedExternalPositionTypesPolicySettingsEncoding should have the correct properties", () => {
  expect(allowedExternalPositionTypesPolicySettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "externalPositionTypeIds",
        "type": "uint256[]",
      },
    ]
  `);
});

test("encodeAllowedExternalPositionTypesPolicySettings should encode correctly", () => {
  expect(
    encodeAllowedExternalPositionTypesPolicySettings({
      externalPositionTypeIds: [222n, 333n, 444n],
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000de000000000000000000000000000000000000000000000000000000000000014d00000000000000000000000000000000000000000000000000000000000001bc"',
  );
});

test("decodeAllowedExternalPositionTypesPolicySettings should decode correctly", () => {
  expect(
    decodeAllowedExternalPositionTypesPolicySettings(
      "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000de000000000000000000000000000000000000000000000000000000000000014d00000000000000000000000000000000000000000000000000000000000001bc",
    ),
  ).toMatchInlineSnapshot(`
    {
      "externalPositionTypeIds": [
        222n,
        333n,
        444n,
      ],
    }
  `);
});
