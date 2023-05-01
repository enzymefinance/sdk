import { sendTestTransaction } from "../globals.js";
import { type Address, parseAbiItem } from "viem";

export async function approveSpend({
  token,
  account,
  spender,
  amount,
}: {
  token: Address;
  account: Address;
  spender: Address;
  amount: bigint;
}) {
  const abi = parseAbiItem("function approve(address spender, uint256 amount) returns (bool)");

  await sendTestTransaction({
    address: token,
    abi: [abi],
    functionName: "approve",
    account: account,
    args: [spender, amount],
  });
}
