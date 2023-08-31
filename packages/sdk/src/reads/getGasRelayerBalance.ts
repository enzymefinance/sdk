import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IGasRelayPaymasterLib } from "@enzymefinance/abis/IGasRelayPaymasterLib";
import type { Address, PublicClient } from "viem";

export function getGasRelayerBalance(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: IGasRelayPaymasterLib,
    address: args.comptrollerProxy,
    functionName: "getRelayHubDeposit",
  });
}
