import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, PublicClient } from "viem";
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
    name: "depositToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getDepositTokenFromSy(client: PublicClient, args: Viem.ContractCallParameters<{ asset: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: syAbi,
    functionName: "depositToken",
    address: args.asset,
  });
}
