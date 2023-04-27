import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { readContract } from "viem/contract";

export type IsPolicyEnabledParams = {
  policy: Address;
  policyManager: Address;
  comptrollerProxy: Address;
};

export async function isPolicyEnabled(
  client: PublicClient,
  { policy, policyManager, comptrollerProxy }: IsPolicyEnabledParams,
): Promise<boolean> {
  const enabledPolicies = await readContract(client, {
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: policyManager,
    args: [comptrollerProxy],
  });

  return enabledPolicies.some((enabledPolicy) => isAddressEqual(enabledPolicy, policy));
}
