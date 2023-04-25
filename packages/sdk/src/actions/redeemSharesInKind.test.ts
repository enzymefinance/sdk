import { expect, test } from "vitest";
import { toWei } from "../utils/conversion.js";
import {
  decodeRedeemSharesParams,
  prepareRedeemSharesInKindParams,
  simulateRedeemSharesInKind,
} from "./redeemSharesInKind.js";
import { encodeFunctionData } from "viem";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, WETH } from "../../tests/constants.js";
import { MAX_UINT_256 } from "../constants/misc.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import {
  SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS,
  SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP,
} from "../errors/errorCodes.js";

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

  const { transactionRequest: redeemSharesTransactionRequest } = await simulateRedeemSharesInKind({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: depositAmount,
    additionalAssets: [],
    assetsToSkip: [],
  });

  await sendTestTransaction(redeemSharesTransactionRequest);

  await testActions.assertBalanceOf({
    token: vaultProxy,
    account: ALICE,
    expected: 0n,
  });
});

test("should fail if duplicate assets provided", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await expect(async () => {
    try {
      await simulateRedeemSharesInKind({
        comptrollerProxy,
        publicClient,
        sharesOwner: ALICE,
        sharesQuantity: MAX_UINT_256,
        additionalAssets: [WETH, WETH], // duplicate assets
        assetsToSkip: [],
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(SHARES_REDEMPTION_DUPLICATE_ADDITIONAL_ASSETS));

  await expect(async () => {
    try {
      await simulateRedeemSharesInKind({
        comptrollerProxy,
        publicClient,
        sharesOwner: ALICE,
        sharesQuantity: MAX_UINT_256,
        additionalAssets: [],
        assetsToSkip: [WETH, WETH], // duplicate assets
      });
    } catch (error) {
      throw catchError(error);
    }
  }).rejects.toThrow(new EnzymeError(SHARES_REDEMPTION_DUPLICATE_ASSETS_TO_SKIP));
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
