import { ALICE, WETH } from "../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { applySlippage, toBps, toWei } from "../utils/conversion.js";
import { decodeBuySharesParams, getExpectedShareQuantity, prepareBuySharesParams } from "./buyShares.js";
import { encodeFunctionData } from "viem";
import { expect, test } from "vitest";

test("should be able to buy shares", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(150);

  await testActions.wrapEther({
    account: ALICE,
    amount: depositAmount,
  });

  await testActions.approveSpend({
    token: WETH,
    account: ALICE,
    spender: comptrollerProxy,
    amount: depositAmount,
  });

  const expectedShareQuantity = await getExpectedShareQuantity(publicClient, {
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  expect(expectedShareQuantity).toBe(depositAmount);

  const { request, result } = await publicClient.simulateContract({
    ...prepareBuySharesParams({
      investmentAmount: depositAmount,
      minSharesQuantity: applySlippage(expectedShareQuantity, toBps(0.05)),
    }),
    address: comptrollerProxy,
    account: ALICE,
  });

  expect(result).toBe(expectedShareQuantity); // For good measure ...

  await testActions.assertBalanceOf({
    token: vaultProxy,
    account: ALICE,
    expected: 0n,
  });

  await sendTestTransaction(request);

  await testActions.assertBalanceOf({
    token: vaultProxy,
    account: ALICE,
    expected: depositAmount,
  });
});

test("decode buy shares should work correctly", () => {
  const params = {
    investmentAmount: toWei(100),
    minSharesQuantity: 1n,
  };
  const prepared = prepareBuySharesParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeBuySharesParams(encoded);

  expect(decoded).toEqual(params);
});
