import { type Address, type PublicClient, parseAbi } from "viem";
import { Viem } from "../../Utils.js";

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
