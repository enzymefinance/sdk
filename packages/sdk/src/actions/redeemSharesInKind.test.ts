import { expect, test } from "vitest";
import { toWei } from "../utils/conversion.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { simulateRedeemSharesInKind } from "./redeemSharesInKind.js";
import { getBalanceOf } from "../../tests/actions/getBalanceOf.js";

test("Redeem shares in kind should work correctly", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const balanceBeforeDeposit = await getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  const depositAmount = toWei(250);

  const sharesBought = await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  expect(sharesBought).toBe(depositAmount);

  const balanceAfterDeposit = await getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  expect(balanceAfterDeposit).toBe(sharesBought);

  await testActions.increaseTimeAndMine({ days: 1, blocks: 1 });

  const { transactionRequest: redeemSharesTransactionRequest } = await simulateRedeemSharesInKind({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: sharesBought,
    additionalAssets: [],
    assetsToSkip: [],
  });

  expect(redeemSharesTransactionRequest).toBeDefined();

  await sendTestTransaction(redeemSharesTransactionRequest);

  const sharesBalanceAfterWithdraw = await getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  expect(sharesBalanceAfterWithdraw).toBe(balanceBeforeDeposit);
});
