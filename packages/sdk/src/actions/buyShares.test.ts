import { expect, test } from "vitest";
import { toBps, toWei } from "../utils/conversion.js";
import { publicClient } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/utils/constants.js";
import { approveSpend, createTestVault, wrapEther } from "../../tests/utils/helpers.js";
import { simulateBuyShares } from "./buyShares.js";

test("should set up a vault with the given parameters", async () => {
  const { comptrollerProxy } = await createTestVault();

  await wrapEther({
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
