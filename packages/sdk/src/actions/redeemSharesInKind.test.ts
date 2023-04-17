import { expect, test } from "vitest";
import { toWei } from "../utils/conversion.js";
import { publicClient, sendTestTransaction } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/utils/constants.js";
import {
  approveSpend,
  createTestVault,
  depositIntoVault,
  increaseTimeAndMine,
  wrapEther,
} from "../../tests/utils/helpers.js";
import { simulateRedeemSharesInKind } from "./redeemSharesInKind.js";
import { IVault } from "@enzymefinance/abis";

test("Redeem shares in kind should work correctly", async () => {
  const { comptrollerProxy, vaultProxy } = await createTestVault();

  const depositAmount = toWei(250);

  await wrapEther({
    account: ALICE,
    amount: depositAmount,
  });

  await approveSpend({
    token: WETH,
    account: ALICE,
    spender: comptrollerProxy,
    amount: depositAmount,
  });

  const { expectedSharesQuantity, transactionRequest: buySharesTransactionRequest } = await depositIntoVault({
    depositorAddress: ALICE,
    investmentAmount: depositAmount,
    comptrollerProxy,
  });

  expect(depositAmount).toBe(expectedSharesQuantity);

  await sendTestTransaction(buySharesTransactionRequest);

  const sharesBalanceAfterBuyShares = await publicClient.readContract({
    address: vaultProxy,
    abi: IVault,
    functionName: "balanceOf",
    args: [ALICE],
  });

  expect(sharesBalanceAfterBuyShares).toBe(expectedSharesQuantity);

  await increaseTimeAndMine({ days: 1, blocks: 1 });

  const { transactionRequest: redeemSharesTransactionRequest } = await simulateRedeemSharesInKind({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: expectedSharesQuantity,
    additionalAssets: [],
    assetsToSkip: [],
  });

  await sendTestTransaction(redeemSharesTransactionRequest);

  const sharesBalanceAfterWithdraw = await publicClient.readContract({
    address: vaultProxy,
    abi: IVault,
    functionName: "balanceOf",
    args: [ALICE],
  });

  expect(sharesBalanceAfterWithdraw).toBe(0n);
});
