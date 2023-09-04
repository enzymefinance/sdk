import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";

export function getAssetAllowance(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
    owner: Address;
    spender: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: parseAbi(["function allowance(address, address) view returns (uint256)"] as const),
    functionName: "allowance",
    address: args.asset,
    args: [args.owner, args.spender],
  });
}
