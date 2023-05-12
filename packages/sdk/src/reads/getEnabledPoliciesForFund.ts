import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export async function getEnabledPoliciesForFund(
  client: PublicClient,
  {
    comptroller,
    policyManager,
  }: {
    comptroller: Address;
    policyManager: Address;
  },
) {
  const enabledPolicies = await readContract(client, {
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: policyManager,
    args: [comptroller],
  });

  return enabledPolicies;
}
