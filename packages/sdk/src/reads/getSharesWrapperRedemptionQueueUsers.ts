import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IGatedRedemptionQueueSharesWrapperLib } from "@enzymefinance/abis/IGatedRedemptionQueueSharesWrapperLib";
import type { Address, PublicClient } from "viem";

export function getSharesWrapperRedemptionQueueUsers(
  client: PublicClient,
  args: ReadContractParameters<{
    sharesWrapperId: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsers",
    address: args.sharesWrapperId,
  });
}
