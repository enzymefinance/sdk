import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";

export function getAssetDecimals(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: parseAbi(["function decimals() view returns (uint)"] as const),
    functionName: "decimals",
    address: args.asset,
  });
}
