import { IComptrollerLib } from "@enzymefinance/abis/IComptrollerLib";
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
    abi: IComptrollerLib,
    address: comptrollerProxy,
    functionName: "doesAutoProtocolFeeSharesBuyback",
  });
}
