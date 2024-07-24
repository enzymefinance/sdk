import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type Hex, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export async function getPoolTokens(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ vault: Address; pool: Hex }>,
) {
  const [tokens, balances, lastChangeBlock] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function getPoolTokens(bytes32 _poolId) view returns (address[] tokens,uint256[] balances,uint256 lastChangeBlock)",
    ]),
    functionName: "getPoolTokens",
    address: args.vault,
    args: [args.pool],
  });

  return { tokens, balances, lastChangeBlock };
}
