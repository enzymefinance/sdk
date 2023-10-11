import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getDsr(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function dsr() view returns (uint256 dsr_)"]),
    functionName: "dsr",
    address: args.asset,
  });
}
