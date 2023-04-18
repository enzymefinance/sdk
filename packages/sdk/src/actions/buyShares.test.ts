import { expect, test } from "vitest";
import { applySlippage, toBps, toWei } from "../utils/conversion.js";
import { publicClient, sendTestTransaction, testActions } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { getExpectedShareQuantity, prepareBuySharesParams } from "./buyShares.js";
import { encodePolicySettings } from "../policies/settings.js";
import { encodeMinMaxInvestmentPolicySettings } from "../policies/policies/minMaxInvestmentPolicy.js";
import { POLICY_VIOLATION_MIN_MAX_INVESTMENT } from "../errors/errorCodes.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import { getBalanceOf } from "../../tests/actions/getBalanceOf.js";

test("step by step happy path", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await testActions.wrapEther({
    account: ALICE,
    amount: toWei(150),
  });

  await testActions.approveSpend({
    token: WETH,
    account: ALICE,
    spender: comptrollerProxy,
    amount: toWei(150),
  });

  const expectedShareQuantity = await getExpectedShareQuantity({
    publicClient,
    sharesBuyer: ALICE,
    comptrollerProxy,
    investmentAmount: toWei(150),
  });

  expect(expectedShareQuantity).toBe(toWei(150));

  const { request, result } = await publicClient.simulateContract({
    address: comptrollerProxy,
    account: ALICE,
    ...prepareBuySharesParams({
      investmentAmount: toWei(150),
      minSharesQuantity: applySlippage(expectedShareQuantity, toBps(0.05)),
    }),
  });

  expect(request).toBeTruthy();
  expect(result).toBe(expectedShareQuantity); // For good measure ...

  const balanceOfBefore = await getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  expect(balanceOfBefore).toBe(0n);

  await sendTestTransaction(request);

  const balanceOfAfter = await getBalanceOf({
    token: vaultProxy,
    account: ALICE,
  });

  expect(balanceOfAfter).toBe(toWei(150));
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
