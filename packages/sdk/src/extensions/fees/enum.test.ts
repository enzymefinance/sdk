import { FeeHook, FeeManagerAction, FeeSettlementType } from "./enums.js";
import { expect, test } from "vitest";

test("FeeHook should be correct", () => {
  expect(FeeHook).toMatchInlineSnapshot(`
    {
      "Continuous": 0n,
      "PostBuyShares": 2n,
      "PreBuyShares": 1n,
      "PreRedeemShares": 3n,
    }
  `);
});

test("FeeManagerAction should be correct", () => {
  expect(FeeManagerAction).toMatchInlineSnapshot(`
    {
      "InvokeContinuousHook": 0n,
      "PayoutSharesOutstandingForFees": 1n,
    }
  `);
});

test("FeeSettlementType should be correct", () => {
  expect(FeeSettlementType).toMatchInlineSnapshot(`
    {
      "Burn": 3n,
      "BurnSharesOutstanding": 5n,
      "Direct": 1n,
      "Mint": 2n,
      "MintSharesOutstanding": 4n,
      "None": 0n,
    }
  `);
});
