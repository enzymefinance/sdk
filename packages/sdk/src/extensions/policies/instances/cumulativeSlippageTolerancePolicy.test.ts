import {
  decodeCumulativeSlippageTolerancePolicySettings,
  encodeCumulativeSlippageTolerancePolicySettings,
} from "./cumulativeSlippageTolerancePolicy.js";
import { expect, test } from "vitest";

test("encodeCumulativeSlippageTolerancePolicySettings to encode correctly", () => {
  expect(
    encodeCumulativeSlippageTolerancePolicySettings({
      tolerance: 2000n,
    }),
  ).toMatchInlineSnapshot('"0x00000000000000000000000000000000000000000000000000000000000007d0"');
});

test("decodeCumulativeSlippageTolerancePolicySettings should decode correctly", () => {
  expect(
    decodeCumulativeSlippageTolerancePolicySettings(
      "0x00000000000000000000000000000000000000000000000000000000000007d0",
    ),
  ).toMatchInlineSnapshot(`
    {
      "tolerance": 2000n,
    }
  `);
});
