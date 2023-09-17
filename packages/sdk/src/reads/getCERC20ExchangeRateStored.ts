import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
  constant: true,
  inputs: [],
  name: "exchangeRateStored",
  outputs: [{ name: "", type: "uint256" }],
  payable: false,
  stateMutability: "view",
  type: "function",
} as const;

export function getCERC20ExchangeRateStored(
  client: PublicClient,
  args: ReadContractParameters<{
    cToken: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "exchangeRateStored",
    address: args.cToken,
  });
}
