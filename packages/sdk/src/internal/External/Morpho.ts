import { type Address, type PublicClient, parseAbi } from "viem";
import { Viem } from "../../Utils";

export async function getPoolToken(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
    amount: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function poolToken(uint256 _assetAmount) view returns (uint256 sharesAmount_)"]),
    functionName: "poolToken",
    address: args.asset,
    args: [args.amount],
  });
}
