import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function isSupportedAsset(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ priceFeed: Address; asset: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function isSupportedAsset(address _assetAddress) view returns (bool isSupported_)"]),
    functionName: "isSupportedAsset",
    address: args.priceFeed,
    args: [args.asset],
  });
}
