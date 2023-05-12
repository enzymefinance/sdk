import { getFundDeployerForVaultProxy } from "./getFundDeployerForVaultProxy.js";
import { type Address, type PublicClient, isAddressEqual } from "viem";

export async function getVaultRelease(
  client: PublicClient,
  {
    vault,
    dispatcher,
    fundDeployerSulu,
    fundDeployerEncore,
    fundDeployerPhoenix,
  }: {
    dispatcher: Address;
    vault: Address;
    fundDeployerSulu: Address;
    fundDeployerEncore: Address;
    fundDeployerPhoenix: Address;
  },
): Promise<{ name: string; version: number }> {
  const fundDeployer = await getFundDeployerForVaultProxy(client, { vault, dispatcher });

  if (isAddressEqual(fundDeployer, fundDeployerSulu)) {
    return { name: "Sulu", version: 4 };
  }

  if (isAddressEqual(fundDeployer, fundDeployerEncore)) {
    return { name: "Encore", version: 3 };
  }

  if (isAddressEqual(fundDeployer, fundDeployerPhoenix)) {
    return { name: "Phoenix", version: 2 };
  }

  throw new Error(`Unknown fund deployer: ${fundDeployer}`);
}
