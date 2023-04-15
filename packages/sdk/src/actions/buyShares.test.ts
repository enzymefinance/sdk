import { expect, test } from "vitest";
import { toBps, toWei } from "../utils/conversion.js";
import { publicClient } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/utils/constants.js";
import { approveSpend, createTestVault, depositWeth } from "../../tests/utils/helpers.js";
import { simulateBuyShares } from "./buyShares.js";
import { encodePolicySettings } from "../policies/settings.js";
import { encodeMinMaxInvestmentPolicySettings } from "../policies/policies/minMaxInvestmentPolicy.js";
import { POLICY_VIOLATION_MIN_MAX_INVESTMENT, EnzymeError } from "../errors.js";

test("should allow buying shares", async () => {
  const { comptrollerProxy } = await createTestVault();

  await depositWeth({
    account: ALICE,
    amount: toWei(250),
  });

  await approveSpend({
    token: WETH,
    account: ALICE,
    spender: comptrollerProxy,
    amount: toWei(250),
  });

  const { transactionRequest, expectedSharesQuantity, minSharesQuantity, appliedSlippageBps } = await simulateBuyShares(
    {
      depositorAddress: ALICE,
      investmentAmount: toWei(150),
      maxSlippageBps: toBps(0.1),
      publicClient,
      comptrollerProxy,
    },
  );

  expect(transactionRequest).toBeDefined();
  expect(expectedSharesQuantity).toMatchInlineSnapshot("150000000000000000000n");
  expect(minSharesQuantity).toMatchInlineSnapshot("135000000000000000000n");
  expect(appliedSlippageBps).toMatchInlineSnapshot("1000n");
});

test("should fail to buy shares if there's a policy violation", async () => {
  const { comptrollerProxy } = await createTestVault({
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

  await depositWeth({
    account: ALICE,
    amount: toWei(250),
  });

  await approveSpend({
    token: WETH,
    account: ALICE,
    spender: comptrollerProxy,
    amount: toWei(250),
  });

  try {
    await simulateBuyShares({
      depositorAddress: ALICE,
      investmentAmount: toWei(150),
      maxSlippageBps: toBps(0.1),
      publicClient,
      comptrollerProxy,
    });
  } catch (error) {
    expect(error).toBeInstanceOf(EnzymeError);
    expect(error.code).toBe(POLICY_VIOLATION_MIN_MAX_INVESTMENT);
  }
});
