import type { Address, PublicClient } from "viem";
import { readContract } from "viem/contract";

const abi = {
  inputs: [
    {
      internalType: "address",
      name: "",
      type: "address",
    },
  ],
  name: "getRecipientForFund",
  outputs: [
    {
      internalType: "address",
      name: "recipient_",
      type: "address",
    },
  ],
  stateMutability: "view",
  type: "function",
} as const;

export function getFeeRecipient(
  client: PublicClient,
  args: {
    comptrollerProxy: Address;
    fee: Address;
  },
) {
  return readContract(client, {
    abi: [abi],
    functionName: "getRecipientForFund",
    args: [args.comptrollerProxy],
    address: args.fee,
  });
}
