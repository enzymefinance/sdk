import { IAllowedSharesTransferRecipientsPolicy } from "@enzymefinance/abis/IAllowedSharesTransferRecipientsPolicy";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getAllowedSharesTransferRecipientsSettings(
  client: PublicClient,
  {
    comptrollerProxy,
    address,
  }: {
    comptrollerProxy: Address;
    address: Address;
  },
) {
  return readContract(client, {
    abi: IAllowedSharesTransferRecipientsPolicy,
    functionName: "getListIdsForFund",
    args: [comptrollerProxy],
    address,
  });
}
