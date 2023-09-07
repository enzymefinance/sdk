import type { ReadContractParameters } from "../utils/viem.js";
import { getEnabledPolicies } from "./getEnabledPolicies.js";
import { getMinMaxInvestmentPolicySettings } from "./getMinMaxInvestmentPolicySettings.js";
import { type Address, type PublicClient, isAddressEqual } from "viem";

export async function getEnabledMinMaxInvestmentPolicySettings(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    minMaxInvestmentPolicy: Address;
    policyManager?: Address;
  }>,
) {
  const enabledPolicies = await getEnabledPolicies(client, args);

  const hasMinMaxInvestmentPolicy = enabledPolicies.some((policy) =>
    isAddressEqual(policy, args.minMaxInvestmentPolicy),
  );

  if (!hasMinMaxInvestmentPolicy) {
    return null;
  }

  return getMinMaxInvestmentPolicySettings(client, args);
}
