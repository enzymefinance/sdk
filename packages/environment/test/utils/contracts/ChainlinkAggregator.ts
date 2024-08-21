import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function aggregatorDescription(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ aggregator: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function description() external view returns (string memory)"]),
    functionName: "description",
    address: args.aggregator,
  });
}

export function aggregatorDecimals(client: PublicClient, args: Viem.ContractCallParameters<{ aggregator: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function decimals() external view returns (uint8 decimals_)"]),
    functionName: "decimals",
    address: args.aggregator,
  });
}
