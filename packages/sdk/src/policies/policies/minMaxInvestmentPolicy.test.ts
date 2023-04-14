import { test, expect } from "vitest";
import {
  minMaxInvestmentPolicySettingsEncoding,
  encodeMinMaxInvestmentPolicySettings,
} from "./minMaxInvestmentPolicy.js";

test("minMaxInvestmentPolicySettingsEncoding should have the correct properties", () => {
  expect(minMaxInvestmentPolicySettingsEncoding).toMatchInlineSnapshot(`
      [
        {
          "name": "minInvestmentAmount",
          "type": "uint256",
        },
        {
          "name": "maxInvestmentAmount",
          "type": "uint256",
        },
      ]
    `);
});

test("encodeMinMaxInvestmentPolicySettings should throw an error if minInvestmentAmount is greater than maxInvestmentAmount", () => {
  expect(() =>
    encodeMinMaxInvestmentPolicySettings({
      minInvestmentAmount: 100n,
      maxInvestmentAmount: 50n,
    }),
  ).toThrowError("maxInvestmentAmount should be greater than or equal to minInvestmentAmount");
});

test("encodeMinMaxInvestmentPolicySettings should encode correctly", () => {
  expect(
    encodeMinMaxInvestmentPolicySettings({
      minInvestmentAmount: 100n,
      maxInvestmentAmount: 5000n,
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000001388"',
  );
});
