import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

const abi = {
  inputs: [{ internalType: "address", name: "gauge", type: "address" }],
  name: "mint",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "nonpayable",
  type: "function",
} as const;

export async function getBalancerMinterRewards(
  client: PublicClient,
  args: ReadContractParameters<{
    beneficiary: Address;
    gauge: Address;
    minter: Address;
  }>,
) {
  const { result } = await client.simulateContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "mint",
    address: args.minter,
    args: [args.gauge],
    account: args.beneficiary,
  });

  return result;
}
