import type { Address, PublicClient } from "viem";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { readContract } from "viem/contract";

export type GetSharesActionTimelockParams = {
  /**
   * The address of the `ComptrollerProxy` contract of the vault.
   */
  comptrollerProxy: Address;
};

/**
 * Get the shares action timelock.
 *
 * @param client The public client to use to read the contract.
 * @returns The shares action timelock in seconds.
 */
export function getSharesActionTimelock(client: PublicClient, { comptrollerProxy }: GetSharesActionTimelockParams) {
  return readContract(client, {
    abi: IComptroller,
    address: comptrollerProxy,
    functionName: "getSharesActionTimelock",
  });
}
