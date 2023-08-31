import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import type { Address, PublicClient } from "viem";

export function getEnabledPolicies(
  client: PublicClient,
  args: ReadContractParameters<{
    comptroller: Address;
    policyManager: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: args.policyManager,
    args: [args.comptroller],
  });
}
