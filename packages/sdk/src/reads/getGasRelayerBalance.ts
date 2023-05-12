import { IGasRelayPaymasterLib } from "@enzymefinance/abis/IGasRelayPaymasterLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getGasRelayerBalance(
  client: PublicClient,
  {
    comptrollerProxy,
  }: {
    comptrollerProxy: Address;
  },
) {
  return readContract(client, {
    abi: IGasRelayPaymasterLib,
    address: comptrollerProxy,
    functionName: "getRelayHubDeposit",
  });
}
