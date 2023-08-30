import { AAVE_V3_ADAPTER, AAVE_V3_A_WETH, ALICE, BOB, INTEGRATION_MANAGER, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { test } from "vitest";

test("prepare adapter trade for Aave V3 lend should work correctly", async () => {
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

  await sendTestTransaction({
    clientNetwork: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Lend,
        aToken: AAVE_V3_A_WETH,
        depositAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V3_A_WETH,
    account: vaultProxy,
    expected: depositAmount,
    fuzziness: 100n,
  });
});

test("prepare adapter trade for Aave V3 redeem should work correctly", async () => {
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

  await sendTestTransaction({
    clientNetwork: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Lend,
        aToken: AAVE_V3_A_WETH,
        depositAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V3_A_WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });

  await sendTestTransaction({
    clientNetwork: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V3_ADAPTER,
      callArgs: {
        type: Integration.AaveV3Redeem,
        aToken: AAVE_V3_A_WETH,
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
