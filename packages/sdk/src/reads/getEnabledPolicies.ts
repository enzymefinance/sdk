import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { getPolicyManager } from "./getPolicyManager.js";
import { IPolicyManager } from "@enzymefinance/abis/IPolicyManager";
import type { Address, PublicClient } from "viem";

export async function getEnabledPolicies(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
    policyManager?: Address;
  }>,
) {
  const policyManager = args.policyManager ?? (await getPolicyManager(client, args));

  return client.readContract({
    ...readContractParameters(args),
    abi: IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: policyManager,
    args: [args.comptrollerProxy],
  });
}
