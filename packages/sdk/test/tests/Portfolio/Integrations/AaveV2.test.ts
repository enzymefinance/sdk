import { Asset, Portfolio, Utils } from "@enzymefinance/sdk";
import { TestActions, TestSetup } from "@enzymefinance/sdk/test";
import { describe, test } from "vitest";

const environment = TestSetup.mainnet({ resetHook: "beforeEach" });

const vaultOwner = environment.constants.alice;
const sharesBuyer = environment.constants.bob;
const depositAmount = Utils.Conversion.toWei(10);

describe("AaveV2", () => {
  test("lend and redeem should work correctly", async () => {
    const { comptrollerProxy, vaultProxy } = await TestActions.createVaultAndBuyShares({
      environment,
      vaultOwner,
      sharesBuyer,
      depositAmount,
    });

    await TestActions.assertBalanceOf({
      environment,
      asset: environment.constants.weth,
      owner: vaultProxy,
      expected: depositAmount,
    });

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

    const redeemAmount = await Asset.getBalanceOf(environment.client, {
      owner: vaultProxy,
      asset: environment.constants.aaveV2AWeth,
    });

    await environment.send({
      account: vaultOwner,
      transaction: Portfolio.Integrations.AaveV2.redeem({
        comptrollerProxy,
        integrationManager: environment.constants.integrationManager,
        integrationAdapter: environment.constants.aaveV2Adapter,
        callArgs: {
          aToken: environment.constants.aaveV2AWeth,
          redeemAmount,
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
});
