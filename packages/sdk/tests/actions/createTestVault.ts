import { sendTestTransaction } from "../client.js";
import { ALICE, DEPLOYER } from "../constants.js";
import { prepareSetupVaultParams, type PrepareSetupVaultParamsArgs } from "../../src/actions/setupVault.js";
import type { PartialPick } from "../../src/utils/types.js";

export type CreateTestVaultSettings = PartialPick<PrepareSetupVaultParamsArgs, "vaultName" | "vaultSymbol">;

export async function createTestVault(settings: CreateTestVaultSettings) {
  const {
    result: [comptrollerProxy, vaultProxy],
  } = await sendTestTransaction({
    ...prepareSetupVaultParams({
      vaultName: "Test Vault",
      vaultSymbol: "TEST",
      ...settings,
    }),
    account: settings.vaultOwner ?? ALICE,
    address: DEPLOYER,
  });

  return { vaultProxy, comptrollerProxy };
}
