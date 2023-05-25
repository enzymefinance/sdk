import { PolicyHook } from "./enums.js";
import { expect, test } from "vitest";

test("PolicyHook should have the correct properties", () => {
  expect(PolicyHook).toMatchInlineSnapshot(`
    {
      "AddTrackedAssets": 4n,
      "CreateExternalPosition": 6n,
      "PostBuyShares": 0n,
      "PostCallOnExternalPosition": 7n,
      "PostCallOnIntegration": 1n,
      "PreTransferShares": 2n,
      "ReactivateExternalPosition": 9n,
      "RedeemSharesForSpecificAssets": 3n,
      "RemoveExternalPosition": 8n,
      "RemoveTrackedAssets": 5n,
    }
  `);
});
