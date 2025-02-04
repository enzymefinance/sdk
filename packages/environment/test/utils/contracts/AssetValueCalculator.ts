import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { simulateContract } from "viem/actions";

export async function calcNormalizedAssetValue(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ assetValueCalculator: Address; baseAsset: Address; quoteAsset: Address }>,
) {
  const {
    result: [timestamp, value, valueIsValid],
  } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function calcNormalizedAssetValue(address _baseAsset, address _quoteAsset) returns (uint256 timestamp_, uint256 value_, bool valueIsValid_)",
    ]),
    functionName: "calcNormalizedAssetValue",
    address: args.assetValueCalculator,
    args: [args.baseAsset, args.quoteAsset],
  });

  return { timestamp, value, valueIsValid };
}
