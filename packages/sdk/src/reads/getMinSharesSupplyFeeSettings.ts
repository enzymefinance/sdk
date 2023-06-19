import { IMinSharesSupplyFee } from "@enzymefinance/abis/IMinSharesSupplyFee";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getMinSharesSupplyFeeSettings(
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
    abi: IMinSharesSupplyFee,
    functionName: "getRecipientForFund",
    args: [comptrollerProxy],
    address,
  });
}
