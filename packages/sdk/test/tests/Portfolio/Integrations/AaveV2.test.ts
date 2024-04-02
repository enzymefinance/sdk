import { Portfolio, Utils } from "@enzymefinance/sdk";
import { TestActions, TestSetup } from "@enzymefinance/sdk/test";
import type { Address } from "viem";
import { test } from "vitest";

const environment = TestSetup.mainnet();

const vaultOwner = environment.constants.alice;
const sharesBuyer = environment.constants.bob;
const depositAmount = Utils.Conversion.toWei(250);

let comptrollerProxy: Address;
let vaultProxy: Address;

test("create vault", async () => {
  ({ comptrollerProxy, vaultProxy } = await TestActions.createVaultAndBuyShares({
    environment,
    vaultOwner,
    sharesBuyer,
    depositAmount,
  }));
});

test("lend should work correctly", async () => {
  await environment.send({
    account: vaultOwner,
    transaction: Portfolio.Integrations.AaveV2.lend({
      comptrollerProxy,
      integrationManager: environment.constants.integrationManager,
      integrationAdapter: environment.constants.aaveV2Adapter,
      callArgs: {
        aToken: environment.constants.aaveV2AWeth,
        depositAmount,
      },
    }),
  });

  await TestActions.assertBalanceOf({
    environment,
    asset: environment.constants.aaveV2AWeth,
    owner: vaultProxy,
    expected: depositAmount,
  });
});

test("redeem should work correctly", async () => {
  await environment.send({
    account: vaultOwner,
    transaction: Portfolio.Integrations.AaveV2.redeem({
      comptrollerProxy,
      integrationManager: environment.constants.integrationManager,
      integrationAdapter: environment.constants.aaveV2Adapter,
      callArgs: {
        aToken: environment.constants.aaveV2AWeth,
        redeemAmount: depositAmount,
      },
    }),
  });

  await TestActions.assertBalanceOf({
    environment,
    asset: environment.constants.weth,
    owner: vaultProxy,
    expected: depositAmount,
  });
});
