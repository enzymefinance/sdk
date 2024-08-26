import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getToken0(client: PublicClient, args: Viem.ContractCallParameters<{ pool: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function token0() view returns (address underlying_)"]),
    functionName: "token0",
    address: args.pool,
  });
}

export function getToken1(client: PublicClient, args: Viem.ContractCallParameters<{ pool: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function token1() view returns (address underlying_)"]),
    functionName: "token1",
    address: args.pool,
  });
}
