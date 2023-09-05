import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IGatedRedemptionQueueSharesWrapperLib } from "@enzymefinance/abis/IGatedRedemptionQueueSharesWrapperLib";
import type { Address, PublicClient } from "viem";

export async function getSharesWrapperRedemptionQueueUsers(
  client: PublicClient,
  args: ReadContractParameters<{
    sharesWrapperId: Address;
  }>,
) {
  const sharesWrapperUsers = await client.readContract({
    ...readContractParameters(args),
    abi: IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsers",
    address: args.sharesWrapperId,
  });

  return sharesWrapperUsers.length;
}
