import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, isAddressEqual } from "viem";

export * as Policies from "@enzymefinance/sdk/internal/Extensions/Policies";

export async function getEnabled(
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

export async function isEnabled(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    policy: Address;
    policyManager: Address;
    comptrollerProxy: Address;
  }>,
): Promise<boolean> {
  const enabledPolicies = await getEnabled(client, args);
  return enabledPolicies.some((enabledPolicy) => isAddressEqual(enabledPolicy, args.policy));
}

export function getIdentifier(
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
