import { AAVE_V2_ADAPTER, AAVE_V2_A_WETH, ALICE, BOB, INTEGRATION_MANAGER, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { test } from "vitest";

test("prepare adapter trade for Aave V2 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    network: "mainnet",
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V2_ADAPTER,
      callArgs: {
        type: Integration.AaveV2Lend,
        aToken: AAVE_V2_A_WETH,
        depositAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V2_A_WETH,
    account: vaultProxy,
    expected: depositAmount,
    fuzziness: 100n,
  });
});

test("prepare adapter trade for Aave V2 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    network: "mainnet",
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V2_ADAPTER,
      callArgs: {
        type: Integration.AaveV2Lend,
        aToken: AAVE_V2_A_WETH,
        depositAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V2_A_WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V2_ADAPTER,
      callArgs: {
        type: Integration.AaveV2Redeem,
        aToken: AAVE_V2_A_WETH,
        redeemAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });
});
