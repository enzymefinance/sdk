import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem, type Address, type PublicClient } from "viem";

export function prepareRemoveNominatedOwnerParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "removeNominatedOwner" }),
  });
}
export interface SimulateRemoveNominatedOwnerParams {
  publicClient: PublicClient;
  vaultProxy: Address;
  account: Address;
}

export async function simulateRemoveNominatedOwner({
  vaultProxy,
  account,
  publicClient,
}: SimulateRemoveNominatedOwnerParams) {
  const { request, result } = await publicClient.simulateContract({
    account,
    address: vaultProxy,
    ...prepareRemoveNominatedOwnerParams(),
  });

  return {
    request,
    result,
  };
}
