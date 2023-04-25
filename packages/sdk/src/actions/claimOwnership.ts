import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address, type PublicClient } from "viem";
import type { Hex } from "viem";
import { publicClient } from "../../tests/globals.js";

export function prepareClaimOwnershipParams() {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "claimOwnership" }),
  });
}
export interface SimulateClaimOwnershipParams {
  vaultProxy: Address;
  address: Address;
}

export async function simulateClaimOwnership({ vaultProxy, address }: SimulateClaimOwnershipParams) {
  const { request, result } = await publicClient.simulateContract({
    account: vaultProxy,
    address,
    ...prepareClaimOwnershipParams(),
  });

  return {
    request,
    result,
  };
}
