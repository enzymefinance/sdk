import {
  ALICE,
  BOB,
  COMPOUND_V2_ADAPTER,
  COMPOUND_V2_C_ETH,
  INTEGRATION_MANAGER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { parseAbi, parseUnits } from "viem";
import { test } from "vitest";

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

  const exchangeRateStored = await publicClientMainnet.readContract({
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
    clientNetwork: "mainnet",
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

  const exchangeRateStored = await publicClientMainnet.readContract({
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
    clientNetwork: "mainnet",
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
    clientNetwork: "mainnet",
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
