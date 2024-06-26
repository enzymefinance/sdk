import { LifeCycle } from "@enzymefinance/sdk";
import type { TestEnvironment } from "@enzymefinance/sdk/test";
import type { Address, Hex } from "viem";

export async function createVault({
  environment,
  vaultOwner,
  vaultName = "Test Vault",
  vaultSymbol = "TEST",
  sharesActionTimelockInSeconds = 0n,
  feeManagerConfigData = "0x",
  policyManagerConfigData = "0x",
  denominationAsset = environment.constants.weth,
}: {
  environment: TestEnvironment;
  vaultOwner: Address;
  vaultName?: string;
  vaultSymbol?: string;
  sharesActionTimelockInSeconds?: bigint;
  feeManagerConfigData?: Hex;
  policyManagerConfigData?: Hex;
  denominationAsset?: Address;
}) {
  const {
    result: [comptrollerProxy, vaultProxy],
  } = await environment.send({
    account: vaultOwner,
    transaction: LifeCycle.createVault({
      fundDeployer: environment.constants.fundDeployer,
      owner: vaultOwner,
      name: vaultName,
      symbol: vaultSymbol,
      sharesActionTimelockInSeconds,
      feeManagerConfigData,
      policyManagerConfigData,
      denominationAsset,
    }),
  });

  return { comptrollerProxy, vaultProxy };
}
