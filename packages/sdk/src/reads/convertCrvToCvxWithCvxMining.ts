import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
  inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
  name: "ConvertCrvToCvx",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "view",
  type: "function",
};

export async function convertCrvToCvxWithCvxMining(
  client: PublicClient,
  args: ReadContractParameters<{
    cvxMining: Address;
    amount: bigint;
  }>,
) {
  const result = await client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    address: args.cvxMining,
    functionName: "ConvertCrvToCvx",
    args: [args.amount],
  });

  return result;
}
