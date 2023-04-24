import { test, expect } from "vitest";
import { toWei } from "../utils/conversion.js";
import {
  decodeRedeemSharesForSpecificAssetsParams,
  prepareRedeemSharesForSpecificAssetsParams,
  simulateRedeemSharesForSpecificAssets,
} from "./redeemSharesForSpecificAssets.js";
import { publicClient, testActions, testClient } from "../../tests/globals.js";
import { ALICE, WETH, USDC_HOLDER, USDC, DAI } from "../../tests/constants.js";
import { encodeFunctionData, type Address } from "viem";
import { MAX_UINT_256 } from "../constants/misc.js";
import { EnzymeError, catchError } from "../errors/catchError.js";
import {
  SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET,
  SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT,
  SHARES_REDEMPTION_UNEQUAL_ARRAYS,
  SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET,
  type ErrorCode,
} from "../errors/errorCodes.js";

test("should redeem specific shares correctly", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(10);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await testClient.impersonateAccount({
    address: USDC_HOLDER,
  });

  await testActions.transferToken({
    token: USDC,
    account: USDC_HOLDER,
    recipient: vaultProxy,
    amount: 100_000_000_000n,
  });

  expect(async () => {
    try {
      await simulateRedeemSharesForSpecificAssets({
        comptrollerProxy,
        publicClient,
        sharesOwner: ALICE,
        sharesQuantity: MAX_UINT_256,
        payoutAssets: [WETH, USDC],
        payoutAssetPercentages: [5000n, 5000n],
      });
    } catch (error) {
      throw catchError(error);
    }
  }).not.toThrow();
});

test("should catch errors correctly", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(10);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  await testClient.impersonateAccount({
    address: USDC_HOLDER,
  });

  await testActions.transferToken({
    token: USDC,
    account: USDC_HOLDER,
    recipient: vaultProxy,
    amount: 100_000_000_000n,
  });

  interface SpecificErrorTest {
    payoutAssets: Address[];
    payoutAssetPercentages: bigint[];
    expectedError: ErrorCode;
  }

  const testSpecificErrors = async ({ payoutAssets, payoutAssetPercentages, expectedError }: SpecificErrorTest) => {
    await expect(async () => {
      try {
        await simulateRedeemSharesForSpecificAssets({
          comptrollerProxy,
          publicClient,
          sharesOwner: ALICE,
          sharesQuantity: MAX_UINT_256,
          payoutAssets,
          payoutAssetPercentages,
        });
      } catch (error) {
        throw catchError(error);
      }
    }).rejects.toThrow(new EnzymeError(expectedError));
  };

  // redeemSharesForSpecificAssets: Unequal arrays
  await testSpecificErrors({
    payoutAssets: [WETH, USDC],
    payoutAssetPercentages: [5000n],
    expectedError: SHARES_REDEMPTION_UNEQUAL_ARRAYS,
  });

  // __payoutSpecifiedAssetPercentages: Percents must total 100%
  await testSpecificErrors({
    payoutAssets: [WETH, USDC],
    payoutAssetPercentages: [5000n, 4000n],
    expectedError: SHARES_REDEMPTION_MUST_TOTAL_100_PERCENT,
  });

  // redeemSharesForSpecificAssets: Duplicate payout asset
  await testSpecificErrors({
    payoutAssets: [WETH, WETH],
    payoutAssetPercentages: [5000n, 4000n],
    expectedError: SHARES_REDEMPTION_DUPLICATE_PAYOUT_ASSET,
  });

  // __payoutSpecifiedAssetPercentages: Zero amount for asset
  await testSpecificErrors({
    payoutAssets: [WETH, USDC],
    payoutAssetPercentages: [5000n, 0n],
    expectedError: SHARES_REDEMPTION_ZERO_AMOUNT_FOR_ASSET,
  });
});

test("should prepare params correctly", () => {
  expect(
    prepareRedeemSharesForSpecificAssetsParams({
      withdrawalRecipient: ALICE,
      sharesQuantity: MAX_UINT_256,
      payoutAssets: [WETH, USDC],
      payoutAssetPercentages: [5000n, 5000n],
    }),
  ).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_recipient",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_sharesQuantity",
              "type": "uint256",
            },
            {
              "internalType": "address[]",
              "name": "_payoutAssets",
              "type": "address[]",
            },
            {
              "internalType": "uint256[]",
              "name": "_payoutAssetPercentages",
              "type": "uint256[]",
            },
          ],
          "name": "redeemSharesForSpecificAssets",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "payoutAmounts_",
              "type": "uint256[]",
            },
          ],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        115792089237316195423570985008687907853269984665640564039457584007913129639935n,
        [
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        ],
        [
          5000n,
          5000n,
        ],
      ],
      "functionName": "redeemSharesForSpecificAssets",
    }
  `);
});

test("should decode params correctly", () => {
  const params = {
    withdrawalRecipient: ALICE,
    sharesQuantity: MAX_UINT_256,
    payoutAssets: [WETH, USDC],
    payoutAssetPercentages: [5000n, 5000n],
  } as const;

  const prepared = prepareRedeemSharesForSpecificAssetsParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeRedeemSharesForSpecificAssetsParams(encoded);

  expect(decoded).toEqual(params);
});
