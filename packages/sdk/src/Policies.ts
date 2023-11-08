import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { Viem } from "./Utils.js";

export * as Policies from "./internal/Extensions/Policies.js";
export * as PolicyManager from "./internal/PolicyManager.js";

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
