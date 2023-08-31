import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/contract";

export function getAssetAllowance(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
    owner: Address;
    spender: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: parseAbi(["function allowance(address, address) view returns (uint256)"] as const),
    functionName: "allowance",
    address: args.asset,
    args: [args.owner, args.spender],
  });
}
