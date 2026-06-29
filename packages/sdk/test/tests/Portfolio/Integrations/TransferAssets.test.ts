import { Portfolio, Utils } from "@enzymefinance/sdk";
import { TestActions, TestSetup } from "@enzymefinance/sdk/test";
import type { Address } from "viem";
import { beforeAll, describe, test } from "vitest";

const environment = TestSetup.mainnet();

const vaultOwner = environment.constants.alice;
const sharesBuyer = environment.constants.bob;
const transferRecipient = environment.constants.carol;
const depositAmount = Utils.Conversion.toWei(10);

describe("TransferAssets", () => {
  let comptrollerProxy: Address;

  beforeAll(async () => {
    ({ comptrollerProxy } = await TestActions.createVaultAndBuyShares({
      environment,
      vaultOwner,
      sharesBuyer,
      depositAmount,
    }));
  });

  test("transfer assets should work correctly", async () => {
    await environment.send({
      account: vaultOwner,
      transaction: Portfolio.Integrations.TransferAssets.transfer({
        comptrollerProxy,
        integrationManager: environment.constants.integrationManager,
        integrationAdapter: environment.constants.transferAssetsAdapter,
        callArgs: {
          recipient: transferRecipient,
          assetAddresses: [environment.constants.weth],
          assetAmounts: [depositAmount],
        },
      }),
    });

    await TestActions.assertBalanceOf({
      environment,
      asset: environment.constants.weth,
      owner: transferRecipient,
      expected: depositAmount,
    });
  });
});
