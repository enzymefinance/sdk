import { Portfolio, Utils } from "@enzymefinance/sdk";
import { TestActions, TestSetup } from "@enzymefinance/sdk/test";
import type { Address } from "viem";
import { test } from "vitest";

const environment = TestSetup.mainnet();

const vaultOwner = environment.constants.alice;
const sharesBuyer = environment.constants.bob;
const depositAmount = Utils.Conversion.toWei(10);

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

test("wrap should work correctly", async () => {
  const receivedEthx = await Portfolio.Integrations.Stader.previewDeposit(environment.client, {
    staderStakingPoolManager: environment.constants.staderStakingPoolManager,
    depositAmount,
  });

  await environment.send({
    account: vaultOwner,
    transaction: Portfolio.Integrations.Stader.wrap({
      comptrollerProxy,
      integrationManager: environment.constants.integrationManager,
      integrationAdapter: environment.constants.staderStakingAdapter,
      callArgs: {
        outgoingAmount: depositAmount,
        minIncomingAmount: receivedEthx,
      },
    }),
  });

  await TestActions.assertBalanceOf({
    environment,
    asset: environment.constants.ethx,
    owner: vaultProxy,
    expected: receivedEthx,
  });
});
