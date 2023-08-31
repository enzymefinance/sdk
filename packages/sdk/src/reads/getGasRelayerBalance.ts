import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IGasRelayPaymasterLib } from "@enzymefinance/abis/IGasRelayPaymasterLib";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

export function getGasRelayerBalance(
  client: PublicClient,
  args: ReadContractParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: IGasRelayPaymasterLib,
    address: args.comptrollerProxy,
    functionName: "getRelayHubDeposit",
  });
}
