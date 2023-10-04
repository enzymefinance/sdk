import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

const mintAbi = {
  inputs: [{ internalType: "address", name: "gauge", type: "address" }],
  name: "mint",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "nonpayable",
  type: "function",
} as const;

export async function getMinterRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    beneficiary: Address;
    gauge: Address;
    minter: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: [mintAbi],
    functionName: "mint",
    address: args.minter,
    args: [args.gauge],
    account: args.beneficiary,
  });

  return result;
}
