import { expect, test } from "vitest";
import { toBps, toSeconds, toWei } from "../utils/conversion.js";
import { publicClient, sendTestTransaction, testClient } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/utils/constants.js";
import { approveSpend, createTestVault, wrapEther } from "../../tests/utils/helpers.js";
import { simulateRedeemSharesInKind } from "./redeemSharesInKind.js";
import { simulateBuyShares } from "./buyShares.js";
import { IVault } from "@enzymefinance/abis";

test("test", async () => {
  const { comptrollerProxy, vaultProxy } = await createTestVault();

  // TODO: We should probably create a helper function for: 1. approve spend (& wrap ether if needed), 2. deposit into vault
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

  // In the new sdk, we'll generally try to build transaction flows in this way:
  // 1. Prepare parameters
  // 2. Simulation transaction (given the output of #1. Determine gas cost, check if it would succeed, etc.)
  // 3. Execute transaction (given the output of #2)
  //
  // This way, we ensure that the tranasction object that we initially created using the user provided parameters
  // is properly estimated (gas cost is determined, etc.) and we then send it using those exact parameters after
  // checking whether the simulated outcome is what we expect (e.g. returned shares amount is correct / high enough, etc.).

  // 1 & 2. Simulate buying shares (prepare with the given parameters, then simulate the transaction)
  const { expectedSharesQuantity, transactionRequest: buySharesTransactionRequest } = await simulateBuyShares({
    depositorAddress: ALICE,
    investmentAmount: toWei(150),
    maxSlippageBps: toBps(0.1),
    publicClient,
    comptrollerProxy,
  });

  // 3. Send the transaction
  await sendTestTransaction(buySharesTransactionRequest);

  // Fetch the balance of shares for `Alice` after the transaction has been sent & mined.
  const sharesBalanceAfterBuyShares = await publicClient.readContract({
    address: vaultProxy,
    abi: IVault,
    functionName: "balanceOf",
    args: [ALICE],
  });

  // Test that the transaction simulation outcome matches the actual state on-chain after the transaction was properly sent
  expect(sharesBalanceAfterBuyShares).toBe(expectedSharesQuantity);

  // We need to advance block time by 1 day because our test vaults are created with a share action timelock of 1 day.
  // TODO: We should probably create a helper function for this.
  await testClient.increaseTime({ seconds: Number(toSeconds({ days: 1 })) });
  await testClient.mine({ blocks: 1 });

  // 1 & 2. Simulate redeeming shares (prepare with the given parameters, then simulate the transaction)
  const { transactionRequest: redeemSharesTransactionRequest } = await simulateRedeemSharesInKind({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: expectedSharesQuantity, // Withdraw all of alice's shares again
    additionalAssets: [],
    assetsToSkip: [],
  });

  // 3. Send the transaction
  await sendTestTransaction(redeemSharesTransactionRequest);

  // Fetch the balance of shares for `Alice` after the transaction has been sent & mined.
  const sharesBalanceAfterWithdraw = await publicClient.readContract({
    address: vaultProxy,
    abi: IVault,
    functionName: "balanceOf",
    args: [ALICE],
  });

  // Test that all shares were redeemed as expected.
  expect(sharesBalanceAfterWithdraw).toBe(0n);
});
