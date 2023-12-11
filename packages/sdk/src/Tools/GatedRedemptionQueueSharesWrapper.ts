import * as Abis from "@enzymefinance/abis";
import type { Address, Chain, PublicClient, Transport } from "viem";
import { Viem } from "../Utils.js";

export function getDepositQueueUser<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
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

export function getRedemptionQueueUsers<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    sharesWrapperId: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsers",
    address: args.sharesWrapperId,
  });
}

export async function getRedemptionQueueUsersLength<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    sharesWrapperId: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsersLength",
    address: args.sharesWrapperId,
  });
}
