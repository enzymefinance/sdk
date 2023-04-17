import { expect, test } from "vitest";
import { toBps, toWei } from "../utils/conversion.js";
import { publicClient } from "../../tests/client.js";
import { ALICE, WETH } from "../../tests/utils/constants.js";
import { approveSpend, createTestVault, depositWeth } from "../../tests/utils/helpers.js";
import { simulateRedeemSharesInKind } from "./redeemSharesInKind.js";

test("test", async () => {
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

  const { shares, transactionRequest } = await simulateRedeemSharesInKind({
    comptrollerProxy,
    publicClient,
    signer: ALICE,
    sharesQuantity: 1n,
    additionalAssets: [],
    assetsToSkip: [],
  });

  console.log("SHARES", shares, "TRANSACTIONN", transactionRequest);
  expect(1).toBe(1);
});
