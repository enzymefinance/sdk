import { test, expect } from "vitest";
import { PolicyHook } from "./enums.js";

test("PolicyHook should have the correct properties", () => {
  expect(PolicyHook).toMatchInlineSnapshot(`
    {
      "AddTrackedAssets": 4,
      "CreateExternalPosition": 6,
      "PostBuyShares": 0,
      "PostCallOnExternalPosition": 7,
      "PostCallOnIntegration": 1,
      "PreTransferShares": 2,
      "ReactivateExternalPosition": 9,
      "RedeemSharesForSpecificAssets": 3,
      "RemoveExternalPosition": 8,
      "RemoveTrackedAssets": 5,
    }
  `);
});
