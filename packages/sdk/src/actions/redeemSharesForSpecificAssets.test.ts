import { test } from "vitest";
import { toWei } from "../utils/conversion.js";
import { simulateRedeemSharesForSpecificAssets } from "./redeemSharesForSpecificAssets.js";
import { publicClient, testActions, testClient } from "../../tests/globals.js";
import { ALICE, WETH, USDC_HOLDER, USDC } from "../../tests/constants.js";

test("test", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(10); // Buy 10 WETH worth of shares.
  const boughtShares = await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await testClient.impersonateAccount({
    address: USDC_HOLDER,
  });

  await testActions.transferToken({
    token: USDC,
    account: USDC_HOLDER,
    recipient: vaultProxy,
    amount: 100_000_000_000n, // USDC has 6 decimals, hence, this is 100,000 USDC.
  });

  const { request, result } = await simulateRedeemSharesForSpecificAssets({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: boughtShares, // NOTE: Normally, in order to redeem all shares, you'd pass MAX_UINT_256 here.
    payoutAssets: [USDC], // Withdraw all shares as 100% USDC.
    payoutAssetPercentages: [10000n],
  });

  console.log("REDEEM REQUEST", request);
  console.log("REDEEM RESULT", result);
});
