import { IGasRelayPaymasterLib } from "@enzymefinance/abis/IGasRelayPaymasterLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export type GetAutoProtocolFeeSharesBuyBackEnabledParams = {
  comptrollerProxy: Address;
};

export function getAutoProtocolFeeSharesBuyBackEnabled(
  client: PublicClient,
  { comptrollerProxy }: GetAutoProtocolFeeSharesBuyBackEnabledParams,
) {
  return readContract(client, {
    abi: IGasRelayPaymasterLib,
    address: comptrollerProxy,
    functionName: "getRelayHubDeposit",
  });
}
