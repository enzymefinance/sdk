import { expect, test } from "vitest";
import { toWei } from "../utils/conversion.js";
import { decodeRedeemSharesParams, prepareRedeemSharesInKindParams } from "./redeemSharesInKind.js";
import { encodeFunctionData } from "viem";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";

test("redeem shares in kind should work correctly", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await testActions.assertBalanceOf({
    token: vaultProxy,
    account: ALICE,
    expected: depositAmount,
  });

  const { request } = await publicClient.simulateContract({
    ...prepareRedeemSharesInKindParams({
      withdrawalReceipient: ALICE,
      sharesQuantity: depositAmount,
      additionalAssets: [],
      assetsToSkip: [],
    }),
    address: comptrollerProxy,
    account: ALICE,
  });

  await sendTestTransaction(request);

  await testActions.assertBalanceOf({
    token: vaultProxy,
    account: ALICE,
    expected: 0n,
  });
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
