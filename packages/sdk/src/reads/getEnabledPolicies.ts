import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getEnabledPolicies(
  client: PublicClient,
  args: ReadContractParameters<{
    comptroller: Address;
    policyManager: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: args.policyManager,
    args: [args.comptroller],
  });
}
