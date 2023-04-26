import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem, type Address, type PublicClient } from "viem";

export function prepareClaimOwnershipParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "claimOwnership" }),
  });
}
export interface SimulateClaimOwnershipParams {
  publicClient: PublicClient;
  vaultProxy: Address;
  account: Address;
}

export async function simulateClaimOwnership({ publicClient, vaultProxy, account }: SimulateClaimOwnershipParams) {
  const { request, result } = await publicClient.simulateContract({
    account,
    address: vaultProxy,
    ...prepareClaimOwnershipParams(),
  });

  return {
    request,
    result,
  };
}
