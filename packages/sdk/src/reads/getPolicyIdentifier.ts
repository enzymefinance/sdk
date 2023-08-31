import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IPolicy } from "@enzymefinance/abis/IPolicy";
import type { Address, PublicClient } from "viem";

export function getPolicyIdentifier(
  client: PublicClient,
  args: ReadContractParameters<{
    policy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IPolicy,
    functionName: "identifier",
    address: args.policy,
  });
}
