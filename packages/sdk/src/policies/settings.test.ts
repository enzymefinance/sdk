import { test, expect } from "vitest";
import { decodePolicySettings, encodePolicySettings, policySettingsAbi } from "./settings.js";
import { encodeMinMaxInvestmentPolicySettings } from "./index.js";
import { encodeAbiParameters } from "viem";

test("policySettingsAbi should contain the correct properties", () => {
  expect(policySettingsAbi).toMatchInlineSnapshot(`
        [
          {
            "name": "policyAddresses",
            "type": "address[]",
          },
          {
            "name": "policySettings",
            "type": "bytes[]",
          },
        ]
      `);
});

test("encodePolicySettings should encode correctly", () => {
  expect(
    encodePolicySettings([
      {
        address: "0xebdadfc929c357d12281118828aea556db5be30c",
        settings: encodeMinMaxInvestmentPolicySettings({ minInvestmentAmount: 100n, maxInvestmentAmount: 5000n }),
      },
    ]),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ebdadfc929c357d12281118828aea556db5be30c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000001388"',
  );
});

test("decodePolicySettings should throw error if encoded addresses and settings have different lengths", () => {
  const addresses = [
    "0xebdadfc929c357d12281118828aea556db5be30c",
    "0xebdadfc929c357d12281118828aea556db5be30c",
  ] as const;
  const settings = [
    encodeMinMaxInvestmentPolicySettings({ minInvestmentAmount: 100n, maxInvestmentAmount: 5000n }),
  ] as const;
  const encoded = encodeAbiParameters(policySettingsAbi, [addresses, settings]);

  expect(() => decodePolicySettings(encoded)).toThrowError(
    "Expected policy addresses and settings to have the same length",
  );
});

test("decodePolicySettings should decode correctly", () => {
  expect(
    decodePolicySettings(
      "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ebdadfc929c357d12281118828aea556db5be30c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000001388",
    ),
  ).toMatchInlineSnapshot(`
        [
          {
            "address": "0xebdadFC929c357d12281118828AeA556db5be30C",
            "settings": "0x00000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000001388",
          },
        ]
      `);
});
