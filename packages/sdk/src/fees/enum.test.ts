import { test, expect } from "vitest";
import { FeeHook, FeeManagerAction, FeeSettlementType } from "./enums.js";

test("FeeHook should be correct", () => {
  expect(FeeHook).toMatchInlineSnapshot(`
    {
      "Continuous": 0,
      "PostBuyShares": 2,
      "PreBuyShares": 1,
      "PreRedeemShares": 3,
    }
  `);
});

test("FeeManagerAction should be correct", () => {
  expect(FeeManagerAction).toMatchInlineSnapshot(`
    {
      "InvokeContinuousHook": 0,
      "PayoutSharesOutstandingForFees": 1,
    }
  `);
});

test("FeeSettlementType should be correct", () => {
  expect(FeeSettlementType).toMatchInlineSnapshot(`
    {
      "Burn": 3,
      "BurnSharesOutstanding": 5,
      "Direct": 1,
      "Mint": 2,
      "MintSharesOutstanding": 4,
      "None": 0,
    }
  `);
});
