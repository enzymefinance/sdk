import { type PrepareSetupVaultParamsArgs, prepareSetupVaultParams } from "../../src/actions/setupVault.js";
import type { PartialPick } from "../../src/utils/types.js";
import { ALICE, FUND_DEPLOYER } from "../constants.js";
import { sendTestTransaction } from "../globals.js";

export type CreateTestVaultSettings = PartialPick<PrepareSetupVaultParamsArgs, "vaultName" | "vaultSymbol">;

export async function createTestVault(settings: CreateTestVaultSettings) {
  const {
    result: [comptrollerProxy, vaultProxy],
  } = await sendTestTransaction({
    ...prepareSetupVaultParams({
      vaultName: "Test Vault",
      vaultSymbol: "TEST",
      sharesActionTimelock: 0n, // Set the timelock to 0 so we can test more easily. This should not be done in production.
      ...settings,
    }),
    account: settings.vaultOwner ?? ALICE,
    address: FUND_DEPLOYER,
  });

  return { vaultProxy, comptrollerProxy };
}
