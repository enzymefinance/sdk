import { type Address, type PublicClient, parseAbi } from "viem";
import { Viem } from "../../Utils.js";

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
