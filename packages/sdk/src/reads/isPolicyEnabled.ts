import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { getPolicyManager } from "./getPolicyManager.js";
import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import { type Address, type PublicClient, isAddressEqual } from "viem";

export async function isPolicyEnabled(
  client: PublicClient,
  args: ReadContractParameters<{
    policy: Address;
    policyManager?: Address;
    comptrollerProxy: Address;
  }>,
): Promise<boolean> {
  const policyManager = args.policyManager ?? (await getPolicyManager(client, args));
  const enabledPolicies = await client.readContract({
    ...readContractParameters(args),
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: policyManager,
    args: [args.comptrollerProxy],
  });

  return enabledPolicies.some((enabledPolicy) => isAddressEqual(enabledPolicy, args.policy));
}
