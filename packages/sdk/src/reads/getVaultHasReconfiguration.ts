import { IFundDeployer } from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getVaultHasReconfigurationRequest(
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
    abi: IFundDeployer,
    functionName: "hasReconfigurationRequest",
    address: dispatcher,
    args: [vault],
  });
}
