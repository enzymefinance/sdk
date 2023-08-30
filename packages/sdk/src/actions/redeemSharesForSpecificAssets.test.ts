import { ALICE, USDC, USDC_HOLDER, WETH } from "../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions, testClientMainnet } from "../../tests/globals.js";
import { MAX_UINT_256 } from "../constants/misc.js";
import { toWei } from "../utils/conversion.js";
import {
  decodeRedeemSharesForSpecificAssetsParams,
  prepareRedeemSharesForSpecificAssetsParams,
} from "./redeemSharesForSpecificAssets.js";
import { encodeFunctionData } from "viem";
import { expect, test } from "vitest";

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

  await testClientMainnet.impersonateAccount({
    address: USDC_HOLDER,
  });

  await testActions.transferToken({
    clientNetwork: "mainnet",
    token: USDC,
    account: USDC_HOLDER,
    recipient: vaultProxy,
    amount: 100_000_000_000n,
  });

  const { request } = await publicClientMainnet.simulateContract({
    ...prepareRedeemSharesForSpecificAssetsParams({
      withdrawalRecipient: ALICE,
      sharesQuantity: MAX_UINT_256,
      payoutAssets: [WETH, USDC],
      payoutAssetPercentages: [5000n, 5000n],
    }),
    address: comptrollerProxy,
    account: ALICE,
  });

  await sendTestTransaction({ ...request, clientNetwork: "mainnet" });

  await testActions.assertBalanceOf({
    token: vaultProxy,
    account: ALICE,
    expected: 0n,
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
