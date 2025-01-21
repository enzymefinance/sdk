import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

const syAbi = [
  {
    inputs: [],
    name: "yieldToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getYieldTokenFromSy(client: PublicClient, args: Viem.ContractCallParameters<{ asset: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: syAbi,
    functionName: "yieldToken",
    address: args.asset,
  });
}

export async function readTokensFromMarket(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    market: Address;
  }>,
) {
  const [sy, pt, yt] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function readTokens() external view returns (address,address,address)"]),
    functionName: "readTokens",
    address: args.market,
  });

  return { sy, pt, yt };
}
