import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "../../Utils";

export function getDepositQueueUserRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    depositAsset: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getDepositQueueUserRequest",
    address: args.sharesWrapper,
    args: [args.depositAsset, args.user],
  });
}

export async function getRedemptionQueueUsers(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesWrapperId: Address;
  }>,
) {
  const sharesWrapperUsers = await Viem.readContract(client, args, {
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsers",
    address: args.sharesWrapperId,
  });

  return sharesWrapperUsers.length;
}
