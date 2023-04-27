import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export type DoesAutoProtocolFeeSharesBuybackParams = {
  comptrollerProxy: Address;
};

export function doesAutoProtocolFeeSharesBuyback(
  client: PublicClient,
  { comptrollerProxy }: DoesAutoProtocolFeeSharesBuybackParams,
) {
  return readContract(client, {
    abi: IComptroller,
    address: comptrollerProxy,
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
