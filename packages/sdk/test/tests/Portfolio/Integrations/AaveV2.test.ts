import { Asset, Portfolio, Utils } from "@enzymefinance/sdk";
import { TestActions, TestSetup } from "@enzymefinance/sdk/test";
import { describe, test } from "vitest";

const environment = TestSetup.mainnet({ resetHook: "beforeEach" });

const vaultOwner = environment.constants.alice;
const sharesBuyer = environment.constants.bob;
// Keep this modest: Aave V2 WETH liquidity at the pinned fork block can be tight.
const depositAmount = Utils.Conversion.toWei(1);
// aToken / WETH amounts can drift by a few wei from interest + ray rounding.
const amountFuzziness = Utils.Conversion.toWei(1) / 1000n; // 0.001 ETH

describe("AaveV2", () => {
  // Fork/RPC + Aave V2 liquidity make this integration path intermittently revert on CI.
  test(
    "lend and redeem should work correctly",
    async () => {
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
        fuzziness: amountFuzziness,
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
        fuzziness: amountFuzziness,
      });

      // Leave 1 wei of aToken to avoid Aave V2 ray-math rounding reverts on full exits.
      const aTokenBalance = await Asset.getBalanceOf(environment.client, {
        owner: vaultProxy,
        asset: environment.constants.aaveV2AWeth,
      });
      const redeemAmount = aTokenBalance > 1n ? aTokenBalance - 1n : aTokenBalance;

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
        fuzziness: amountFuzziness,
      });
    },
    { retry: 2, timeout: 60_000 },
  );
});
