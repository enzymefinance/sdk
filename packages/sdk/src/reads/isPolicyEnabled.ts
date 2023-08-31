import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { readContract } from "viem/contract";

export async function isPolicyEnabled(
  client: PublicClient,
  args: ReadContractParameters<{
    policy: Address;
    policyManager: Address;
    comptrollerProxy: Address;
  }>,
): Promise<boolean> {
  const enabledPolicies = await readContract(client, {
    ...readContractParameters(args),
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: args.policyManager,
    args: [args.comptrollerProxy],
  });

  return enabledPolicies.some((enabledPolicy) => isAddressEqual(enabledPolicy, args.policy));
}
