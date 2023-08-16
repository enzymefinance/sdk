import { increaseTimeAndMine } from "../../../../tests/actions/increaseTimeAndMine.js";
import {
  ALICE,
  BOB,
  COMP,
  COMPOUND_V3_ADAPTER,
  COMPOUND_V3_C_WETH,
  INTEGRATION_MANAGER,
  WETH,
} from "../../../../tests/constants.js";
import { sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toSeconds, toWei } from "../../../utils/conversion.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { expect, test } from "vitest";

test("prepare adapter trade for Compound V3 lend should work correctly", async () => {
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
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Lend,
        cToken: COMPOUND_V3_C_WETH,
        depositAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V3_C_WETH,
    account: vaultProxy,
    expected: depositAmount,
    fuzziness: 100n,
  });
});

test("prepare adapter trade for Compound V3 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const investmentAmount = toWei(100);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Lend,
        cToken: COMPOUND_V3_C_WETH,
        depositAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V3_C_WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });

  const redeemAmount = toWei(50);

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Redeem,
        cToken: COMPOUND_V3_C_WETH,
        redeemAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: redeemAmount,
    fuzziness: 100n,
  });
});

test("prepare adapter trade for Compound V3 claim rewards should work correctly", async () => {
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
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3Lend,
        cToken: COMPOUND_V3_C_WETH,
        depositAmount: investmentAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: COMPOUND_V3_C_WETH,
    account: vaultProxy,
    expected: investmentAmount,
    fuzziness: 100n,
  });

  await increaseTimeAndMine({
    seconds: toSeconds({ hours: 1_000 }),
    blocks: 1_000,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: COMPOUND_V3_ADAPTER,
      callArgs: {
        type: Integration.CompoundV3ClaimRewards,
        cTokens: [COMPOUND_V3_C_WETH],
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const compBalance = await testActions.getBalanceOf({
    token: COMP,
    account: vaultProxy,
  });

  expect(compBalance).toBeGreaterThan(0n);
});
