import { IDispatcher } from "@enzymefinance/abis/IDispatcher";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getFundDeployerForVaultProxy(
  client: PublicClient,
  {
    vault,
    dispatcher,
  }: {
    vault: Address;
    dispatcher: Address;
  },
) {
  return readContract(client, {
    abi: IDispatcher,
    functionName: "getFundDeployerForVaultProxy",
    address: dispatcher,
    args: [vault],
  });
}
