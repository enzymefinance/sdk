import {
  ALICE,
  BOB,
  COMPOUND_V2_ADAPTER,
  COMPOUND_V2_C_ETH,
  INTEGRATION_MANAGER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { parseAbi, parseUnits } from "viem";
import { expect, test } from "vitest";

const abiCToken = parseAbi(["function exchangeRateStored() view returns (uint256)"] as const);
const scaledExchangeRate = 10n ** 36n;

function underlyingToCTokenAmount({
  underlyingAmount,
  exchangeRateStored,
  decimals,
}: { underlyingAmount: bigint; exchangeRateStored: bigint; decimals: number }) {
  const cTokenAmount = (underlyingAmount * scaledExchangeRate) / (exchangeRateStored * parseUnits("1", decimals));

  return cTokenAmount;
}

function cTokenToUnderlyingAmount({
  cTokenAmount,
  exchangeRateStored,
  decimals,
}: { cTokenAmount: bigint; exchangeRateStored: bigint; decimals: number }) {
  const underlyingAmount = (cTokenAmount * exchangeRateStored * parseUnits("1", decimals)) / scaledExchangeRate;

  return underlyingAmount;
}

test("prepare adapter trade for Compound V2 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  const exchangeRateStored = await publicClient.readContract({
    abi: abiCToken,
    address: COMPOUND_V2_C_ETH,
    functionName: "exchangeRateStored",
  });

  const slippage = 1n;

  const minCTokenAmount = underlyingToCTokenAmount({
    underlyingAmount: depositAmount,
    exchangeRateStored,
    decimals: 18,
  });

  const minCTokenAmountWithSlippage = multiplyBySlippage({ amount: minCTokenAmount, slippage });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V2_ADAPTER,
      callArgs: {
        type: Integration.CompoundV2Lend,
        cToken: COMPOUND_V2_C_ETH,
        depositAmount: depositAmount,
        minCTokenAmount: minCTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V2_C_ETH,
    account: vaultProxy,
    expected: minCTokenAmount,
    fuzziness: minCTokenAmount - minCTokenAmountWithSlippage,
  });
});

test("prepareUseIntegration for Compound V2 lend should be equal to encoded data with encodeCallArgsForCompoundV2Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V2_ADAPTER,
      callArgs: {
        type: Integration.CompoundV2Lend,
        cToken: COMPOUND_V2_C_ETH,
        depositAmount: toWei(100),
        minCTokenAmount: 0n,
      },
    }),
  ).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x0000000000000000000000006ce8095a692aff6698c3aa8593be3976b6b8743d099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000600000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed50000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for Compound V2 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  const exchangeRateStored = await publicClient.readContract({
    abi: abiCToken,
    address: COMPOUND_V2_C_ETH,
    functionName: "exchangeRateStored",
  });

  const slippage = 1n;

  const minCTokenAmount = underlyingToCTokenAmount({
    underlyingAmount: investmentAmount,
    exchangeRateStored,
    decimals: 18,
  });

  const minCTokenAmountWithSlippage = multiplyBySlippage({ amount: minCTokenAmount, slippage });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V2_ADAPTER,
      callArgs: {
        type: Integration.CompoundV2Lend,
        cToken: COMPOUND_V2_C_ETH,
        depositAmount: investmentAmount,
        minCTokenAmount: minCTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V2_C_ETH,
    account: vaultProxy,
    expected: minCTokenAmount,
    fuzziness: minCTokenAmount - minCTokenAmountWithSlippage,
  });

  const minUnderlyingAmount = cTokenToUnderlyingAmount({
    cTokenAmount: minCTokenAmountWithSlippage,
    exchangeRateStored,
    decimals: 18,
  });

  const minUnderlyingAmountWithSlippage = multiplyBySlippage({ amount: minUnderlyingAmount, slippage });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V2_ADAPTER,
      callArgs: {
        type: Integration.CompoundV2Redeem,
        cToken: COMPOUND_V2_C_ETH,
        redeemAmount: minCTokenAmountWithSlippage,
        minUnderlyingAmount: minUnderlyingAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: minUnderlyingAmount,
    fuzziness: minUnderlyingAmount - minUnderlyingAmountWithSlippage,
  });
});

test("prepareUseIntegration for Compound V2 redeem should be equal to encoded data with encodeCallArgsForCompoundV2Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V2_ADAPTER,
      callArgs: {
        type: Integration.CompoundV2Redeem,
        cToken: COMPOUND_V2_C_ETH,
        redeemAmount: toWei(100),
        minUnderlyingAmount: 0n,
      },
    }),
  ).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x0000000000000000000000006ce8095a692aff6698c3aa8593be3976b6b8743dc29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000600000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed50000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
