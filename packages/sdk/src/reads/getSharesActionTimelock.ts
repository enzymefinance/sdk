import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

/**
 * Get the shares action timelock.
 *
 * @param client The public client to use to read the contract.
 * @returns The shares action timelock in seconds.
 */
export function getSharesActionTimelock(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getSharesActionTimelock",
  });
}
