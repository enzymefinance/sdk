import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export function getAssetAmount(
  client: PublicClient,
  args: ReadContractParameters<{
    owner: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"] as const),
    functionName: "balanceOf",
    address: args.asset,
    args: [args.owner],
  });
}
