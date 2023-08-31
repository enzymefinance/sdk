import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

const abi = {
  inputs: [
    {
      internalType: "address",
      name: "_comptrollerProxy",
      type: "address",
    },
  ],
  name: "getListIdsForFund",
  outputs: [
    {
      internalType: "uint256[]",
      name: "listIds_",
      type: "uint256[]",
    },
  ],
  stateMutability: "view",
  type: "function",
} as const;

export function getListIdsForVaultPolicy(
  client: PublicClient,
  args: ReadContractParameters<{
    policyContract: Address;
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...readContractParameters(args),
    abi: [abi],
    functionName: "getListIdsForFund",
    args: [args.comptrollerProxy],
    address: args.policyContract,
  });
}
