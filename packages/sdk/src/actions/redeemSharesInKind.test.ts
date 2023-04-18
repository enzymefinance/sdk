import { expect, test } from "vitest";
import { toSeconds, toWei } from "../utils/conversion.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { simulateRedeemSharesInKind } from "./redeemSharesInKind.js";
import { setupAnvil } from "../../tests/anvil.js";

setupAnvil();

test("redeem shares in kind should work correctly", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const balanceBeforeDeposit = await testActions.getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await testActions.increaseTimeAndMine({
    seconds: Number(toSeconds({ days: 1 })),
    blocks: 1,
  });

  const { transactionRequest: redeemSharesTransactionRequest } = await simulateRedeemSharesInKind({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: depositAmount,
    additionalAssets: [],
    assetsToSkip: [],
  });

  expect(redeemSharesTransactionRequest).toBeDefined();

  await sendTestTransaction(redeemSharesTransactionRequest);

  const balanceAfterWithdraw = await testActions.getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  expect(balanceAfterWithdraw).toBe(balanceBeforeDeposit);
});
