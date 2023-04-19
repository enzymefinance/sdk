import type { Address, PublicClient } from "viem";
import { IComptroller } from "@enzymefinance/abis/IComptroller";

export function getSharesActionTimelock({
  publicClient,
  comptrollerProxy,
}: {
  publicClient: PublicClient;
  comptrollerProxy: Address;
}) {
  return publicClient.readContract({
    abi: IComptroller,
    address: comptrollerProxy,
    functionName: "getSharesActionTimelock",
  });
}
