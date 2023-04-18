import { expect, test } from "vitest";
import { applySlippage, toBps, toWei } from "../utils/conversion.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { decodeBuySharesParams, getExpectedShareQuantity, prepareBuySharesParams } from "./buyShares.js";
import { encodePolicySettings } from "../policies/settings.js";
import { encodeMinMaxInvestmentPolicySettings } from "../policies/policies/minMaxInvestmentPolicy.js";
import { POLICY_VIOLATION_MIN_MAX_INVESTMENT } from "../errors/errorCodes.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import { encodeFunctionData } from "viem";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { setupAnvil } from "../../tests/anvil.js";

setupAnvil();

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

  const expectedShareQuantity = await getExpectedShareQuantity({
    publicClient,
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  expect(expectedShareQuantity).toBe(depositAmount);

  const { request, result } = await publicClient.simulateContract({
    address: comptrollerProxy,
    account: ALICE,
    ...prepareBuySharesParams({
      investmentAmount: depositAmount,
      minSharesQuantity: applySlippage(expectedShareQuantity, toBps(0.05)),
    }),
  });

  expect(request).toBeTruthy();
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

test("should fail to buy shares if there's a policy violation", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
    policySettings: encodePolicySettings([
      {
        address: "0xebdadfc929c357d12281118828aea556db5be30c",
        settings: encodeMinMaxInvestmentPolicySettings({
          minInvestmentAmount: toWei(10),
          maxInvestmentAmount: toWei(100),
        }),
      },
    ]),
  });

  await expect(async () => {
    try {
      await testActions.buyShares({
        sharesBuyer: ALICE,
        comptrollerProxy,
        investmentAmount: toWei(150),
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(POLICY_VIOLATION_MIN_MAX_INVESTMENT));
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
