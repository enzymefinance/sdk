import { sendTestTransaction } from "../globals.js";
import { type Address, parseAbi } from "viem";

export function transferToken({
  token,
  amount,
  recipient,
  account,
}: {
  token: Address;
  amount: bigint;
  recipient: Address;
  account: Address;
}) {
  return sendTestTransaction({
    address: token,
    abi: parseAbi(["function transfer(address _to, uint256 _value) public returns (bool success)"] as const),
    functionName: "transfer",
    account,
    args: [recipient, amount],
  });
}
