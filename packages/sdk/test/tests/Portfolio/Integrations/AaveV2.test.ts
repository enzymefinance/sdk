import { Portfolio, Utils } from "@enzymefinance/sdk";
import { TestActions, TestSetup } from "@enzymefinance/sdk/test";
import { parseAbi } from "viem";
import { describe, test } from "vitest";

const environment = TestSetup.mainnet({ resetHook: "beforeEach" });

const vaultOwner = environment.constants.alice;
const sharesBuyer = environment.constants.bob;
const liquidityProvider = environment.constants.dave;
// Modest size; Aave V2 WETH utilization at the pinned fork block is high.
const depositAmount = Utils.Conversion.toWei(1);
const amountFuzziness = Utils.Conversion.toWei(1) / 1000n; // 0.001 ETH

/**
 * Aave V2 aTokens hold underlying ERC20 balances. At some fork blocks WETH utilization is so
 * high that withdraws revert with `SafeERC20: low-level call failed` even right after a deposit.
 * Seeding extra WETH onto the aToken contract makes the underlying transfer succeed.
 */
async function seedAaveV2WethLiquidity(amount: bigint) {
  await TestActions.wrapEther({
    account: liquidityProvider,
    amount,
    environment,
  });

  await environment.send({
    account: liquidityProvider,
    transaction: new Utils.Viem.PopulatedTransaction({
      abi: parseAbi(["function transfer(address to, uint256 amount) returns (bool)"] as const),
      functionName: "transfer",
      address: environment.constants.weth,
      args: [environment.constants.aaveV2AWeth, amount],
    }),
  });
}

describe("AaveV2", () => {
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

      // CI Anvil + this fork block otherwise fails redeem with SafeERC20 on the WETH transfer.
      await seedAaveV2WethLiquidity(Utils.Conversion.toWei(10));

      // Redeem the deposited amount (not full aToken balance) to avoid ray-math overshoot.
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
        fuzziness: amountFuzziness,
      });
    },
    { timeout: 60_000 },
  );
});
