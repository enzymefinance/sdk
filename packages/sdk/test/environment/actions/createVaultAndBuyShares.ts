import { TestActions, TestEnvironment } from "@enzymefinance/sdk/test";
import { Address, Chain, Hex } from "viem";

export async function createVaultAndBuyShares<TChain extends Chain | undefined = Chain>({
  environment,
  vaultOwner,
  vaultName = "Test Vault",
  vaultSymbol = "TEST",
  sharesActionTimelockInSeconds = 0n,
  feeManagerConfigData = "0x",
  policyManagerConfigData = "0x",
  denominationAsset = environment.constants.weth,
  sharesBuyer,
  depositAmount,
}: {
  environment: TestEnvironment<TChain>;
  vaultOwner: Address;
  vaultName?: string;
  vaultSymbol?: string;
  sharesActionTimelockInSeconds?: bigint;
  feeManagerConfigData?: Hex;
  policyManagerConfigData?: Hex;
  denominationAsset?: Address;
  sharesBuyer: Address;
  depositAmount: bigint;
}) {
  const { comptrollerProxy, vaultProxy } = await TestActions.createVault({
    environment,
    vaultOwner,
    vaultName,
    vaultSymbol,
    sharesActionTimelockInSeconds,
    feeManagerConfigData,
    policyManagerConfigData,
    denominationAsset,
  });

  const sharesReceived = await TestActions.buyShares({
    environment,
    comptrollerProxy,
    sharesBuyer,
    depositAmount,
  });

  return { comptrollerProxy, vaultProxy, sharesReceived };
}
