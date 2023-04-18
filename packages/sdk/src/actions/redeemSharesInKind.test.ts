import { expect, test } from "vitest";
import { toSeconds, toWei } from "../utils/conversion.js";
import {
  decodeRedeemSharesParams,
  prepareRedeemSharesInKindParams,
  simulateRedeemSharesInKind,
} from "./redeemSharesInKind.js";
import { encodeFunctionData } from "viem";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";

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

test("decode redeem shares in kind should work correctly", () => {
  const params = {
    withdrawalReceipient: ALICE,
    sharesQuantity: toWei(120),
    additionalAssets: [],
    assetsToSkip: [],
  };
  const prepared = prepareRedeemSharesInKindParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeRedeemSharesParams(encoded);

  expect(decoded).toEqual(params);
});
