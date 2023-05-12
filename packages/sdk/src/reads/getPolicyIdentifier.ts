import { IPolicy } from "@enzymefinance/abis/IPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getPolicyIdentifier(
  client: PublicClient,
  {
    policy,
  }: {
    policy: Address;
  },
) {
  const identifier = await readContract(client, {
    abi: IPolicy,
    functionName: "identifier",
    address: policy,
  });

  return identifier;
}
