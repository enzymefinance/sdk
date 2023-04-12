import { test, expect } from "vitest";
import { FeeHook, FeeManagerAction, FeeSettlementType } from "./enums.js";

test("FeeHook should be correct", () => {
  expect(FeeHook).toEqual({
    Continuous: 0,
    PreBuyShares: 1,
    PostBuyShares: 2,
    PreRedeemShares: 3,
  });
});

test("FeeManagerAction should be correct", () => {
  expect(FeeManagerAction).toEqual({
    InvokeContinuousHook: 0,
    PayoutSharesOutstandingForFees: 1,
  });
});

test("FeeSettlementType should be correct", () => {
  expect(FeeSettlementType).toEqual({
    None: 0,
    Direct: 1,
    Mint: 2,
    Burn: 3,
    MintSharesOutstanding: 4,
    BurnSharesOutstanding: 5,
  });
});
