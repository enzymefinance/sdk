import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, isAddressEqual } from "viem";

export * as Policies from "@enzymefinance/sdk/internal/Extensions/Policies";

export async function getEnabledPolicies(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    policyManager: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: args.policyManager,
    args: [args.comptrollerProxy],
  });
}

export async function isEnabledPolicy(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
    policyManager: Address;
    comptrollerProxy: Address;
  }>,
): Promise<boolean> {
  const enabledPolicies = await getEnabledPolicies(client, args);
  return enabledPolicies.some((enabledPolicy) => isAddressEqual(enabledPolicy, args.policy));
}

export function getPolicyIdentifier(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IPolicy,
    functionName: "identifier",
    address: args.policy,
  });
}
