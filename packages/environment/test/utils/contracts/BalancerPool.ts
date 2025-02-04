import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getPoolId(client: PublicClient, args: Viem.ContractCallParameters<{ balancerPool: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getPoolId() view returns (bytes32 poolId_)"]),
    functionName: "getPoolId",
    address: args.balancerPool,
  });
}

export function getVault(client: PublicClient, args: Viem.ContractCallParameters<{ balancerPool: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getVault() view returns (address vault_)"]),
    functionName: "getVault",
    address: args.balancerPool,
  });
}
