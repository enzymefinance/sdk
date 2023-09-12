import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IGatedRedemptionQueueSharesWrapperLib } from "@enzymefinance/abis/IGatedRedemptionQueueSharesWrapperLib";
import type { Address, PublicClient } from "viem";

export function getSharesWrapperDepositQueueUser(
  client: PublicClient,
  args: ReadContractParameters<{
    sharesWrapper: Address;
    depositAsset: Address;
    user: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getDepositQueueUserRequest",
    address: args.sharesWrapper,
    args: [args.depositAsset, args.user],
  });
}
