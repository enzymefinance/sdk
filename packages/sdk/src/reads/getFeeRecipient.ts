import type { Address, PublicClient } from "viem";

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
  return client.readContract({
    abi: [abi],
    functionName: "getRecipientForFund",
    args: [args.comptrollerProxy],
    address: args.fee,
  });
}
