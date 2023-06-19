import { IPolicy } from "@enzymefinance/abis/IPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getPolicyIdentifier(
  client: PublicClient,
  {
    policy,
  }: {
    policy: Address;
  },
) {
  return readContract(client, {
    abi: IPolicy,
    functionName: "identifier",
    address: policy,
  });
}
