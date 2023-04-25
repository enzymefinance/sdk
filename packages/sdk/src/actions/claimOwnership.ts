import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem, type Address } from "viem";
import { publicClient } from "../../tests/globals.js";

export function prepareClaimOwnershipParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "claimOwnership" }),
  });
}
export interface SimulateClaimOwnershipParams {
  vaultProxy: Address;
  account: Address;
}

export async function simulateClaimOwnership({ vaultProxy, account }: SimulateClaimOwnershipParams) {
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
