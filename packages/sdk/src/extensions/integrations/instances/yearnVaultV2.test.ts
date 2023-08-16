import {
  ALICE,
  BOB,
  INTEGRATION_MANAGER,
  WETH,
  YEARN_VAULT_V2_ADAPTER,
  YEARN_VAULT_V2_WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyByRate } from "../../../utils/rates.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { parseAbi } from "viem";
import { test } from "vitest";

const abiYVault = parseAbi(["function pricePerShare() view returns (uint256 price_)"] as const);

test("prepare adapter trade for Yearn Vault V2 lend should work correctly", async () => {
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

  const pricePerShare = await publicClient.readContract({
    abi: abiYVault,
    address: YEARN_VAULT_V2_WETH,
    functionName: "pricePerShare",
  });

  const slippage = 1n;

  const minIncomingYVaultSharesAmount = multiplyByRate({
    inverse: true,
    rate: pricePerShare,
    rateDecimals: 18,
    value: depositAmount,
  });

  const minIncomingYVaultSharesAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingYVaultSharesAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Lend,
        yVault: YEARN_VAULT_V2_WETH,
        depositAmount,
        minIncomingYVaultSharesAmount: minIncomingYVaultSharesAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: YEARN_VAULT_V2_WETH,
    account: vaultProxy,
    expected: minIncomingYVaultSharesAmount,
    fuzziness: minIncomingYVaultSharesAmount - minIncomingYVaultSharesAmountWithSlippage,
  });
});

test("prepare adapter trade for Yearn Vault V2 redeem should work correctly", async () => {
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

  const pricePerShareBeforeLend = await publicClient.readContract({
    abi: abiYVault,
    address: YEARN_VAULT_V2_WETH,
    functionName: "pricePerShare",
  });

  const slippage = 1n;

  const minIncomingYVaultSharesAmount = multiplyByRate({
    inverse: true,
    rate: pricePerShareBeforeLend,
    rateDecimals: 18,
    value: investmentAmount,
  });

  const minIncomingYVaultSharesAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingYVaultSharesAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Lend,
        yVault: YEARN_VAULT_V2_WETH,
        depositAmount: investmentAmount,
        minIncomingYVaultSharesAmount: minIncomingYVaultSharesAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: YEARN_VAULT_V2_WETH,
    account: vaultProxy,
    expected: minIncomingYVaultSharesAmount,
    fuzziness: minIncomingYVaultSharesAmount - minIncomingYVaultSharesAmountWithSlippage,
  });

  const pricePerShareBeforeRedeem = await publicClient.readContract({
    abi: abiYVault,
    address: YEARN_VAULT_V2_WETH,
    functionName: "pricePerShare",
  });

  const minIncomingUnderlyingAmount = multiplyByRate({
    inverse: false,
    rate: pricePerShareBeforeRedeem,
    rateDecimals: 18,
    value: minIncomingYVaultSharesAmountWithSlippage,
  });

  const minIncomingUnderlyingAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingUnderlyingAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Redeem,
        yVault: YEARN_VAULT_V2_WETH,
        maxOutgoingYVaultSharesAmount: minIncomingYVaultSharesAmountWithSlippage,
        minIncomingUnderlyingAmount,
        slippageToleranceBps: slippage * 100n, // convert to bps
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: minIncomingUnderlyingAmount,
    fuzziness: minIncomingUnderlyingAmount - minIncomingUnderlyingAmountWithSlippage,
  });
});
