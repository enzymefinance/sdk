import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

const ptAbi = [
  {
    inputs: [],
    name: "SY",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getSyFromPt(client: PublicClient, args: Viem.ContractCallParameters<{ asset: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ptAbi,
    functionName: "SY",
    address: args.asset,
  });
}

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

export async function readTokensFromLp(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    lp: Address;
  }>,
) {
  const [sy, pt, yt] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function readTokens() external view returns (address,address,address)"]),
    functionName: "readTokens",
    address: args.lp,
  });

  return { sy, pt, yt };
}
