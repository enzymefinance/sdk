import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export async function approveSpend({
  token,
  account,
  spender,
  amount,
  clientNetwork,
}: {
  token: Address;
  account: Address;
  spender: Address;
  amount: bigint;
  clientNetwork: ClientNetwork;
}) {
  await sendTestTransaction({
    clientNetwork,
    address: token,
    abi: parseAbi(["function approve(address spender, uint256 amount) returns (bool)"] as const),
    functionName: "approve",
    account: account,
    args: [spender, amount],
  });
}
