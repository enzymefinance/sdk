import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getToken(client: PublicClient, args: Viem.ContractCallParameters<{ yearnVault: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function token() view returns (address underlying_)"]),
    functionName: "token",
    address: args.yearnVault,
  });
}

export function getApiVersion(client: PublicClient, args: Viem.ContractCallParameters<{ yearnVault: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function apiVersion() view returns (string apiVersion)"]),
    functionName: "apiVersion",
    address: args.yearnVault,
  });
}
