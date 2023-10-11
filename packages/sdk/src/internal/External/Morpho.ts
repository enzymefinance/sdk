import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getPoolToken(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function poolToken() view returns (address poolToken_)"]),
    functionName: "poolToken",
    address: args.asset,
  });
}
